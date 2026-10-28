import React, { useState, useEffect } from 'react';
import { CategoryInfo, UserProgress, WordItem, GrammarPair } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { Award, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface CdiDashboardProps {
  progress: UserProgress;
  onSelectCategory: (categoryId: number) => void;
  onSwitchTab: (tab: 'vocab' | 'grammar' | 'report') => void;
}

export const CdiDashboard: React.FC<CdiDashboardProps> = ({
  progress,
  onSelectCategory,
  onSwitchTab,
}) => {
  const [categories, setCategories] = useState<CategoryInfo[]>(contentManager.getCategories());
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());
  const [grammarPairs, setGrammarPairs] = useState<GrammarPair[]>(contentManager.getGrammarPairs());

  useEffect(() => {
    return contentManager.subscribe(() => {
      setCategories(contentManager.getCategories());
      setWords(contentManager.getWords());
      setGrammarPairs(contentManager.getGrammarPairs());
    });
  }, []);

  const totalWords = words.length > 0 ? words.length : 1;
  const oftenWordsCount = Object.values(progress.vocabulary).filter(v => v === 'OFTEN').length;
  const sometimesWordsCount = Object.values(progress.vocabulary).filter(v => v === 'SOMETIMES').length;
  const notYetWordsCount = Math.max(0, words.length - oftenWordsCount - sometimesWordsCount);

  // Grammar counts
  const level2GrammarCount = Object.values(progress.grammarPairs).filter(v => v === 'LEVEL_2_GRAMMATICAL').length;

  return (
    <div className="space-y-6">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{oftenWordsCount} / {words.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Mots Maîtrisés (Souvent)</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{sometimesWordsCount}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">En Émergence (Parfois)</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{level2GrammarCount} / {grammarPairs.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Syntaxe Niveau 2 (Élaborée)</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">
              {Math.round(((oftenWordsCount + sometimesWordsCount * 0.5) / totalWords) * 100)}%
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Indice Global CDI Québec</div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-2">Répartition du Vocabulaire (CDI Mots et Énoncés)</h3>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${(oftenWordsCount / totalWords) * 100}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Maîtrisé: ${oftenWordsCount}`}
          />
          <div
            style={{ width: `${(sometimesWordsCount / totalWords) * 100}%` }}
            className="bg-amber-400 transition-all duration-500"
            title={`En émergence: ${sometimesWordsCount}`}
          />
          <div
            style={{ width: `${(notYetWordsCount / totalWords) * 100}%` }}
            className="bg-slate-200 transition-all duration-500"
            title={`Pas encore: ${notYetWordsCount}`}
          />
        </div>
        <div className="flex flex-wrap gap-6 mt-3 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Maîtrisé (Souvent) : {oftenWordsCount} ({Math.round((oftenWordsCount / totalWords) * 100)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span>En émergence (Parfois) : {sometimesWordsCount} ({Math.round((sometimesWordsCount / totalWords) * 100)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span>À découvrir (Pas encore) : {notYetWordsCount} ({Math.round((notYetWordsCount / totalWords) * 100)}%)</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Progression par Catégorie Thématique ({categories.length} Catégories)
          </h3>
          <button
            onClick={() => onSwitchTab('vocab')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            Voir tous les mots &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const catWords = words.filter(w => w.categoryId === cat.id);
            const masteredInCat = catWords.filter(w => progress.vocabulary[w.id] === 'OFTEN').length;
            const emergingInCat = catWords.filter(w => progress.vocabulary[w.id] === 'SOMETIMES').length;
            const percent = catWords.length > 0 ? Math.round((masteredInCat / catWords.length) * 100) : 0;
            const isCustom = contentManager.isCustomCategory(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                      {cat.icon ? <span>{cat.icon}</span> : null}
                      <span>{cat.id}. {cat.name_fr}</span>
                      {isCustom && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                          Perso
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {cat.name_en} • {cat.name_zh}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-slate-700">
                    {masteredInCat}/{catWords.length}
                  </span>
                </div>

                {/* Mini progress bar */}
                <div className="mt-4 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${percent}%` }}
                    className="bg-emerald-500 rounded-full transition-all duration-300"
                  />
                  <div
                    style={{ width: `${catWords.length > 0 ? (emergingInCat / catWords.length) * 100 : 0}%` }}
                    className="bg-amber-400 transition-all duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
