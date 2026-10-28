import React, { useState, useEffect } from 'react';
import { CategoryInfo, UserProgress, WordItem, GrammarPair, MasteryStatus } from '../../types';
import { progressTracker } from '../../engine/ProgressTracker';
import { contentManager } from '../../engine/ContentManager';
import {
  Printer,
  Download,
  Upload,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  ListFilter
} from 'lucide-react';

interface PrintableReportProps {
  progress: UserProgress;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ progress }) => {
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

  const [childName, setChildName] = useState('Élève / Enfant');
  const [childAge, setChildAge] = useState('36 mois (3 ans)');
  const [examinerName, setExaminerName] = useState('Orthophoniste / Éducatrice CPE');
  const [institutionName, setInstitutionName] = useState('CPE / Clinique d\'Orthophonie');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);

  // Report view modes
  const [reportDetailMode, setReportDetailMode] = useState<'SUMMARY' | 'PRODUCED_WORDS' | 'FULL_664'>('PRODUCED_WORDS');
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  const totalWords = words.length;
  const oftenCount = Object.values(progress.vocabulary).filter(v => v === 'OFTEN').length;
  const sometimesCount = Object.values(progress.vocabulary).filter(v => v === 'SOMETIMES').length;
  const notYetCount = totalWords - oftenCount - sometimesCount;
  const level2Count = Object.values(progress.grammarPairs).filter(v => v === 'LEVEL_2_GRAMMATICAL').length;
  const level1Count = Object.values(progress.grammarPairs).filter(v => v === 'LEVEL_1_TELEGRAPHIC').length;

  const totalMasteredPercent = Math.round((oftenCount / totalWords) * 100);
  const totalEmergingPercent = Math.round((sometimesCount / totalWords) * 100);

  const toggleCategoryExpand = (catId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAllCategories = () => {
    const allExp: Record<number, boolean> = {};
    categories.forEach(c => { allExp[c.id] = true; });
    setExpandedCategories(allExp);
  };

  const collapseAllCategories = () => {
    setExpandedCategories({});
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(progressTracker.exportJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cdi_quebec_assessment_${childName.replace(/\s+/g, '_')}_${assessmentDate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        if (progressTracker.importJSON(content)) {
          alert("Progression importée avec succès !");
        } else {
          alert("Erreur lors de l'importation du fichier JSON.");
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données de progression de l'enfant ?")) {
      progressTracker.reset();
    }
  };

  // Words produced (OFTEN or SOMETIMES)
  const producedWords = words.filter(w => {
    const st = progress.vocabulary[w.id];
    return st === 'OFTEN' || st === 'SOMETIMES';
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Control Actions Bar (Hidden on print) */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le Bilan (PDF)</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exporter JSON</span>
          </button>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>Importer JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>

        {/* Report Content Detail Level Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Contenu :</span>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setReportDetailMode('SUMMARY')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportDetailMode === 'SUMMARY'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Synthèse (2 pages)
            </button>
            <button
              onClick={() => setReportDetailMode('PRODUCED_WORDS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportDetailMode === 'PRODUCED_WORDS'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mots Acquis & Émergents
            </button>
            <button
              onClick={() => setReportDetailMode('FULL_664')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                reportDetailMode === 'FULL_664'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inventaire Complet ({words.length} Mots)
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors ml-2"
            title="Réinitialiser les scores"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Official Assessment Sheet (Formatted for screen and 8.5x11 Print) */}
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto text-slate-800 space-y-8">
        {/* Header Banner */}
        <div className="border-b-2 border-slate-900 pb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase tracking-wider mb-1.5">
                <FileText className="w-3 h-3" />
                <span>Rapport Clinique & Éducatif Officiel</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                Bilan d'Évaluation du Vocabulaire & Syntaxe
              </h1>
              <p className="text-sm font-bold text-slate-600 mt-1">
                Cadre Normatif : Inventaire MacArthur-Bates (CDI Québec - Mots et Énoncés)
              </p>
              <p className="text-xs text-slate-500">
                Population cible : Petite enfance (30–42 mois / 2.5 à 3.5 ans) • Français québécois
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold tracking-wider">
                CONFIDENTIEL - DOSSIER CLINIQUE / CPE
              </span>
              <span className="block text-[11px] font-bold text-slate-400 mt-1">
                Plateforme Baobao Québec
              </span>
            </div>
          </div>
        </div>

        {/* Child & Assessment Details Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 print:bg-transparent">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
              Nom de l'enfant
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
              Âge Chronologique
            </label>
            <input
              type="text"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
              Évaluateur / Orthophoniste / CPE
            </label>
            <input
              type="text"
              value={examinerName}
              onChange={(e) => setExaminerName(e.target.value)}
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
              Date du Bilan
            </label>
            <input
              type="date"
              value={assessmentDate}
              onChange={(e) => setAssessmentDate(e.target.value)}
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Section 1: Global Summary Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 flex items-center justify-between">
            <span>1. Synthèse Globale des Compétences Expressives</span>
            <span className="text-xs font-bold text-slate-400 normal-case">
              {totalWords} mots répertoriés dans l'inventaire
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {/* Produced often */}
            <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
              <div className="text-3xl font-black text-emerald-700">{oftenCount}</div>
              <div className="text-xs font-black text-emerald-800 uppercase mt-1">Produits Spontanément</div>
              <div className="text-[11px] font-bold text-emerald-600 mt-0.5">Maîtrisé ({totalMasteredPercent}%)</div>
            </div>

            {/* Emerging */}
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200">
              <div className="text-3xl font-black text-amber-700">{sometimesCount}</div>
              <div className="text-xs font-black text-amber-800 uppercase mt-1">En Émergence</div>
              <div className="text-[11px] font-bold text-amber-600 mt-0.5">Produit parfois ({totalEmergingPercent}%)</div>
            </div>

            {/* Not yet */}
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
              <div className="text-3xl font-black text-slate-700">{notYetCount}</div>
              <div className="text-xs font-black text-slate-700 uppercase mt-1">Pas Encore Produit</div>
              <div className="text-[11px] font-bold text-slate-400 mt-0.5">Cibles futures</div>
            </div>

            {/* Level 2 Syntax */}
            <div className="p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
              <div className="text-3xl font-black text-indigo-700">{level2Count} / {grammarPairs.length}</div>
              <div className="text-xs font-black text-indigo-800 uppercase mt-1">Syntaxe Niveau 2</div>
              <div className="text-[11px] font-bold text-indigo-600 mt-0.5">Phrases complètes</div>
            </div>
          </div>

          {/* Progress bar visual */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span>Progression Globale du Répertoire Lexical :</span>
              <span className="text-indigo-600 font-black">{oftenCount + sometimesCount} / {totalWords} mots explorés</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${totalMasteredPercent}%` }} className="bg-emerald-500 h-full" title="Maîtrisé" />
              <div style={{ width: `${totalEmergingPercent}%` }} className="bg-amber-400 h-full" title="En émergence" />
            </div>
          </div>
        </div>

        {/* Section 2: Category Breakdown Table (All 21 Categories) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
              2. Résultats Détaillés par Catégorie Lexicale (21 Catégories CDI)
            </h2>
            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={expandAllCategories}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Tout déplier
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={collapseAllCategories}
                className="text-xs font-bold text-slate-500 hover:underline"
              >
                Tout replier
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Catégorie</th>
                  <th className="py-2.5 px-2 text-center">Total</th>
                  <th className="py-2.5 px-2 text-center text-emerald-800">Spontané (Souvent)</th>
                  <th className="py-2.5 px-2 text-center text-amber-800">Émergence (Parfois)</th>
                  <th className="py-2.5 px-3 text-right">Taux de Maîtrise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {categories.map((cat) => {
                  const catWords = words.filter(w => w.categoryId === cat.id);
                  const mastered = catWords.filter(w => progress.vocabulary[w.id] === 'OFTEN').length;
                  const emerging = catWords.filter(w => progress.vocabulary[w.id] === 'SOMETIMES').length;
                  const percent = catWords.length > 0 ? Math.round((mastered / catWords.length) * 100) : 0;
                  const isExpanded = !!expandedCategories[cat.id];

                  return (
                    <React.Fragment key={cat.id}>
                      <tr
                        onClick={() => toggleCategoryExpand(cat.id)}
                        className="hover:bg-indigo-50/40 transition-colors cursor-pointer select-none"
                      >
                        <td className="py-2.5 px-3 font-bold text-slate-800 flex items-center gap-2">
                          <span className="text-slate-400 print:hidden">
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </span>
                          <span>{cat.id}. {cat.name_fr}</span>
                          <span className="text-slate-400 font-normal">({cat.name_zh})</span>
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-600">{catWords.length}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-emerald-700 font-black">{mastered}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-amber-700 font-bold">{emerging}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-black">
                          <div className="inline-flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:flex">
                              <div style={{ width: `${percent}%` }} className="bg-indigo-600 h-full" />
                            </div>
                            <span className="text-indigo-600">{percent}%</span>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Category Word Details */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80">
                          <td colSpan={5} className="p-3 pl-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                              {catWords.map(w => {
                                const st = progress.vocabulary[w.id] || 'NOT_YET';
                                const exp = progress.wordExposures[w.id] || 0;
                                return (
                                  <div
                                    key={w.id}
                                    className={`p-1.5 rounded-xl border text-[11px] flex items-center justify-between ${
                                      st === 'OFTEN'
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                                        : st === 'SOMETIMES'
                                        ? 'bg-amber-50 border-amber-200 text-amber-950 font-bold'
                                        : 'bg-white border-slate-200 text-slate-500'
                                    }`}
                                  >
                                    <span className="truncate">{w.fr}</span>
                                    <span className="text-[9px] font-mono opacity-60 ml-1">
                                      {st === 'OFTEN' ? '✓' : st === 'SOMETIMES' ? '⋯' : '–'} {exp > 0 ? `(${exp}x)` : ''}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Word Inventory (Detailed list of words) */}
        {reportDetailMode !== 'SUMMARY' && (
          <div className="space-y-4 break-inside-avoid">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                3. Inventaire Clinique Détaillé du Vocabulaire Produit
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {reportDetailMode === 'PRODUCED_WORDS'
                  ? `${producedWords.length} mots produits spontanément ou en émergence`
                  : `Inventaire exhaustif des ${words.length} mots`}
              </span>
            </div>

            {producedWords.length === 0 && reportDetailMode === 'PRODUCED_WORDS' ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                Aucun mot encore enregistré avec statut « Souvent » ou « Parfois ». Les mots explorés par l'enfant s'afficheront ici.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                {(reportDetailMode === 'FULL_664' ? words : producedWords).map(w => {
                  const st = progress.vocabulary[w.id] || 'NOT_YET';
                  const exp = progress.wordExposures[w.id] || 0;

                  return (
                    <div
                      key={w.id}
                      className={`p-2 rounded-xl border flex flex-col justify-between ${
                        st === 'OFTEN'
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                          : st === 'SOMETIMES'
                          ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm capitalize">{w.fr}</span>
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                          st === 'OFTEN' ? 'bg-emerald-200 text-emerald-900' :
                          st === 'SOMETIMES' ? 'bg-amber-200 text-amber-900' :
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {st === 'OFTEN' ? 'Acquis' : st === 'SOMETIMES' ? 'Émergent' : 'Non acquis'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                        <span className="font-mono">{w.phonetics}</span>
                        <span>{exp > 0 ? `${exp} interactions` : 'Non exploré'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Section 4: Syntax & Grammar Evolution */}
        <div className="space-y-4 break-inside-avoid">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
              4. Évolution Syntaxique & Combinaisons (48 Repères Grammaticaux)
            </h2>
            <span className="text-xs font-bold text-indigo-600">
              {level2Count} structures Niveau 2 maîtrisées
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {grammarPairs.slice(0, 12).map((pair) => {
              const status = progress.grammarPairs[pair.id];
              const isLevel2 = status === 'LEVEL_2_GRAMMATICAL';
              const isLevel1 = status === 'LEVEL_1_TELEGRAPHIC';

              return (
                <div
                  key={pair.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    isLevel2
                      ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950 font-bold'
                      : isLevel1
                      ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-sm">
                      <span className="text-amber-700">{pair.level1}</span>
                      <span className="text-slate-400">➜</span>
                      <span className="text-indigo-700">{pair.level2}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {pair.zh} • {pair.en}
                    </div>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap ${
                    isLevel2 ? 'bg-indigo-600 text-white shadow-xs' :
                    isLevel1 ? 'bg-amber-400 text-amber-950' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {isLevel2 ? 'Niveau 2' : isLevel1 ? 'Niveau 1' : 'À stimuler'}
                  </span>
                </div>
              );
            })}
          </div>
          {grammarPairs.length > 12 && (
            <p className="text-[11px] text-slate-400 text-center font-bold">
              Affichage des 12 premiers repères syntaxiques. Voir l'onglet « Évolution Syntaxique » pour les 48 repères.
            </p>
          )}
        </div>

        {/* Section 5: Clinical Notes Field */}
        <div className="pt-4 border-t border-slate-200 break-inside-avoid">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide mb-2">
            5. Remarques Cliniques & Objectifs Thérapeutiques
          </h2>
          <textarea
            defaultValue="L'enfant interagit activement avec l'environnement visuel sans texte. Les repères d'expansion de phrase montrent une transition vers les structures coordonnées québécoises. Poursuivre la stimulation des verbes d'action, du vocabulaire quotidien de la maison et des tournures expressives."
            rows={4}
            className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50/70 text-xs font-medium text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-y"
          />
        </div>

        {/* Section 6: Signatures */}
        <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs font-bold text-slate-800 break-inside-avoid">
          <div>
            <span className="block text-slate-500 text-[10px] uppercase font-black mb-4">
              Signature de l'Évaluateur / Orthophoniste :
            </span>
            <div className="border-b border-slate-400 w-4/5 h-8" />
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="block text-slate-500 text-[10px] uppercase font-black mb-4">
              Date & Visa Parental :
            </span>
            <div className="border-b border-slate-400 w-4/5 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};
