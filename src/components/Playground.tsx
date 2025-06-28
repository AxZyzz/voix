import React, { useState, useRef } from 'react';

interface PlaygroundProps {
  onQuit?: () => void;
}

interface Puzzle {
  sentence: string;
  answer: string;
  options: string[];
}

interface LanguagePuzzles {
  [key: string]: Puzzle[];
}

const languagePuzzles: LanguagePuzzles = {
  english: [
    { sentence: "I ___ to school every day.", answer: "go", options: ["go", "went", "gone", "going"] },
    { sentence: "She is ___ a book.", answer: "reading", options: ["read", "reads", "reading", "readed"] },
    { sentence: "They ___ dinner at 7 PM.", answer: "have", options: ["have", "has", "having", "had"] },
    { sentence: "The sun ___ in the east.", answer: "rises", options: ["rise", "rises", "rising", "rose"] },
    { sentence: "We ___ to the beach last weekend.", answer: "went", options: ["go", "went", "gone", "going"] },
    { sentence: "He ___ his homework before dinner.", answer: "finished", options: ["finish", "finishes", "finished", "finishing"] }
  ],
  spanish: [
    { sentence: "Yo ___ español.", answer: "hablo", options: ["hablo", "hablas", "habla", "hablan"] },
    { sentence: "Ella ___ en Madrid.", answer: "vive", options: ["vivo", "vives", "vive", "viven"] },
    { sentence: "Nosotros ___ la comida.", answer: "comemos", options: ["como", "comes", "come", "comemos"] },
    { sentence: "Ellos ___ al parque.", answer: "van", options: ["voy", "vas", "va", "van"] },
    { sentence: "Tú ___ un libro.", answer: "lees", options: ["leo", "lees", "lee", "leen"] },
    { sentence: "La película ___ a las 8.", answer: "empieza", options: ["empiezo", "empiezas", "empieza", "empiezan"] }
  ],
  french: [
    { sentence: "Je ___ français.", answer: "parle", options: ["parle", "parles", "parle", "parlent"] },
    { sentence: "Elle ___ à Paris.", answer: "habite", options: ["habite", "habites", "habite", "habitent"] },
    { sentence: "Nous ___ le dîner.", answer: "mangeons", options: ["mange", "manges", "mange", "mangeons"] },
    { sentence: "Ils ___ au cinéma.", answer: "vont", options: ["vais", "vas", "va", "vont"] },
    { sentence: "Tu ___ un livre.", answer: "lis", options: ["lis", "lis", "lit", "lisent"] },
    { sentence: "Le film ___ à 20h.", answer: "commence", options: ["commence", "commences", "commence", "commencent"] }
  ],
  german: [
    { sentence: "Ich ___ Deutsch.", answer: "spreche", options: ["spreche", "sprichst", "spricht", "sprechen"] },
    { sentence: "Sie ___ in Berlin.", answer: "wohnt", options: ["wohne", "wohnst", "wohnt", "wohnen"] },
    { sentence: "Wir ___ das Abendessen.", answer: "essen", options: ["esse", "isst", "isst", "essen"] },
    { sentence: "Sie ___ ins Kino.", answer: "gehen", options: ["gehe", "gehst", "geht", "gehen"] },
    { sentence: "Du ___ ein Buch.", answer: "liest", options: ["lese", "liest", "liest", "lesen"] },
    { sentence: "Der Film ___ um 20 Uhr.", answer: "beginnt", options: ["beginne", "beginnst", "beginnt", "beginnen"] }
  ],
  chinese: [
    { sentence: "我 ___ 中文。", answer: "说", options: ["说", "说", "说", "说"] },
    { sentence: "她 ___ 在北京。", answer: "住", options: ["住", "住", "住", "住"] },
    { sentence: "我们 ___ 晚饭。", answer: "吃", options: ["吃", "吃", "吃", "吃"] },
    { sentence: "他们 ___ 去公园。", answer: "要", options: ["要", "要", "要", "要"] },
    { sentence: "你 ___ 一本书。", answer: "读", options: ["读", "读", "读", "读"] },
    { sentence: "电影 ___ 八点开始。", answer: "在", options: ["在", "在", "在", "在"] }
  ]
};

