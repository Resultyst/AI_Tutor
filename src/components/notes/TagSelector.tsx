import React, { useState } from 'react';
import { Tag as TagIcon, Plus, X } from 'lucide-react';
import { getTagColors } from './TagConfig';

interface TagSelectorProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  customSubject: string;
  onCustomSubjectChange: (value: string) => void;
  onAddCustomSubject: () => void;
  availableSubjects: string[];
}

export default function TagSelector({
  selectedSubject,
  onSubjectChange,
  customSubject,
  onCustomSubjectChange,
  onAddCustomSubject,
  availableSubjects,
}: TagSelectorProps) {
  const [showInput, setShowInput] = useState(false);

  const handleAddCustom = () => {
    if (customSubject.trim()) {
      onAddCustomSubject();
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {availableSubjects.map((subject) => {
          const colors = getTagColors(subject);
          const isSelected = selectedSubject === subject;
          return (
            <button
              key={subject}
              onClick={() => onSubjectChange(subject)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1.5 transition-all ${
                isSelected
                  ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                  : `hover:${colors.bg} hover:${colors.text} border-2 border-transparent`
              }`}
            >
              <TagIcon className="w-3.5 h-3.5" />
              <span>{subject}</span>
            </button>
          );
        })}
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1.5 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Subject</span>
          </button>
        )}
      </div>
      {showInput && (
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <TagIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter subject name..."
              value={customSubject}
              onChange={(e) => onCustomSubjectChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustom();
                }
              }}
              autoFocus
            />
          </div>
          <button
            onClick={handleAddCustom}
            disabled={!customSubject.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setShowInput(false);
              onCustomSubjectChange('');
            }}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}