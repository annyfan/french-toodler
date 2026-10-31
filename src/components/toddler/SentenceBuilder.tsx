import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WordItem } from '../../types';
import { contentManager } from '../../engine/ContentManager';
import { audioManager } from '../../engine/AudioContextManager';
import { speechManager } from '../../engine/SpeechManager';
import { ToddlerGraphic } from '../common/ToddlerGraphic';

type SentenceLevel = 1 | 2 | 3;

interface SentenceExample {
  subject: string;
  verb: string;
  complement: string;
  sentence: string;
}

const verbComplements: Record<string, [string, string]> = {
  acheter: ['un jouet', 'une pomme'],
  aider: ['le bébé', 'maman'],
  aimer: ['maman', 'le bébé'],
  aller: ['au parc', 'à la maison'],
  allumer: ['la lumière', 'la lampe'],
  amener: ['le bébé', 'le toutou'],
  apporter: ['un livre', 'un jouet'],
  arrêter: ['le jeu', 'la musique'],
  arroser: ['la fleur', 'le jardin'],
  asseoir: ['le bébé', 'le toutou'],
  attacher: ['le bébé', 'le toutou'],
  attendre: ['maman', 'papa'],
  attraper: ['le ballon', 'le jouet'],
  balancer: ['le bébé', 'le toutou'],
  balayer: ['le plancher', 'la cuisine'],
  bercer: ['le bébé', 'le toutou'],
  boire: ['du jus', 'de l’eau'],
  brasser: ['la soupe', 'la pâte'],
  briser: ['un jouet', 'un crayon'],
  brosser: ['les cheveux', 'les dents'],
  cacher: ['le jouet', 'le ballon'],
  chanter: ['une chanson', 'avec maman'],
  chatouiller: ['le bébé', 'papa'],
  chercher: ['le jouet', 'le livre'],
  choisir: ['un livre', 'un jouet'],
  'cogner à': ['la porte', 'la porte'],
  coller: ['une image', 'du papier'],
  conduire: ['l’auto', 'le camion'],
  construire: ['un château', 'une maison'],
  couper: ['la pomme', 'le papier'],
  courir: ['avec maman', 'avec papa'],
  couvrir: ['le bébé', 'le toutou'],
  cracher: ['par terre', 'dans le lavabo'],
  danser: ['avec maman', 'avec papa'],
  débarquer: ['du camion', 'de l’auto'],
  déchirer: ['le papier', 'la feuille'],
  descendre: ['l’escalier', 'du camion'],
  dessiner: ['un chat', 'une maison'],
  dire: ['bonjour', 'merci à maman'],
  donner: ['un jouet au bébé', 'un livre à papa'],
  dormir: ['dans son lit', 'avec le toutou'],
  échapper: ['le jouet', 'le ballon'],
  écouter: ['la musique', 'une histoire'],
  écrire: ['son nom', 'une lettre'],
  embarquer: ['dans l’auto', 'dans le camion'],
  embrasser: ['maman', 'papa'],
  enlever: ['son manteau', 'ses bottes'],
  entendre: ['la musique', 'un bruit'],
  essayer: ['le chapeau', 'ses bottes'],
  essuyer: ['la table', 'ses mains'],
  faire: ['un dessin', 'un gâteau'],
  fermer: ['la porte', 'la boîte'],
  finir: ['le dessin', 'son repas'],
  glisser: ['sur la neige', 'sur la glissoire'],
  goûter: ['la soupe', 'la pomme'],
  grimper: ['dans le module', 'sur la chaise'],
  jeter: ['le ballon', 'le papier'],
  jouer: ['avec maman', 'avec papa'],
  lancer: ['le ballon', 'le jouet'],
  laver: ['les mains', 'le toutou'],
  lécher: ['la crème glacée', 'la cuillère'],
  lire: ['un livre', 'une histoire'],
  manger: ['une pomme', 'du pain'],
  marcher: ['avec maman', 'avec papa'],
  mettre: ['son manteau', 'ses bottes'],
  monter: ['l’escalier', 'dans le camion'],
  montrer: ['un dessin à maman', 'un jouet à papa'],
  mordre: ['la pomme', 'le pain'],
  nager: ['dans la piscine', 'avec maman'],
  nettoyer: ['la table', 'le jouet'],
  ouvrir: ['la porte', 'la boîte'],
  parler: ['avec maman', 'avec papa'],
  partager: ['un jouet', 'une pomme'],
  patiner: ['avec maman', 'au parc'],
  peinturer: ['un dessin', 'la clôture'],
  penser: ['à maman', 'à papa'],
  pousser: ['le camion', 'la balançoire'],
  prendre: ['le jouet', 'un livre'],
  ramasser: ['le jouet', 'le ballon'],
  ranger: ['les jouets', 'les livres'],
  regarder: ['un livre', 'le chat'],
  renverser: ['le jus', 'la soupe'],
  réparer: ['le camion', 'le jouet'],
  rester: ['avec maman', 'à la maison'],
  réveiller: ['le bébé', 'papa'],
  sauter: ['avec maman', 'sur le tapis'],
  sécher: ['ses mains', 'le toutou'],
  'se dépêcher': ['pour jouer', 'pour sortir'],
  souffler: ['les bougies', 'sur la soupe'],
  sourire: ['à maman', 'à papa'],
  surveiller: ['le bébé', 'le toutou'],
  taper: ['sur le tambour', 'sur la table'],
  tenir: ['le jouet', 'la main de maman'],
  tirer: ['le camion', 'la couverture'],
  tomber: ['par terre', 'sur le tapis'],
  toucher: ['le nez', 'le ballon'],
  tourner: ['la page', 'la roue'],
  transporter: ['un sac', 'le jouet'],
  travailler: ['avec papa', 'à la maison'],
  trouver: ['le jouet', 'le livre'],
  venir: ['avec maman', 'à la maison'],
  verser: ['du jus', 'de l’eau'],
  voir: ['le chat', 'un oiseau'],
};

