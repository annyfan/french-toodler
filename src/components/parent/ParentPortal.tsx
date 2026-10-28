import React, { useState, useEffect } from 'react';
import { UserProgress } from '../../types';
import { CdiDashboard } from './CdiDashboard';
import { VocabularyManager } from './VocabularyManager';
import { GrammarInspector } from './GrammarInspector';
import { PrintableReport } from './PrintableReport';
import { MediaSettingsPanel } from './MediaSettingsPanel';
import { speechManager } from '../../engine/SpeechManager';
import { mediaCustomizationManager } from '../../engine/MediaCustomizationManager';
import { contentManager } from '../../engine/ContentManager';
import { LayoutDashboard, BookA, GitMerge, FileText, ArrowLeft, Volume2, Sliders } from 'lucide-react';

interface ParentPortalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ progress, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vocab' | 'grammar' | 'report' | 'media'>('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [customMediaCount, setCustomMediaCount] = useState<number>(0);
  const [totalWordsCount, setTotalWordsCount] = useState<number>(contentManager.getWords().length);
  const [totalPairsCount, setTotalPairsCount] = useState<number>(contentManager.getGrammarPairs().length);

  useEffect(() => {
    const updateCount = () => {
      const imgs = Object.keys(mediaCustomizationManager.getAllCustomImages()).length;
      const auds = Object.keys(mediaCustomizationManager.getAllCustomAudios()).length;
      setCustomMediaCount(imgs + auds);
    };

    const updateContent = () => {
      setTotalWordsCount(contentManager.getWords().length);
      setTotalPairsCount(contentManager.getGrammarPairs().length);
    };

    updateCount();
    updateContent();

    const unsubMedia = mediaCustomizationManager.subscribe(updateCount);
    const unsubContent = contentManager.subscribe(updateContent);

    return () => {
      unsubMedia();
      unsubContent();
    };
  }, []);

  const handleSelectCategoryFromDashboard = (catId: number) => {
    setSelectedCategoryId(catId);
    setActiveTab('vocab');
  };

  const handleTestVoice = () => {
    speechManager.speak("Bonjour ! Bienvenue sur la plateforme québécoise d'apprentissage du français pour les tout-petits.");
  };

  return (
    <div className="parent-portal-container fixed inset-0 z-40 bg-slate-100 flex flex-col text-slate-800 overflow-y-auto overflow-x-hidden select-text">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm flex-shrink-0 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-xl text-sm shadow-sm transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour Mode Enfant</span>
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-tight">
                Portail Parents & Orthophonie
              </h1>
              <p className="text-xs text-slate-500">
                Suivi CDI Québec (MacArthur-Bates) • 30–42 mois
              </p>
            </div>
          </div>

          {/* Voice Engine Quick Test */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestVoice}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors"
              title="Tester la voix québécoise"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Tester Voix (fr-CA)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto border-t border-slate-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tableau de Bord CDI</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'vocab'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookA className="w-4 h-4" />
            <span>Dictionnaire Lexical ({totalWordsCount} Mots)</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'media'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Voix & Médias</span>
            {customMediaCount > 0 && (
              <span className="text-[10px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full">
                {customMediaCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'grammar'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitMerge className="w-4 h-4" />
            <span>Évolution Syntaxique ({totalPairsCount} Repères)</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'report'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Bilan Imprimable & Export</span>
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full pb-28">
        {activeTab === 'dashboard' && (
          <CdiDashboard
            progress={progress}
            onSelectCategory={handleSelectCategoryFromDashboard}
            onSwitchTab={(t) => {
              if (t === 'vocab') setActiveTab('vocab');
              if (t === 'grammar') setActiveTab('grammar');
              if (t === 'report') setActiveTab('report');
            }}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabularyManager
            progress={progress}
            selectedCategoryId={selectedCategoryId}
            onClearCategoryFilter={() => setSelectedCategoryId(null)}
            onSelectCategoryId={(id) => setSelectedCategoryId(id)}
          />
        )}

        {activeTab === 'media' && (
          <MediaSettingsPanel />
        )}

        {activeTab === 'grammar' && (
          <GrammarInspector progress={progress} />
        )}

        {activeTab === 'report' && (
          <PrintableReport progress={progress} />
        )}
      </main>
    </div>
  );
};
