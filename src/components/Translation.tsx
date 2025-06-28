import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, ArrowRight, Volume2, Copy, Check, Lightbulb } from 'lucide-react';
import { CurrentPage } from '../App';
import VoiceRecorder from './VoiceRecorder';
import { TranslationService, TranslationResult, GeminiScenario } from '../lib/translationService';

interface TranslationProps {
  onNavigate: (page: CurrentPage) => void;
}

const Translation: React.FC<TranslationProps> = ({ onNavigate }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [languages, setLanguages] = useState([
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ]);
  const [geminiScenario, setGeminiScenario] = useState<GeminiScenario | null>(null);
  const [showScenario, setShowScenario] = useState(false);
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);

  // Load supported languages on component mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const supportedLanguages = await TranslationService.getSupportedLanguages();
        // Merge with existing languages to keep flags
        const mergedLanguages = supportedLanguages.map(lang => {
          const existing = languages.find(l => l.code === lang.code);
          return {
            code: lang.code,
            name: lang.name,
            flag: existing?.flag || '🌐'
          };
        });
        setLanguages(mergedLanguages);
      } catch (error) {
        console.error('Failed to load languages:', error);
      }
    };
    loadLanguages();
  }, []);

  const translateText = async (text: string) => {
    if (!text.trim()) return;
    
    setIsTranslating(true);
    setGeminiScenario(null);
    setShowScenario(false);
    
    try {
      const result: TranslationResult = await TranslationService.translateText(text, targetLang, sourceLang);
      setTranslatedText(result.translatedText);
      
      // Generate contextual scenario for all types of input (words, phrases, sentences)
      setIsGeneratingScenario(true);
      try {
        const scenario = await TranslationService.createContextualScenario(
          text.trim(),
          sourceLang,
          targetLang,
          result.translatedText
        );
        setGeminiScenario(scenario);
      } catch (error) {
        console.error('Failed to generate scenario:', error);
      } finally {
        setIsGeneratingScenario(false);
      }
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleVoiceRecording = (audioBlob: Blob) => {
    // Simulate voice-to-text conversion
    const simulatedText = "This is your voice converted to text";
    setSourceText(simulatedText);
    translateText(simulatedText);
    setIsVoiceMode(false);
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  };

  const renderScenario = (scenario: GeminiScenario) => {
    // Convert markdown-style bold to HTML
    const formattedScenario = scenario.scenario.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Learning Context</span>
          </div>
          <button
            onClick={() => setShowScenario(!showScenario)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showScenario ? 'Hide' : 'Show Study Materials'}
          </button>
        </div>
        
        {showScenario && (
          <div className="space-y-4">
            {/* Scenario */}
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Usage Scenario</h4>
              <div 
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedScenario }}
              />
            </div>

            {/* Context */}
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Context & Explanation</h4>
              <div className="text-sm text-gray-700 leading-relaxed">
                {scenario.context}
              </div>
            </div>

            {/* Study Tips */}
            {scenario.studyTips && (
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Study Tips</h4>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {scenario.studyTips}
                </div>
              </div>
            )}

            {/* Practice Exercise */}
            {scenario.practiceExercise && (
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Practice Exercise</h4>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {scenario.practiceExercise}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Smart Translation</h1>
                  <p className="text-sm text-gray-600">Translate text and speech instantly with AI context</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Language Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={swapLanguages}
              className="mx-4 p-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors duration-300"
            >
              <ArrowRight className="w-6 h-6 text-green-600" />
            </button>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Source Text */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {languages.find(l => l.code === sourceLang)?.flag} {languages.find(l => l.code === sourceLang)?.name}
              </h3>
              <button
                onClick={() => speakText(sourceText, sourceLang)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                disabled={!sourceText}
              >
                <Volume2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                if (e.target.value) {
                  translateText(e.target.value);
                } else {
                  setTranslatedText('');
                  setGeminiScenario(null);
                }
              }}
              placeholder="Type or paste text to translate..."
              className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Translated Text */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {languages.find(l => l.code === targetLang)?.flag} {languages.find(l => l.code === targetLang)?.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => speakText(translatedText, targetLang)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                  disabled={!translatedText}
                >
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                  disabled={!translatedText}
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                </button>
              </div>
            </div>
            <div className="w-full h-40 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 overflow-y-auto">
              {isTranslating ? 'Translating...' : translatedText}
            </div>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Phrases</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Hello, how are you?",
              "Thank you very much",
              "Where is the bathroom?",
              "How much does this cost?",
              "I don't understand",
              "Can you help me?",
              "What time is it?",
              "I'm learning your language",
              "Nice to meet you"
            ].map((phrase, index) => (
              <button
                key={index}
                onClick={() => {
                  setSourceText(phrase);
                  translateText(phrase);
                }}
                className="text-left p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition-all duration-300"
              >
                <span className="text-sm text-gray-700">{phrase}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;