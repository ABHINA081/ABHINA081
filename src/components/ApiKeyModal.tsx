import React, { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ apiKey, setApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  useEffect(() => {
    // Open if no key is present on load
    if (!apiKey) {
      setIsOpen(true);
    }
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(tempKey);
    setIsOpen(false);
  };

  if (!isOpen && apiKey) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 shadow-lg"
        title="Settings"
      >
        <Key size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Key size={24} /> Configure Gemini API
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          To use the AI summarization features, please enter your Google Gemini API Key.
          It is stored locally in your browser.
        </p>
        <input
          type="password"
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
          placeholder="Enter API Key"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex justify-end gap-2">
          {apiKey && (
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!tempKey}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};
