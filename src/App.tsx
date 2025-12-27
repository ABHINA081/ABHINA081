import { useState, useEffect } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { TranscriptView } from './components/TranscriptView';
import { NotesView } from './components/NotesView';
import { ApiKeyModal } from './components/ApiKeyModal';
import { generateNotes } from './lib/gemini';
import { Mic, MicOff, Trash2 } from 'lucide-react';

function App() {
  // Persist API Key
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

  // Persist Transcript (optional, but good for refreshing)
  // For simplicity, we just keep it in state, but could use localStorage too.

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport
  } = useSpeechRecognition();

  const [aiNotes, setAiNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey);
    }
  }, [apiKey]);

  const handleGenerateNotes = async () => {
    if (!apiKey) {
      alert("Please set your Gemini API Key first.");
      return;
    }
    if (!transcript) return;

    setIsGenerating(true);
    setError(null);
    try {
      const notes = await generateNotes(apiKey, transcript);
      setAiNotes(notes);
    } catch (err: any) {
      setError(err.message || "An error occurred while generating notes.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Mic size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">AI Classroom Assistant</h1>
        </div>

        <div className="flex items-center gap-4">
          {!hasRecognitionSupport && (
            <span className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Browser not supported (Use Chrome/Edge)
            </span>
          )}

          <button
            onClick={resetTranscript}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear Transcript"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={toggleRecording}
            disabled={!hasRecognitionSupport}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all shadow-sm
              ${isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isListening ? (
              <>
                <MicOff size={18} /> Stop Recording
              </>
            ) : (
              <>
                <Mic size={18} /> Start Recording
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[60vh] md:h-full">
            <TranscriptView transcript={transcript} isListening={isListening} />
          </div>
          <div className="h-[60vh] md:h-full">
             {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
             )}
            <NotesView
              notes={aiNotes}
              isGenerating={isGenerating}
              onGenerate={handleGenerateNotes}
              canGenerate={!!transcript && !isListening}
            />
          </div>
        </div>
      </main>

      <ApiKeyModal apiKey={apiKey} setApiKey={setApiKey} />
    </div>
  );
}

export default App;
