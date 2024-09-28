import React from 'react';

interface ConversationTypeSelectorProps {
  onSelect: (type: string) => void;
  promptTypes: string[];
  selectedType: string;
}

export const ConversationTypeSelector: React.FC<ConversationTypeSelectorProps> = ({ onSelect, promptTypes = [], selectedType }) => {
  return (
    <div className="mb-6">
      <label htmlFor="interview_type" className="block text-gray-700 text-sm font-bold mb-2">Select Interview Type:</label>
      <select
        id="interview_type"
        onChange={(e) => onSelect(e.target.value)}
        value={selectedType}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="default">Default</option>
        {promptTypes.filter(type => type !== 'default').map((type) => (
          <option key={type} value={type}>
            {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
};