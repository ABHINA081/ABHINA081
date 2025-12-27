import React, { useRef, useEffect } from 'react';
import { ScrollText } from 'lucide-react';

interface TranscriptViewProps {
  transcript: string;
  isListening: boolean;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({ transcript, isListening }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ScrollText className="text-blue-600" />
          Live Transcript
        </h2>
        {isListening && (
          <span className="flex items-center gap-2 text-red-500 text-sm animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Recording...
          </span>
        )}
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
        {transcript ? (
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
            {transcript}
          </p>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 italic">
            Waiting for speech...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
