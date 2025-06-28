import React, { useState } from 'react';
import { BookOpen, Search, Volume2 } from 'lucide-react';

const Dictionary: React.FC = () => {
  const [word, setWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDefinition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSearchWord(word);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) throw new Error('Word not found');
      const data = await res.json();
      setResult(data[0]);
    } catch (err: any) {
      setError('No definition found for this word.');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-start p-4">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => window.location.href = '/'}
        className="self-start mb-4 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg font-semibold shadow transition-all flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 mt-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dictionary</h1>
        </div>
        <form onSubmit={fetchDefinition} className="flex items-center mb-8">
          <input
            type="text"
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="Enter a word..."
            className="flex-1 p-4 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
          />
          <button
            type="submit"
            className="p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-r-lg transition-colors"
            disabled={loading}
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
        {loading && <div className="text-pink-500 mb-4">Searching...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {result && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl font-bold text-purple-700">{result.word}</span>
              {result.phonetics && result.phonetics[0]?.audio && (
                <button
                  onClick={() => playAudio(result.phonetics[0].audio)}
                  className="ml-2 p-2 bg-purple-100 hover:bg-purple-200 rounded-full"
                  title="Play pronunciation"
                >
                  <Volume2 className="w-5 h-5 text-purple-600" />
                </button>
              )}
              {result.phonetic && (
                <span className="text-lg text-gray-500 ml-2">/{result.phonetic}/</span>
              )}
            </div>
            {result.meanings && result.meanings.map((meaning: any, idx: number) => (
              <div key={idx} className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-2">
                <div className="flex items-center mb-2">
                  <span className="text-md font-semibold text-purple-700 mr-2">{meaning.partOfSpeech}</span>
                </div>
                {meaning.definitions && meaning.definitions.map((def: any, i: number) => (
                  <div key={i} className="mb-3">
                    <div className="text-gray-800 text-lg">{i + 1}. {def.definition}</div>
                    {def.example && (
                      <div className="text-gray-500 text-sm mt-1">Example: <span className="italic">{def.example}</span></div>
                    )}
                  </div>
                ))}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Synonyms:</span> {meaning.synonyms.join(', ')}
                  </div>
                )}
                {meaning.antonyms && meaning.antonyms.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Antonyms:</span> {meaning.antonyms.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary; 