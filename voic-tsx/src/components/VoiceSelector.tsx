import React from 'react';

interface VoiceSelectorProps {
  onSelect: (voice: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <label htmlFor="voice" className="block text-gray-700 text-sm font-bold mb-2">Select Voice:</label>
      <select
        id="voice"
        onChange={(e) => onSelect(e.target.value)}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="maya">Maya</option>
        <option value="mason">Mason</option>
        <option value="ryan">Ryan</option>
        <option value="adriana">Adriana</option>
        <option value="tina">Tina</option>
        <option value="matt">Matt</option>
        <option value="evelyn">Evelyn</option>
      </select>
    </div>
  );
};