const getBaseWord = (word: WordItem): string =>
  word.fr.split('/')[0].trim().toLocaleLowerCase('fr-CA');

export const createExamples = (word: WordItem): [SentenceExample, SentenceExample] => {
  const baseWord = getBaseWord(word);

  if (word.categoryId === 14) {
    if (baseWord === 'avoir') {
      return [
        { subject: 'Je', verb: 'ai', complement: 'un jouet', sentence: "J'ai un jouet." },
        { subject: 'Papa', verb: 'a', complement: 'un livre', sentence: 'Papa a un livre.' },
      ];
    }
    if (baseWord === 'être') {
      return [
        { subject: 'Je', verb: 'suis', complement: 'avec maman', sentence: 'Je suis avec maman.' },
        { subject: 'Papa', verb: 'est', complement: 'avec le bébé', sentence: 'Papa est avec le bébé.' },
      ];
    }
    if (baseWord === 'aller') {
      return [
        { subject: 'Je', verb: 'vais', complement: 'au parc', sentence: 'Je vais au parc.' },
        { subject: 'Papa', verb: 'va', complement: 'à la maison', sentence: 'Papa va à la maison.' },
      ];
    }
    if (baseWord === 'pouvoir') {
      return [
        { subject: 'Je', verb: 'peux', complement: 'jouer avec maman', sentence: 'Je peux jouer avec maman.' },
        { subject: 'Papa', verb: 'peut', complement: 'lire avec le bébé', sentence: 'Papa peut lire avec le bébé.' },
      ];
    }
    if (baseWord === 'vouloir') {
      return [
        { subject: 'Je', verb: 'veux', complement: 'un jouet', sentence: 'Je veux un jouet.' },
        { subject: 'Papa', verb: 'veut', complement: 'un livre', sentence: 'Papa veut un livre.' },
      ];
    }
    if (baseWord === 'aimer') {
      return [
        { subject: "J'", verb: 'aime', complement: 'maman', sentence: "J'aime maman." },
        { subject: 'Papa', verb: 'aime', complement: 'le bébé', sentence: 'Papa aime le bébé.' },
      ];
    }

    const infinitive = baseWord === 'se dépêcher' ? 'me dépêcher' : baseWord;
    const secondInfinitive = baseWord === 'se dépêcher' ? 'se dépêcher' : baseWord;
    const complements = verbComplements[baseWord] || ['avec maman', 'avec le bébé'];
    const firstVerb = `veux ${infinitive}`;
    const secondVerb = `veut ${secondInfinitive}`;
    const firstSentence = `Je ${firstVerb} ${complements[0]}.`;
    const secondSentence = `Papa ${secondVerb} ${complements[1]}.`;

    return [
      { subject: 'Je', verb: firstVerb, complement: complements[0], sentence: firstSentence },
      { subject: 'Papa', verb: secondVerb, complement: complements[1], sentence: secondSentence },
    ];
  }

  const descriptor = baseWord;
  const adjectiveExamples: Record<string, [string, string, string, string]> = {
    'avoir mal': ['Le bébé', 'a', 'mal', 'Papa'],
    bien: ['Le bébé', 'va', 'bien', 'Papa'],
    faim: ['Le bébé', 'a', 'faim', 'Papa'],
    mal: ['Le bébé', 'va', 'mal', 'Papa'],
    mieux: ['Le bébé', 'va', 'mieux', 'Papa'],
    peur: ['Le bébé', 'a', 'peur', 'Papa'],
    soif: ['Le bébé', 'a', 'soif', 'Papa'],
    vite: ['Le bébé', 'va', 'vite', 'Papa'],
  };
  const special = adjectiveExamples[descriptor];
  if (special) {
    const [firstSubject, verb, complement, secondSubject] = special;
    return [
      {
        subject: firstSubject,
        verb,
        complement,
        sentence: `${firstSubject} ${verb} ${complement}.`,
      },
      {
        subject: secondSubject,
        verb,
        complement,
        sentence: `${secondSubject} ${verb} ${complement}.`,
      },
    ];
  }

  if (descriptor === 'premier' || descriptor === 'dernier') {
    const article = `le ${descriptor}`;
    return [
      { subject: 'Le bébé', verb: 'est', complement: article, sentence: `Le bébé est ${article}.` },
      { subject: 'Papa', verb: 'est', complement: article, sentence: `Papa est ${article}.` },
    ];
  }

  if (descriptor === 'fini') {
    return [
      { subject: 'Le jeu', verb: 'est', complement: 'fini', sentence: 'Le jeu est fini.' },
      { subject: 'Le repas', verb: 'est', complement: 'fini', sentence: 'Le repas est fini.' },
    ];
  }

  if (descriptor === 'parti') {
    return [
      { subject: 'Papa', verb: 'est', complement: 'parti', sentence: 'Papa est parti.' },
      { subject: 'Le bébé', verb: 'est', complement: 'parti', sentence: 'Le bébé est parti.' },
    ];
  }

  if (descriptor === 'bon') {
    return [
      { subject: 'Le repas', verb: 'est', complement: 'bon', sentence: 'Le repas est bon.' },
      { subject: 'Le jus', verb: 'est', complement: 'bon', sentence: 'Le jus est bon.' },
    ];
  }

  const adjective = descriptor === 'orange' ? 'orange' : descriptor;
  const objectDescriptors = new Set([
    'blanc', 'bleu', 'brisé', 'brun', 'collant', 'doux', 'dur', 'froid',
    'gros', 'haut', 'jaune', 'joli', 'long', 'lourd', 'noir', 'nouveau',
    'orange', 'plein', 'petit', 'pris', 'propre', 'rond', 'rouge', 'sec',
    'vert', 'vide', 'vieux',
  ]);
  if (objectDescriptors.has(descriptor)) {
    const firstSubject = descriptor === 'plein' || descriptor === 'vide' ? 'Le sac' : 'Le jouet';
    const secondSubject = descriptor === 'plein' || descriptor === 'vide' ? 'Le verre' : 'Le ballon';
    return [
      { subject: firstSubject, verb: 'est', complement: adjective, sentence: `${firstSubject} est ${adjective}.` },
      { subject: secondSubject, verb: 'est', complement: adjective, sentence: `${secondSubject} est ${adjective}.` },
    ];
  }

  return [
    { subject: 'Le bébé', verb: 'est', complement: adjective, sentence: `Le bébé est ${adjective}.` },
    { subject: 'Papa', verb: 'est', complement: adjective, sentence: `Papa est ${adjective}.` },
  ];
};