const languages = [
  { code: 'english', name: 'English', flag: '🇺🇸' },
  { code: 'spanish', name: 'Español', flag: '🇪🇸' },
  { code: 'french', name: 'Français', flag: '🇫🇷' },
  { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'chinese', name: '中文', flag: '🇨🇳' }
];

const Playground: React.FC<PlaygroundProps> = ({ onQuit }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState("");
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setCurrent(0);
    setResult("");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, word: string) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!selectedLanguage) return;
    
    const word = e.dataTransfer.getData("text/plain");
    const answer = languagePuzzles[selectedLanguage][current].answer;
    if (word === answer) {
      if (dropZoneRef.current) dropZoneRef.current.textContent = word;
      setResult("✅ Correct!");
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % languagePuzzles[selectedLanguage].length);
        setResult("");
        if (dropZoneRef.current) dropZoneRef.current.textContent = "Drop the correct word here";
      }, 1000);
    } else {
      setResult("❌ Try again!");
    }
  };

  const handleQuit = () => {
    if (onQuit) {
      onQuit();
    } else {
      window.location.reload();
    }
  };

  const handleBackToLanguageSelect = () => {
    setSelectedLanguage(null);
    setCurrent(0);
    setResult("");
  };

  // Language selection screen
  if (!selectedLanguage) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 p-4 relative overflow-hidden">
        {/* Animated floating shape */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-400/30 via-blue-300/20 to-pink-300/30 blur-3xl animate-pulse z-0" />
        <div className="relative z-10 w-full max-w-5xl bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-14 flex flex-col items-center border border-white/40">
          <button
            onClick={handleQuit}
            className="absolute top-8 right-8 px-5 py-2 bg-gray-200/80 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold shadow transition-all text-lg"
          >
            Quit
          </button>
          <h2 className="text-5xl font-extrabold mb-14 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-move tracking-tight drop-shadow-lg">Choose Your Language</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full justify-items-center">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="w-48 h-48 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-white/40 focus:outline-none focus:ring-4 focus:ring-purple-300/40 group relative"
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
              >
                <span className="text-6xl mb-2 drop-shadow-xl animate-bounce-slow">{language.flag}</span>
                <span className="text-3xl font-extrabold text-white drop-shadow-lg mb-1 group-hover:scale-110 transition-transform">{language.code.toUpperCase()}</span>
                <span className="text-lg font-semibold text-white/90 group-hover:text-white mt-1">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center relative">
        {/* Quit Button */}
        <button
          onClick={handleQuit}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold shadow transition-all"
        >
          Quit
        </button>
        
        {/* Back to Language Selection Button */}
        <button
          onClick={handleBackToLanguageSelect}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-lg font-semibold shadow transition-all"
        >
          ← Back
        </button>

        <div className="mt-8 mb-4">
          <div className="text-2xl mb-2">
            {languages.find(lang => lang.code === selectedLanguage)?.flag}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {languages.find(lang => lang.code === selectedLanguage)?.name} Playground
          </h2>
          <div className="text-sm text-gray-600">
            Puzzle {current + 1} of {languagePuzzles[selectedLanguage].length}
          </div>
        </div>

        <div className="mb-6 text-lg font-medium">
          {languagePuzzles[selectedLanguage][current].sentence.replace("___", "_____")}
        </div>
        <div
          ref={dropZoneRef}
          className="drop-zone mb-6 p-6 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 text-lg font-semibold min-h-[50px] flex items-center justify-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drop the correct word here
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {languagePuzzles[selectedLanguage][current].options.map((w) => (
            <div
              key={w}
              className="option px-6 py-2 bg-blue-600 text-white rounded-lg shadow cursor-grab hover:bg-blue-700 transition-all"
              draggable
              onDragStart={(e) => handleDragStart(e, w)}
            >
              {w}
            </div>
          ))}
        </div>
        <div className="result text-xl font-bold mt-2 min-h-[32px]">{result}</div>
      </div>
    </div>
  );
};

export default Playground; 