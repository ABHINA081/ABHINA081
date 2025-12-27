import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NotebookPen, Sparkles } from 'lucide-react';

interface NotesViewProps {
  notes: string;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
}

export const NotesView: React.FC<NotesViewProps> = ({ notes, isGenerating, onGenerate, canGenerate }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <NotebookPen className="text-purple-600" />
          AI Notes & Summary
        </h2>
        <button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${canGenerate && !isGenerating
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isGenerating ? (
            <>
              <Sparkles className="animate-spin" size={16} />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Notes
            </>
          )}
        </button>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {notes ? (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <NotebookPen size={48} className="opacity-20" />
            <p className="italic text-center max-w-xs">
              Record some audio first, then click "Generate Notes" to create a summary and structured notes using AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
