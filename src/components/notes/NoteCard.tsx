import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Tag as TagIcon } from 'lucide-react';
import { Note } from './types';
import { getTagColors } from './TagConfig';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const colors = getTagColors(note.subject || 'Custom');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white p-4 rounded-lg relative group border border-gray-100 hover:border-gray-200 transition-colors"
    >
      {note.subject && (
        <div className="flex items-center space-x-1 mb-2">
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border} border-2`}>
            <TagIcon className="w-3.5 h-3.5" />
            <span className="font-medium">{note.subject}</span>
          </span>
        </div>
      )}
      <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
      <span className="text-xs text-gray-500 mt-2 block">
        {new Date(note.timestamp).toLocaleString()}
      </span>
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full"
        aria-label="Delete note"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}