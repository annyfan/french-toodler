import { AudioPriorityMode, VoiceSettings, CustomMediaRecord } from '../types';

const STORAGE_KEY = 'baobao_custom_media_v1';

const DEFAULT_SETTINGS: VoiceSettings = {
  voiceURI: '',
  rate: 0.95,
  pitch: 1.0,
  priority: 'STUDIO_THEN_SPEECH'
};

export class MediaCustomizationManager {
  private mediaRecord: CustomMediaRecord;
  private listeners: Set<() => void> = new Set();
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor() {
    this.mediaRecord = this.loadMediaRecord();
  }

  private loadMediaRecord(): CustomMediaRecord {
    if (typeof window === 'undefined') {
      return {
        customImages: {},
        customAudios: {},
        voiceSettings: { ...DEFAULT_SETTINGS }
      };
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          customImages: parsed.customImages || {},
          customAudios: parsed.customAudios || {},
          voiceSettings: {
            ...DEFAULT_SETTINGS,
            ...(parsed.voiceSettings || {})
          }
        };
      }
    } catch {
      // Ignore error and use default
    }

    return {
      customImages: {},
      customAudios: {},
      voiceSettings: { ...DEFAULT_SETTINGS }
    };
  }

  private persist(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mediaRecord));
    } catch (e) {
      console.warn('Media storage quota exceeded:', e);
    }
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }

  // --- Voice Settings ---
  public getVoiceSettings(): VoiceSettings {
    return { ...this.mediaRecord.voiceSettings };
  }

  public setVoiceSettings(settings: Partial<VoiceSettings>): void {
    this.mediaRecord.voiceSettings = {
      ...this.mediaRecord.voiceSettings,
      ...settings
    };
    this.persist();
  }

  // --- Image Customization ---
  public hasCustomImage(wordId: string): boolean {
    if (!wordId) return false;
    return !!this.mediaRecord.customImages[wordId.toLowerCase()];
  }

  public getCustomImage(wordId: string): string | null {
    if (!wordId) return null;
    return this.mediaRecord.customImages[wordId.toLowerCase()] || null;
  }

  public setCustomImage(wordId: string, imageDataUrl: string): void {
    if (!wordId || !imageDataUrl) return;
    this.mediaRecord.customImages[wordId.toLowerCase()] = imageDataUrl;
    this.persist();
  }

  public removeCustomImage(wordId: string): void {
    if (!wordId) return;
    delete this.mediaRecord.customImages[wordId.toLowerCase()];
    this.persist();
  }

  public getAllCustomImages(): Record<string, string> {
    return { ...this.mediaRecord.customImages };
  }

  // --- Audio Customization ---
  public hasCustomAudio(wordId: string): boolean {
    if (!wordId) return false;
    return !!this.mediaRecord.customAudios[wordId.toLowerCase()];
  }

  public getCustomAudio(wordId: string): string | null {
    if (!wordId) return null;
    return this.mediaRecord.customAudios[wordId.toLowerCase()] || null;
  }

  public setCustomAudio(wordId: string, audioDataUrl: string): void {
    if (!wordId || !audioDataUrl) return;
    this.mediaRecord.customAudios[wordId.toLowerCase()] = audioDataUrl;
    this.persist();
  }

  public removeCustomAudio(wordId: string): void {
    if (!wordId) return;
    delete this.mediaRecord.customAudios[wordId.toLowerCase()];
    this.persist();
  }

  public getAllCustomAudios(): Record<string, string> {
    return { ...this.mediaRecord.customAudios };
  }

  // Reset all overrides
  public resetAllCustomMedia(): void {
    this.mediaRecord = {
      customImages: {},
      customAudios: {},
      voiceSettings: { ...DEFAULT_SETTINGS }
    };
    this.persist();
  }

  // --- Helper: Compress & Resize Image File to Lightweight Data URL ---
  public async processImageFile(file: File, maxDim = 280): Promise<string> {
    return new Promise((resolve, reject) => {
      // If SVG, read as text/dataURL directly
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Try webp first, fallback to jpeg
        try {
          const dataUrl = canvas.toDataURL('image/webp', 0.85);
          resolve(dataUrl);
        } catch {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        }
      };

      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // --- Helper: Audio Recording with Browser Microphone ---
  public async startAudioRecording(): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Microphone non pris en charge par ce navigateur.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : '';

    const options = mimeType ? { mimeType } : undefined;
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  public async stopAudioRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error("Aucun enregistrement en cours."));
        return;
      }

      this.mediaRecorder.onstop = async () => {
        try {
          const blob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType || 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);

          // Stop all audio tracks
          this.mediaRecorder?.stream?.getTracks().forEach(t => t.stop());
          this.mediaRecorder = null;
        } catch (err) {
          reject(err);
        }
      };

      this.mediaRecorder.stop();
    });
  }
}

export const mediaCustomizationManager = new MediaCustomizationManager();
