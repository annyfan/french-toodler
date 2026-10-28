import { mediaCustomizationManager } from './MediaCustomizationManager';
import { VoiceSettings } from '../types';

function cleanSpeechText(text: string): string {
  if (!text) return '';
  let cleaned = text
    .replace(/[()]/g, '')
    .replace(/pis\b/gi, 'puis')
    .replace(/&/g, ' et ')
    .replace(/\s+/g, ' ')
    .trim();

  // If text is ALL CAPS (like older category headers), convert to sentence case so SpeechSynthesis reads it naturally
  if (cleaned.length > 2 && cleaned === cleaned.toUpperCase()) {
    cleaned = cleaned.charAt(0) + cleaned.slice(1).toLowerCase();
  }
  return cleaned;
}

// Audio & Speech Manager prioritizing studio-grade Canadian French MP3s with Web Speech fallback and parent customization
export class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private rate: number = 0.95; // Natural human pace
  private pitch: number = 1.0; // Natural authentic pitch (no robotic distortion)
  private isEnabled: boolean = true;
  private isReady: boolean = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private categoryAudioCache: Map<number, HTMLAudioElement> = new Map();
  private unsubscribeMedia: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.applyParentVoiceSettings();
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }

      // Listen to parent settings changes
      this.unsubscribeMedia = mediaCustomizationManager.subscribe(() => {
        this.applyParentVoiceSettings();
        this.initVoices();
      });
    }
  }

  private applyParentVoiceSettings(): void {
    const settings = mediaCustomizationManager.getVoiceSettings();
    if (settings.rate) this.rate = settings.rate;
    if (settings.pitch) this.pitch = settings.pitch;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices() || [];
  }

  public isFrenchVoice(v: SpeechSynthesisVoice | null): boolean {
    if (!v) return false;
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.startsWith('fr') ||
      lang.includes('fr-') ||
      lang.includes('fr_') ||
      name.includes('french') ||
      name.includes('français') ||
      name.includes('francais')
    );
  }

  private initVoices(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    const settings = mediaCustomizationManager.getVoiceSettings();

    // 1. If parent explicitly selected a voice by voiceURI, use that first
    if (settings.voiceURI) {
      const selected = voices.find(v => v.voiceURI === settings.voiceURI);
      if (selected && this.isFrenchVoice(selected)) {
        this.voice = selected;
        this.isReady = true;
        return;
      }
    }

    // 2. Default search preference order (strictly prioritize Quebec / Canadian French):
    // Tier A: Canadian French exact match (fr-CA)
    const exactCa = voices.find(v => {
      const lang = v.lang.replace('_', '-').toLowerCase();
      return lang === 'fr-ca';
    });

    // Tier B: Online natural / Neural Canadian French voices (Edge & Windows)
    const naturalCa = voices.find(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      return lang.includes('ca') && (name.includes('natural') || name.includes('online') || name.includes('sylvie') || name.includes('jean'));
    });

    // Tier C: Named Quebec / Canadian voices (Amélie, Nicolas, Chantal, Sylvie, Caroline, Claude)
    const namedCa = voices.find(v => {
      const name = v.name.toLowerCase();
      return (
        name.includes('canada') ||
        name.includes('canadian') ||
        name.includes('québec') ||
        name.includes('quebec') ||
        name.includes('amelie') ||
        name.includes('chantal') ||
        name.includes('sylvie') ||
        name.includes('caroline') ||
        name.includes('claude')
      );
    });

    // Tier D: Google français (High quality natural voice in Chrome)
    const googleFr = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.toLowerCase().startsWith('fr'));

    // Tier E: Any French voice
    const anyFrenchVoice = voices.find(v => this.isFrenchVoice(v));

    this.voice = exactCa || naturalCa || namedCa || googleFr || anyFrenchVoice || null;
    this.isReady = true;
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.6, Math.min(1.4, newRate));
    mediaCustomizationManager.setVoiceSettings({ rate: this.rate });
  }

  public setPitch(newPitch: number) {
    this.pitch = Math.max(0.8, Math.min(1.4, newPitch));
    mediaCustomizationManager.setVoiceSettings({ pitch: this.pitch });
  }

  public setVoiceURI(uri: string) {
    mediaCustomizationManager.setVoiceSettings({ voiceURI: uri });
    this.initVoices();
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public getSelectedVoiceName(): string {
    return this.voice ? `${this.voice.name} (${this.voice.lang})` : 'Voix studio québécoise (fr-CA)';
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.voice;
  }

  public stopAll(): void {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
  }

  // Play audio data URL directly (for parent custom recording)
  public playAudioUrl(audioUrl: string, onEnd?: () => void): void {
    if (!this.isEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAll();

    const audio = new Audio(audioUrl);
    this.currentAudio = audio;

    audio.onended = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.play().catch(() => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    });
  }

  // Preload a studio MP3 into memory for instant tap response
  public preloadWordAudio(wordId: string): void {
    if (!wordId || this.audioCache.has(wordId)) return;
    try {
      const baseUrl = import.meta.env.BASE_URL || './';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const audioUrl = `${cleanBase}audio/words/${wordId}.mp3`;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = audioUrl;
      this.audioCache.set(wordId, audio);
    } catch {
      // Ignore preload errors
    }
  }

  // Play studio-grade pre-rendered Canadian French category audio (fr-CA-SylvieNeural)
  public speakCategory(categoryId: number, fallbackText?: string, onEnd?: () => void): void {
    if (!this.isEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAll();

    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const audioUrl = `${cleanBase}audio/categories/cat_${categoryId}.mp3`;

    let audio = this.categoryAudioCache.get(categoryId);
    if (!audio) {
      audio = new Audio(audioUrl);
      this.categoryAudioCache.set(categoryId, audio);
    } else {
      audio.currentTime = 0;
    }

    this.currentAudio = audio;
    audio.volume = 1.0;

    audio.onended = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      // Fallback only if MP3 not found (e.g. custom category added by parent)
      this.currentAudio = null;
      if (fallbackText) {
        this.speakWithSpeechSynthesis(fallbackText, onEnd);
      } else if (onEnd) {
        onEnd();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        this.currentAudio = null;
        if (fallbackText) {
          this.speakWithSpeechSynthesis(fallbackText, onEnd);
        } else if (onEnd) {
          onEnd();
        }
      });
    }
  }

  // Speak with automatic priority based on parent configuration:
  // 1. Parent custom voice recording or audio (if present for wordId)
  // 2. Parent Audio Priority Mode:
  //    - 'ALWAYS_SPEECH': Always synthesize using chosen voice & speed
  //    - 'STUDIO_THEN_SPEECH': Try pre-rendered studio MP3, fallback to speech synthesis
  //    - 'CUSTOM_AUDIO_FIRST': Custom audio -> Studio MP3 -> Speech synthesis
  public speak(text: string, wordId?: string, onEnd?: () => void): void {
    if (!this.isEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAll();

    // 1. Check if parent uploaded or recorded custom audio for this word
    if (wordId) {
      const customAudio = mediaCustomizationManager.getCustomAudio(wordId);
      if (customAudio) {
        this.playAudioUrl(customAudio, onEnd);
        return;
      }
    }

    const settings = mediaCustomizationManager.getVoiceSettings();

    // 2. If parent set "ALWAYS_SPEECH", bypass pre-rendered MP3 and synthesize live
    if (settings.priority === 'ALWAYS_SPEECH') {
      this.speakWithSpeechSynthesis(text, onEnd);
      return;
    }

    // 3. Default: Play studio-grade Canadian French MP3 file in audio/words/${wordId}.mp3
    if (wordId) {
      const baseUrl = import.meta.env.BASE_URL || './';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const audioUrl = `${cleanBase}audio/words/${wordId}.mp3`;

      // Use cached audio if available, otherwise create new
      let audio = this.audioCache.get(wordId);
      if (!audio) {
        audio = new Audio(audioUrl);
        this.audioCache.set(wordId, audio);
      } else {
        audio.currentTime = 0;
      }

      this.currentAudio = audio;
      audio.volume = 1.0;

      audio.onended = () => {
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        // MP3 not found -> Fallback to Web Speech synthesis
        this.currentAudio = null;
        this.speakWithSpeechSynthesis(text, onEnd);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to speech synthesis if audio play fails
          this.currentAudio = null;
          this.speakWithSpeechSynthesis(text, onEnd);
        });
      }
      return;
    }

    // Default to speech synthesis if no wordId
    this.speakWithSpeechSynthesis(text, onEnd);
  }

  // Live test preview of any voice configuration
  public speakWithVoice(
    text: string,
    voiceURI?: string,
    rate?: number,
    pitch?: number,
    onEnd?: () => void
  ): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stopAll();
    const cleanText = cleanSpeechText(text);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-CA';

    const voices = this.getAvailableVoices();
    if (voiceURI) {
      const v = voices.find(item => item.voiceURI === voiceURI);
      if (v && this.isFrenchVoice(v)) utterance.voice = v;
    } else if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.rate = rate !== undefined ? rate : this.rate;
    utterance.pitch = pitch !== undefined ? pitch : this.pitch;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  private speakWithSpeechSynthesis(text: string, onEnd?: () => void): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = cleanSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-CA';

    // Strictly ensure a French voice is attached (never allow English voice)
    if (!this.voice || !this.isFrenchVoice(this.voice)) {
      this.initVoices();
    }

    if (this.voice && this.isFrenchVoice(this.voice)) {
      utterance.voice = this.voice;
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } else {
      console.warn('SpeechSynthesis skipped: No French voice available on system to prevent English phonetic distortion.');
      if (onEnd) onEnd();
    }
  }
}

export const speechManager = new SpeechManager();
