import React, { useRef, useState } from 'react';
import { Upload, FileText, Check, Copy, Volume2, Languages } from 'lucide-react';
import { TranslationService } from '../lib/translationService';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
];

const TextFromImage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setExtractedText('');
      setTranslatedText('');
      setError(null);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setExtractedText('');
    setTranslatedText('');
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCuzGloBEG2vf8v3r5aPDGB3mPAoloy5Zk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64 },
                features: [{ type: 'TEXT_DETECTION', maxResults: 1 }]
              }
            ]
          })
        });
        const data = await response.json();
        let detected = '';
        if (data.responses && data.responses[0] && data.responses[0].textAnnotations && data.responses[0].textAnnotations[0]) {
          detected = data.responses[0].textAnnotations[0].description;
        }
        setExtractedText(detected);
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setError('Failed to read image file.');
        setIsProcessing(false);
      };
      reader.readAsDataURL(selectedImage);
    } catch (err) {
      setError('Failed to process image.');
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const speak = (text: string) => {
    const utter = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  };

  const handleTranslate = async () => {
    if (!extractedText.trim()) return;
    setIsTranslating(true);
    setTranslatedText('');
    try {
      const result = await TranslationService.translateText(extractedText, targetLanguage, undefined);
      setTranslatedText(result.translatedText);
    } catch (err) {
      setTranslatedText('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-start p-4">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => window.location.href = '/'}
        className="self-start mb-4 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-semibold shadow transition-all flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 mt-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Text from Image</h1>
        </div>
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            {!imagePreview ? (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload an image to extract text</p>
                <p className="text-sm text-gray-500 mb-4">Supports: JPEG, PNG, GIF, BMP (max 10MB)</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Choose Image
                </button>
              </div>
            ) : (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-64 mx-auto rounded-lg mb-4"
                />
                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Extract Text'}
                </button>
              </div>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {extractedText && (
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-md font-semibold text-purple-700">Extracted Text</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => speak(extractedText)}
                  className="p-1 bg-purple-100 hover:bg-purple-200 rounded"
                >
                  <Volume2 className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => copyToClipboard(extractedText)}
                  className="p-1 bg-purple-100 hover:bg-purple-200 rounded"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-purple-600" />}
                </button>
              </div>
            </div>
            <div className="text-gray-800 whitespace-pre-wrap min-h-[40px]">{extractedText}</div>
            {/* Translation Section */}
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <Languages className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-md font-semibold text-purple-700">Translate Extracted Text</span>
              </div>
              <div className="flex items-center mb-4">
                <select
                  value={targetLanguage}
                  onChange={e => setTargetLanguage(e.target.value)}
                  className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </button>
              </div>
              {translatedText && (
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-md font-semibold text-purple-700">Translation</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => speak(translatedText)}
                        className="p-1 bg-purple-100 hover:bg-purple-200 rounded"
                      >
                        <Volume2 className="w-4 h-4 text-purple-600" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(translatedText)}
                        className="p-1 bg-purple-100 hover:bg-purple-200 rounded"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-purple-600" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap min-h-[40px]">{translatedText}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextFromImage; 