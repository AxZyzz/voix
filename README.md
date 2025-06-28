# 🎯 Voix - Adaptive Language Learning Companion

<div align="center">

![Voix Logo](https://img.shields.io/badge/Voix-Language%20Learning%20AI-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

*Your AI-Powered Language Learning Journey Starts Here*

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🛠 Tech Stack](#-tech-stack)
- [📱 Core Components](#-core-components)
- [🔧 API Integration](#-api-integration)
- [🎨 UI/UX Design](#-uiux-design)
- [📊 Project Structure](#-project-structure)
- [🔐 Environment Setup](#-environment-setup)
- [📦 Installation](#-installation)
- [⚡ Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

*Voix* is a comprehensive, AI-powered language learning platform that revolutionizes how people learn languages. Built with modern web technologies and cutting-edge AI, Voix provides an immersive, personalized learning experience that adapts to each user's unique learning style and pace.

### 🎯 Mission
To make language learning accessible, engaging, and effective through the power of artificial intelligence and modern technology.

### 🎨 Design Philosophy
- *Adaptive Learning*: AI that grows with you
- *Multi-modal Experience*: Text, voice, visual, and social learning
- *Real-world Context*: Practical scenarios and community interaction
- *Beautiful UX*: Modern, intuitive interface design

---

## ✨ Features

### 🤖 AI-Powered Conversations
- *Text Conversations*: Interactive chat with AI language partners
- *Voice Conversations*: Speech-based interactions with real-time processing
- *Adaptive Responses*: AI that adjusts to your proficiency level
- *Multi-language Support*: Conversations in 50+ languages
- *Contextual Learning*: AI generates relevant study materials

### 🌐 Smart Translation System
- *Real-time Translation*: Instant text translation with Google Translate API
- *Voice Input*: Speech-to-text functionality for hands-free translation
- *Contextual Scenarios*: AI-generated learning contexts for each translation
- *Pronunciation Guide*: Audio playback for translated text
- *Study Materials*: Automatically generated practice exercises

### 👁 Visual Learning
- *Image Recognition*: Identify objects through camera or uploaded images
- *Text Extraction*: Extract text from images using Google Vision API
- *Live OCR*: Real-time text detection from camera feed
- *Multi-language Labels*: Learn object names in target language
- *Pronunciation Support*: Audio pronunciation for identified objects

### 🎮 Interactive Learning Tools
- *Playground*: Grammar and vocabulary practice through interactive puzzles
- *Dictionary*: Comprehensive word lookup with meanings and examples
- *Drag & Drop Games*: Engaging language learning games
- *Progress Tracking*: Visual feedback on learning achievements

### 🌍 Global Community
- *User Matching*: Connect with native speakers and fellow learners
- *Language Exchange*: Find conversation partners based on language goals
- *Video/Text Chat*: Multiple communication options
- *User Profiles*: Detailed profiles with languages and interests
- *Rating System*: Community-driven quality assurance

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm
- Modern web browser with camera/microphone support
- Google Cloud API keys (for full functionality)

### Quick Start
bash
# Clone the repository
git clone https://github.com/your-username/voix.git
cd voix

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev


Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🛠 Tech Stack

### Frontend
- *React 18.3.1* - Modern React with concurrent features
- *TypeScript 5.5.3* - Type-safe development
- *Vite 7.0.0* - Fast build tool and dev server
- *Tailwind CSS 3.4.1* - Utility-first CSS framework
- *Framer Motion 12.19.2* - Smooth animations and transitions

### AI & APIs
- *Google Generative AI (Gemini Pro)* - Intelligent conversations
- *Google Translate API* - Multi-language translation
- *Google Vision API* - Image analysis and text extraction
- *TensorFlow.js* - Client-side object detection
- *Web Speech API* - Speech recognition and synthesis

### UI Components
- *Lucide React* - Beautiful, customizable icons
- *React Country Flag* - Language selection UI
- *React Router DOM* - Client-side routing

### Development Tools
- *ESLint* - Code linting and formatting
- *PostCSS* - CSS processing
- *Autoprefixer* - CSS vendor prefixing

---

## 📱 Core Components

### 🏠 Landing Page (LandingPage.tsx)
- Welcome screen with feature overview
- Animated background with gradient effects
- Feature preview cards with icons
- Smooth transitions and micro-interactions

### 🎛 Dashboard (Dashboard.tsx)
- Central hub for accessing all learning tools
- Feature grid with hover animations
- AI conversation choice modal
- Community connection section

### 💬 AI Conversations
#### Text Conversation (AIConversation.tsx)
- Real-time chat interface
- Message history with timestamps
- Loading states and error handling
- Responsive design for all devices

#### Voice Conversation (AIVoiceConversation.tsx)
- Speech recognition and synthesis
- Real-time audio level visualization
- Multi-language voice support
- Automatic language detection

### 🌐 Translation (Translation.tsx)
- Multi-language translation interface
- Voice input with recording capabilities
- Contextual learning scenarios
- Study materials generation
- Language swapping functionality

### 👁 Visual Learning
#### Image Identification (ImageIdentification.tsx)
- Camera integration for real-time capture
- Image upload with drag-and-drop
- Object recognition and labeling
- Pronunciation guides

#### Visual Learning (VisualLearning.tsx)
- Live OCR from camera feed
- Text extraction from images
- Real-time translation
- Multi-language support

### 🎮 Interactive Tools
#### Playground (Playground.tsx)
- Drag-and-drop grammar puzzles
- Multiple language support
- Progress tracking
- Interactive feedback

#### Dictionary (Dictionary.tsx)
- Word lookup with definitions
- Audio pronunciation
- Synonyms and antonyms
- Example sentences

#### Text from Image (TextFromImage.tsx)
- Image text extraction
- Translation capabilities
- Copy to clipboard
- Audio playback

### 👥 Community (UserConnect.tsx)
- User browsing and filtering
- Connection management
- Video and text chat options
- User profiles and ratings

---

## 🔧 API Integration

### Google Cloud Services
typescript
// Translation Service
const GOOGLE_TRANSLATE_API_KEY = 'your-api-key';
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

// Vision API
const VISION_API_KEY = 'your-api-key';
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

// Generative AI
const genAI = new GoogleGenerativeAI('your-api-key');


### Web APIs
- *MediaDevices API* - Camera and microphone access
- *Speech Recognition API* - Voice-to-text conversion
- *Speech Synthesis API* - Text-to-speech
- *WebRTC* - Real-time communication

---

## 🎨 UI/UX Design

### Design System
- *Color Palette*: Blue, purple, and pink gradients
- *Typography*: Modern, readable fonts
- *Spacing*: Consistent 8px grid system
- *Animations*: Smooth transitions and micro-interactions

### Responsive Design
- *Mobile-first approach*
- *Breakpoints*: sm, md, lg, xl
- *Touch-friendly interfaces*
- *Progressive enhancement*

### Accessibility
- *Keyboard navigation*
- *Screen reader support*
- *High contrast modes*
- *Focus management*

---

## 📊 Project Structure


voix/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── LandingPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AIConversation.tsx
│   │   ├── AIVoiceConversation.tsx
│   │   ├── Translation.tsx
│   │   ├── ImageIdentification.tsx
│   │   ├── VisualLearning.tsx
│   │   ├── Playground.tsx
│   │   ├── Dictionary.tsx
│   │   ├── TextFromImage.tsx
│   │   ├── UserConnect.tsx
│   │   └── VoiceRecorder.tsx
│   ├── lib/               # Utility libraries
│   │   ├── translationService.ts
│   │   ├── visualLearningService.ts
│   │   └── utils.ts
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation


---

## 🔐 Environment Setup

### Required Environment Variables
Create a .env file in the root directory:

env
# Google Cloud APIs
VITE_GOOGLE_TRANSLATE_API_KEY=your-translate-api-key
VITE_GOOGLE_VISION_API_KEY=your-vision-api-key
VITE_GOOGLE_GENERATIVE_AI_KEY=your-gemini-api-key

# Optional: Custom API endpoints
VITE_AI_CONVERSATION_WEBHOOK=your-webhook-url
VITE_VOICE_CONVERSATION_WEBHOOK=your-webhook-url


### API Key Setup
1. *Google Cloud Console*: Create a project and enable APIs
2. *Translation API*: Enable Google Translate API
3. *Vision API*: Enable Google Cloud Vision API
4. *Generative AI*: Enable Gemini API
5. *API Keys*: Generate and secure your API keys

---

## 📦 Installation

### Development Setup
bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint


### Production Deployment
bash
# Build the application
npm run build

# Deploy to your preferred platform
# (Vercel, Netlify, AWS, etc.)


---

## ⚡ Usage

### Getting Started
1. *Open the Application*: Navigate to the app URL
2. *Welcome Screen*: Review features and click "Start Learning"
3. *Dashboard*: Choose your learning adventure
4. *Select Feature*: Pick from AI conversations, translation, visual learning, etc.

### AI Conversations
1. *Choose Mode*: Text or voice conversation
2. *Select Language*: Pick your target language
3. *Start Chatting*: Begin your conversation with AI
4. *Practice*: Use the contextual scenarios provided

### Translation
1. *Input Text*: Type or speak your text
2. *Select Languages*: Choose source and target languages
3. *Translate*: Get instant translation
4. *Study*: Review generated learning materials

### Visual Learning
1. *Upload Image*: Select an image or use camera
2. *Extract Text*: Get text from images
3. *Translate*: Convert to your target language
4. *Practice*: Use extracted content for learning

### Community
1. *Browse Users*: Find language exchange partners
2. *Filter*: Search by language, level, interests
3. *Connect*: Start conversations or video calls
4. *Practice*: Learn with real people

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
bash
# Fork the repository
git clone https://github.com/your-username/voix.git
cd voix

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Add tests if applicable

# Commit your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request


### Contribution Guidelines
- *Code Style*: Follow existing TypeScript and React patterns
- *Testing*: Add tests for new features
- *Documentation*: Update docs for new functionality
- *Accessibility*: Ensure new features are accessible
- *Performance*: Consider performance implications

### Areas for Contribution
- *New Language Support*: Add more languages
- *UI Improvements*: Enhance user experience
- *AI Features*: Improve conversation quality
- *Mobile App*: React Native version
- *Backend*: Server-side features
- *Documentation*: Improve guides and tutorials

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-party Licenses
- *Google APIs*: Subject to Google's terms of service
- *React*: MIT License
- *Tailwind CSS*: MIT License
- *Framer Motion*: MIT License

---

## 🙏 Acknowledgments

- *Google Cloud* for providing powerful AI APIs
- *React Team* for the amazing framework
- *Tailwind CSS* for the utility-first CSS framework
- *Framer Motion* for smooth animations
- *Lucide* for beautiful icons
- *Open Source Community* for inspiration and tools

---

<div align="center">

*Made with ❤ by the Team VXSM*

</div>
