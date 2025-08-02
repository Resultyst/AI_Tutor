export const TAG_COLORS = {
  'Mathematics': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', hover: 'hover:bg-blue-200' },
  'Physics': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', hover: 'hover:bg-purple-200' },
  'Chemistry': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', hover: 'hover:bg-green-200' },
  'Biology': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', hover: 'hover:bg-emerald-200' },
  'History': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', hover: 'hover:bg-amber-200' },
  'Literature': { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300', hover: 'hover:bg-rose-200' },
  'Computer Science': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', hover: 'hover:bg-indigo-200' },
  'Languages': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', border: 'border-fuchsia-300', hover: 'hover:bg-fuchsia-200' },
  'Custom': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', hover: 'hover:bg-slate-200' }
} as const;

export type SubjectColor = keyof typeof TAG_COLORS;

export const getTagColors = (subject: string) => {
  const predefinedColors = TAG_COLORS[subject as SubjectColor];
  if (predefinedColors) return predefinedColors;

  // Generate consistent colors for custom tags based on string hash
  const hash = subject.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const colorIndex = Math.abs(hash) % customColorSchemes.length;
  return customColorSchemes[colorIndex];
};

const customColorSchemes = [
  { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300', hover: 'hover:bg-teal-200' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300', hover: 'hover:bg-cyan-200' },
  { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', hover: 'hover:bg-orange-200' },
  { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', hover: 'hover:bg-pink-200' },
  { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-300', hover: 'hover:bg-lime-200' },
];