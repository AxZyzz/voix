import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, MessageCircle, Languages, Camera, Users, Smile } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onEnter: () => void;
}

const supportedLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Hindi', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Malayalam', 'Tamil', 'Bengali', 'Turkish', 'Dutch', 'Greek', 'Polish', 'Swedish', 'Norwegian', 'Finnish', 'Danish', 'Czech', 'Hungarian', 'Thai', 'Vietnamese', 'Indonesian', 'Filipino', 'Swahili', 'Hebrew', 'Urdu', 'Persian', 'Romanian', 'Ukrainian', 'Serbian', 'Croatian', 'Slovak', 'Bulgarian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Georgian', 'Armenian', 'Azerbaijani', 'Kazakh', 'Uzbek', 'Mongolian', 'Other'
];

// Map languages to country codes for flags
const languageToCountry: Record<string, string> = {
  English: 'GB',
  Spanish: 'ES',
  French: 'FR',
  German: 'DE',
  Chinese: 'CN',
  Japanese: 'JP',
  Korean: 'KR',
  Hindi: 'IN',
  Arabic: 'SA',
  Russian: 'RU',
  Portuguese: 'PT',
  Italian: 'IT',
  Malayalam: 'IN',
  Tamil: 'IN',
  Bengali: 'BD',
  Turkish: 'TR',
  Dutch: 'NL',
  Greek: 'GR',
  Polish: 'PL',
  Swedish: 'SE',
  Norwegian: 'NO',
  Finnish: 'FI',
  Danish: 'DK',
  Czech: 'CZ',
  Hungarian: 'HU',
  Thai: 'TH',
  Vietnamese: 'VN',
  Indonesian: 'ID',
  Filipino: 'PH',
  Swahili: 'TZ',
  Hebrew: 'IL',
  Urdu: 'PK',
  Persian: 'IR',
  Romanian: 'RO',
  Ukrainian: 'UA',
  Serbian: 'RS',
  Croatian: 'HR',
  Slovak: 'SK',
  Bulgarian: 'BG',
  Slovenian: 'SI',
  Estonian: 'EE',
  Latvian: 'LV',
  Lithuanian: 'LT',
  Georgian: 'GE',
  Armenian: 'AM',
  Azerbaijani: 'AZ',
  Kazakh: 'KZ',
  Uzbek: 'UZ',
  Mongolian: 'MN',
  Other: 'UN', // Use UN flag or fallback
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const cardAnimations = [
    'animate-fade-in-up delay-100',
    'animate-fade-in-up delay-300',
    'animate-fade-in-up delay-500',
    'animate-fade-in-up delay-700',
  ];

  // Modal state
  // const [showModal, setShowModal] = useState(true);
  // const [step, setStep] = useState(1);
  // const [knownLanguages, setKnownLanguages] = useState<string[]>([]);
  // const [targetLanguage, setTargetLanguage] = useState<string>("");

  // const handleKnownLanguageChange = (lang: string) => {
  //   setKnownLanguages(prev =>
  //     prev.includes(lang)
  //       ? prev.filter(l => l !== lang)
  //       : [...prev, lang]
  //   );
  // };

  // const handleTargetLanguageChange = (lang: string) => {
  //   setTargetLanguage(lang);
  // };

  // const handleNext = () => {
  //   if (step === 1 && knownLanguages.length > 0) {
  //     setStep(2);
  //   }
  // };

  // const handleStart = () => {
  //   if (targetLanguage) {
  //     setShowModal(false);
  //   }
  // };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-xl shadow-md"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <Smile className="w-8 h-8 text-purple-600 animate-bounce" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NOVA AI</span>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <a href="#home" className="hover:text-purple-600 transition-colors">Home</a>
          <a href="#features" className="hover:text-purple-600 transition-colors">Features</a>
          <a href="#community" className="hover:text-purple-600 transition-colors">Community</a>
          <a href="#about" className="hover:text-purple-600 transition-colors">About</a>
        </div>
        {/* Profile Avatar */}
        <div className="flex items-center space-x-3">
          <motion.img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-md object-cover hover:scale-105 transition-transform duration-200"
            whileHover={{ scale: 1.12 }}
          />
        </div>
      </motion.nav>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl mx-auto mt-32 animate-pulse" />
        {/* Floating sparkles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400/30 rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 90 + 5}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen pt-32 pb-10 relative z-10 w-full">
        {/* Animated Icon */}
        <motion.div
          className="flex items-center justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-24 h-24 text-purple-500 drop-shadow-xl animate-bounce-slow" />
        </motion.div>
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-move text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Speak. Learn. Connect.
        </motion.h1>
        {/* Subheadline */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8 animate-fade-in-up delay-200 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The modern way to master languages with AI.
        </motion.h2>
        {/* CTA Button */}
        <motion.button
          onClick={onEnter}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-4 mx-auto animate-fade-in-up delay-500"
          whileHover={{ scale: 1.08 }}
        >
          <span>Start Learning</span>
          <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
        {/* Features Preview */}
        <motion.div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[0,1,2,3].map(i => (
            <div key={i} className={`bg-white/70 rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/30 flex flex-col items-center ${cardAnimations[i]}`}> 
              <div className={`bg-gradient-to-r ${i===0?'from-blue-500 to-blue-600':i===1?'from-green-500 to-green-600':i===2?'from-purple-500 to-purple-600':'from-indigo-500 to-purple-600'} rounded-xl p-4 mb-4 shadow-lg`}> 
                {i===0 ? <MessageCircle className="w-10 h-10 text-white" /> : i===1 ? <Languages className="w-10 h-10 text-white" /> : i===2 ? <Camera className="w-10 h-10 text-white" /> : <Users className="w-10 h-10 text-white" />} 
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{['AI Chat','Translate','Visual','Community'][i]}</h3>
              <p className="text-gray-600 text-sm text-center">{[
                'Converse with smart AI',
                'Instant voice & text translation',
                'Learn with your camera',
                'Meet language buddies',
              ][i]}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;