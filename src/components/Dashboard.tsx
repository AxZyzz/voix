import React, { useState } from 'react';
import { MessageCircle, Languages, Camera, Users, ArrowLeft, Sparkles, ArrowRight, Gamepad2, BookOpen, FileText } from 'lucide-react';
import { CurrentPage } from '../App';
import { motion } from 'framer-motion';

interface DashboardProps {
  onNavigate: (page: CurrentPage) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [showAIChoice, setShowAIChoice] = useState(false);
  const features = [
    {
      id: 'ai-conversation',
      title: 'SWARAM AI',
      description: 'Practice natural conversations with our advanced AI language partner',
      icon: MessageCircle,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'translation',
      title: 'VOIX AI',
      description: 'Translate text and speech instantly with high accuracy',
      icon: Languages,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'playground',
      title: 'Playground',
      description: 'Practice grammar and vocabulary with interactive puzzles and games.',
      icon: Gamepad2,
      color: 'yellow',
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'dictionary',
      title: 'Dictionary',
      description: 'Expand your vocabulary with word meanings and examples.',
      icon: BookOpen,
      color: 'pink',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: 'text-from-image',
      title: 'Text from Image',
      description: 'Extract text from images using Google Vision API.',
      icon: FileText,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  if (showAIChoice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 max-w-md w-full flex flex-col items-center overflow-hidden">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-6"
          >
            <MessageCircle className="w-16 h-16 text-blue-500 drop-shadow-xl animate-bounce-slow" />
          </motion.div>
          <motion.h2
            className="text-4xl font-extrabold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-move text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            SWARAM AI
          </motion.h2>
          <motion.p
            className="text-gray-700 mb-10 text-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            How would you like to practice with your AI language partner?
          </motion.p>
          <motion.button
            className="w-full py-4 mb-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => onNavigate('ai-voice-conversation')}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
            Voice Conversation
          </motion.button>
          <motion.button
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => onNavigate('ai-conversation')}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <MessageCircle className="w-6 h-6 text-white animate-pulse" />
            Text Conversation
          </motion.button>
          <motion.button
            className="mt-8 text-gray-500 hover:text-gray-700 underline text-base"
            onClick={() => setShowAIChoice(false)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Back to Dashboard
          </motion.button>
          {/* Subtle animated background shapes */}
          <motion.div
            className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl z-0"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl z-0"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome to Your Learning Hub
              </h1>
              <p className="text-gray-600 text-lg">
                Choose your learning adventure
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">AI Powered</span>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onClick={() => feature.id === 'ai-conversation' ? setShowAIChoice(true) : onNavigate(feature.id as CurrentPage)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                <div className="flex items-center justify-center mb-6">
                  <div className={`bg-gradient-to-r ${feature.gradient} rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="text-center">
                  <div className={`inline-flex items-center text-${feature.color}-600 font-semibold group-hover:text-${feature.color}-700 transition-colors duration-300`}>
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Connect Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Connect with Real Users</h3>
              </div>
              <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl">
                Join our global community of language learners. Practice with native speakers, 
                make friends, and accelerate your learning through real conversations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('user-connect')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Connect Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;