const getTimePhrase = (words: WordItem[], exampleIndex: number): string => {
  const preferredWords = exampleIndex === 0 ? ["aujourd'hui", 'demain'] : ['maintenant', 'ce soir'];
  return preferredWords
    .map(preferred => words.find(word => word.categoryId === 16 && word.fr.toLocaleLowerCase('fr-CA') === preferred)?.fr)
    .find(Boolean) || (exampleIndex === 0 ? "aujourd'hui" : 'maintenant');
};

const getPlacePhrase = (words: WordItem[], exampleIndex: number): string => {
  const preferredPlace = exampleIndex === 0 ? 'maison' : 'parc';
  const place = words.find(word => word.categoryId === 11 && word.fr.toLocaleLowerCase('fr-CA') === preferredPlace);
  return place ? (preferredPlace === 'maison' ? `à la ${place.fr}` : `au ${place.fr}`) : 'à la maison';
};

const levels: { id: SentenceLevel; label: string; detail: string }[] = [
  { id: 1, label: 'Niveau 1', detail: 'Phrase complète' },
  { id: 2, label: 'Niveau 2', detail: 'Personne + verbe + objet' },
  { id: 3, label: 'Niveau 3', detail: 'Quand + où' },
];

export const SentenceBuilder: React.FC = () => {
  const [words, setWords] = useState<WordItem[]>(contentManager.getWords());
  const [wordIndex, setWordIndex] = useState(0);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [level, setLevel] = useState<SentenceLevel>(2);

  useEffect(() => contentManager.subscribe(() => setWords(contentManager.getWords())), []);

  const focusWords = words.filter(word => word.categoryId === 14 || word.categoryId === 15);
  const currentWord = focusWords.length ? focusWords[wordIndex % focusWords.length] : undefined;
  const examples = currentWord ? createExamples(currentWord) : undefined;
  const currentExample = examples?.[exampleIndex];
  const sentence = currentExample
    ? level === 3
      ? `${currentExample.sentence.replace(/[.!?]$/, '')} ${getTimePhrase(words, exampleIndex)} ${getPlacePhrase(words, exampleIndex)}.`
      : currentExample.sentence
    : '';

  const handleNext = () => {
    audioManager.playPop(500);
    if (exampleIndex === 0) {
      setExampleIndex(1);
    } else {
      setExampleIndex(0);
      setWordIndex(index => index + 1);
    }
  };

  const handleLevelChange = (nextLevel: SentenceLevel) => {
    audioManager.playPop(400);
    setLevel(nextLevel);
  };

  const speakSentence = () => {
    if (sentence) speechManager.speak(sentence);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-b from-teal-50 via-sky-50 to-amber-50 select-none overflow-hidden">
      <div className="w-full flex items-center justify-between z-20 pr-60 md:pr-72">
        <div className="flex items-center gap-1">
          {levels.map(item => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleLevelChange(item.id)}
              className={`px-1 md:px-3 py-2 rounded-2xl font-bold text-xs md:text-sm shadow-md border-2 transition-all ${
                level === item.id
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
              aria-pressed={level === item.id}
              aria-label={`${item.label}: ${item.detail}`}
            >
              <span className="md:hidden">{item.id}</span>
              <span className="hidden md:inline">{item.label} · {item.detail}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 w-full max-w-3xl flex flex-col items-center justify-center gap-4">
        {currentWord && currentExample ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => speechManager.speak(currentWord.fr, currentWord.id)}
                className="flex flex-col items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-indigo-400"
                aria-label={`Écouter le mot ${currentWord.fr}`}
              >
                <ToddlerGraphic
                  id={currentWord.id}
                  word={currentWord.fr}
                  category={currentWord.categoryId}
                  size={96}
                />
                <span className="text-sm font-extrabold text-slate-600">
                  {currentWord.categoryId === 14 ? '⚡ Verbe' : '✨ Mot descriptif'} · {exampleIndex + 1}/2
                </span>
              </button>
            </div>

            <div className="w-full rounded-3xl bg-white/80 border-4 border-dashed border-teal-300 shadow-xl p-4 md:p-6">
              {level >= 2 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  {[
                    { label: 'Personne', value: currentExample.subject },
                    { label: 'Verbe', value: currentExample.verb },
                    { label: 'Objet / description', value: currentExample.complement },
                  ].map((part, index) => (
                    <React.Fragment key={part.label}>
                      {index > 0 && <span className="text-2xl font-black text-teal-500">+</span>}
                      <div className="min-w-24 rounded-2xl bg-white border-2 border-teal-200 px-3 py-2 text-center shadow-sm">
                        <span className="block text-[10px] font-bold uppercase text-slate-500">{part.label}</span>
                        <span className="font-extrabold text-slate-800">{part.value}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {level === 3 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-sm font-bold text-indigo-700">
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1">
                    ⏳ {getTimePhrase(words, exampleIndex)}
                  </span>
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1">
                    📍 {getPlacePhrase(words, exampleIndex)}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={speakSentence}
                className="w-full rounded-2xl bg-emerald-50 hover:bg-emerald-100 px-4 py-4 text-center text-xl md:text-2xl font-extrabold text-emerald-800 transition-colors"
                aria-label={`Écouter : ${sentence}`}
              >
                🔊 {sentence}
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-white p-6 text-center font-bold text-slate-600 shadow-lg">
            Ajoute des verbes et des mots descriptifs dans l’Imagier pour créer des phrases.
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center pb-4">
        {currentWord && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500 text-white shadow-2xl border-4 border-white flex items-center justify-center text-3xl md:text-4xl animate-bounce"
            aria-label={exampleIndex === 1 ? 'Mot suivant' : 'Phrase suivante'}
          >
            <span>👉</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
