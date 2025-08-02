import React from 'react';
import { GraduationCap } from 'lucide-react';
import VoiceWidget from './components/VoiceWidget';
import NotesPanel from './components/NotesPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Resultyst</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your AI Study Companion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant help with your homework and studies through voice interaction.
            Just speak your question and get expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VoiceWidget />
          <NotesPanel />
        </div>
      </main>

      <footer className="mt-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Resultyst. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}