import React, { useState, useEffect } from 'react';
import { PenLine, Save, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TagSelector from './notes/TagSelector';
import NoteCard from './notes/NoteCard';
import { Note } from './notes/types';
import { TAG_COLORS } from './notes/TagConfig';

const DEFAULT_SUBJECTS = Object.keys(TAG_COLORS).filter(subject => subject !== 'Custom');

export default function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('resultyst-subjects');
    return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem('resultyst-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      content: currentNote,
      timestamp: Date.now(),
      subject: selectedSubject || undefined,
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('resultyst-notes', JSON.stringify(updatedNotes));
    setCurrentNote('');
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('resultyst-notes', JSON.stringify(updatedNotes));
  };

  const addCustomSubject = () => {
    if (!customSubject.trim() || availableSubjects.includes(customSubject)) return;
    
    const updatedSubjects = [...availableSubjects, customSubject];
    setAvailableSubjects(updatedSubjects);
    setSelectedSubject(customSubject);
    setCustomSubject('');
    localStorage.setItem('resultyst-subjects', JSON.stringify(updatedSubjects));
  };

  const filteredNotes = notes.filter(note => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.content.toLowerCase().includes(searchLower) ||
      (note.subject?.toLowerCase().includes(searchLower))
    );
  }).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 h-[600px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <PenLine className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Study Notes</h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t pt-4 space-y-3">
        <TagSelector
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          customSubject={customSubject}
          onCustomSubjectChange={setCustomSubject}
          onAddCustomSubject={addCustomSubject}
          availableSubjects={availableSubjects}
        />
        <div className="flex space-x-2">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Take notes from your tutoring session..."
            className="flex-1 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows={3}
          />
          <button
            onClick={saveNote}
            disabled={!currentNote.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 h-fit"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}