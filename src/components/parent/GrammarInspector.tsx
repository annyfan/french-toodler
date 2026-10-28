import React, { useState, useEffect } from 'react';
import { GrammarPair, UserProgress } from '../../types';
import { speechManager } from '../../engine/SpeechManager';
import { progressTracker } from '../../engine/ProgressTracker';
import { contentManager } from '../../engine/ContentManager';
import { AddGrammarPairModal } from './AddGrammarPairModal';
import { EditGrammarPairModal } from './EditGrammarPairModal';
import { Volume2, Plus, Trash2, Sparkles, Pencil } from 'lucide-react';

interface GrammarInspectorProps {
  progress: UserProgress;
}

export const GrammarInspector: React.FC<GrammarInspectorProps> = ({ progress }) => {
  const [pairs, setPairs] = useState<GrammarPair[]>(contentManager.getGrammarPairs());
  const [sectionFilter, setSectionFilter] = useState<'ALL' | 'complexity' | 'expression'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPair, setEditingPair] = useState<GrammarPair | null>(null);

  useEffect(() => {
    return contentManager.subscribe(() => {
      setPairs(contentManager.getGrammarPairs());
    });
  }, []);

  const complexityCount = pairs.filter(p => p.type === 'complexity').length;
  const expressionCount = pairs.filter(p => p.type === 'expression').length;

  const filteredPairs = pairs.filter(p => {
    if (sectionFilter === 'ALL') return true;
    return p.type === sectionFilter;
  });

  const handleLevelToggle = (pairId: string, level: 1 | 2) => {
    progressTracker.recordGrammarInteraction(pairId, level);
  };

  const handleDeletePair = (pairId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Voulez-vous vraiment supprimer cette phrase personnalisée ?')) {
      contentManager.deleteGrammarPair(pairId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs and Add Button */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSectionFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sectionFilter === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tous les {pairs.length} Repères Syntaxiques
          </button>
          <button
            onClick={() => setSectionFilter('complexity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sectionFilter === 'complexity'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Section C : Complexité ({complexityCount})
          </button>
          <button
            onClick={() => setSectionFilter('expression')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sectionFilter === 'expression'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Section D : Expression ({expressionCount})
          </button>
        </div>

        {/* Add Grammar Pair Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Phrase</span>
        </button>
      </div>

      {/* Grammar Pairs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPairs.map((pair) => {
          const currentStatus = progress.grammarPairs[pair.id] || 'LEVEL_1_TELEGRAPHIC';
          const isLevel2 = currentStatus === 'LEVEL_2_GRAMMATICAL';
          const isCustom = contentManager.isCustomGrammarPair(pair.id);
          const isOverridden = contentManager.isOverriddenGrammarPair(pair.id);

          return (
            <div
              key={pair.id}
              className={`p-4 rounded-2xl border transition-all ${
                isLevel2
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{pair.id}</span>
                  {isCustom && (
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Personnalisé
                    </span>
                  )}
                  {isOverridden && (
                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                      Modifié
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {pair.en && pair.zh ? `${pair.en} • ${pair.zh}` : (pair.en || pair.zh || '')}
                  </span>
                  {/* Edit button for all pairs */}
                  <button
                    type="button"
                    onClick={() => setEditingPair(pair)}
                    className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Modifier ce repère syntaxique"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleDeletePair(pair.id, e)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Supprimer cette phrase personnalisée"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Levels comparison card */}
              <div className="space-y-2 mt-3">
                {/* Level 1 */}
                <div className="flex items-center justify-between bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded">
                      L1
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{pair.level1}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speechManager.speak(pair.level1)}
                      className="p-1 rounded-full hover:bg-amber-200 text-amber-700"
                      title="Écouter Niveau 1"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLevelToggle(pair.id, 1)}
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        !isLevel2 ? 'bg-amber-400 text-amber-950' : 'text-slate-400 hover:bg-amber-100'
                      }`}
                    >
                      Niveau 1
                    </button>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="flex items-center justify-between bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-200 px-1.5 py-0.5 rounded">
                      L2
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{pair.level2}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speechManager.speak(pair.level2)}
                      className="p-1 rounded-full hover:bg-emerald-200 text-emerald-700"
                      title="Écouter Niveau 2"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLevelToggle(pair.id, 2)}
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        isLevel2 ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:bg-emerald-100'
                      }`}
                    >
                      Niveau 2
                    </button>
                  </div>
                </div>

                {/* Puzzle Blocks Preview */}
                {pair.blocks && pair.blocks.length >= 2 && (
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Blocs jeu :</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700 text-[10px]">
                      [{pair.blocks[0]}]
                    </span>
                    <span className="text-slate-300">+</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700 text-[10px]">
                      [{pair.blocks[1]}]
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Grammar Pair Modal */}
      <AddGrammarPairModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaved={() => {
          setPairs(contentManager.getGrammarPairs());
        }}
      />

      {/* Edit Grammar Pair Modal */}
      {editingPair && (
        <EditGrammarPairModal
          pair={editingPair}
          isOpen={!!editingPair}
          onClose={() => setEditingPair(null)}
          onSaved={() => {
            setPairs(contentManager.getGrammarPairs());
          }}
        />
      )}
    </div>
  );
};
