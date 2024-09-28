import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchPrompt = async (type) => {
  // This would be replaced with an actual API call
  return `This is a ${type} conversation. How can I assist you today?`;
};

export const ConversationPrompt = ({ type }) => {
  const { data: prompt, isLoading, error } = useQuery({
    queryKey: ['prompt', type],
    queryFn: () => fetchPrompt(type),
  });

  if (isLoading) return <div>Loading prompt...</div>;
  if (error) return <div>Error loading prompt</div>;

  return <div className="bg-white p-4 rounded shadow">{prompt}</div>;
};