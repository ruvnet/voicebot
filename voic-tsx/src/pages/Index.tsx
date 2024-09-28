import React, { useState, useEffect } from 'react';
import { ConversationTypeSelector } from '@/components/ConversationTypeSelector';
import { VoiceSelector } from '@/components/VoiceSelector';
import { PhoneCallIntegration } from '@/components/PhoneCallIntegration';
import { useConversation } from '@/hooks/useConversation';
import { Tabs } from '@/components/Tabs';
import { PromptManagement } from '@/components/PromptManagement';
import { Settings } from '@/components/Settings';
import { Documentation } from '@/components/Documentation';
import { getPrompt, getPromptTypes, INTERVIEW_PROMPTS } from '@/data/interviewPrompts';
import { startCall } from '@/api/blandApi';
import { toast } from 'sonner';
import { DynamicIntentConfig } from '@/components/DynamicIntentConfig';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const Index = () => {
  const [activeTab, setActiveTab] = useState('MainUI');
  const { startConversation, conversationState } = useConversation();
  const [interviewType, setInterviewType] = useState('default');
  const [voice, setVoice] = useState('nat');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [externalTools, setExternalTools] = useState([]);
  const promptTypes = getPromptTypes();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  const handleStartConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const toastId = toast.loading('Connecting...');
      const result = await startCall(phoneNumber, interviewType, voice, externalTools);
      toast.dismiss(toastId);
      
      // Assume success unless there's a specific error
      if (result) {
        toast.success(
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            Successfully Connected
          </div>
        );
        startConversation(interviewType, voice, phoneNumber);
      } else {
        toast.error('Failed to connect. Please check your API key and try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && (error.response.status === 401 || error.response.status === 404)) {
          toast.error(`Error ${error.response.status}: ${error.response.data.message || 'API error'}`);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      console.error('Error in handleStartConversation:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">AI Conversation Bot</h1>
          <h2 className="text-base text-gray-600 subheader">Phone-Based AI-Powered Assistant for<br />Mock Interviews and Personal Guidance</h2>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="tabcontainer">
          {activeTab === 'MainUI' && (
            <div className="bg-white shadow-md rounded px-6 py-8 mb-4">
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Refine your skills with our AI-powered phone call system. Choose an interview type, select a voice, and enter your phone number to start an interactive AI conversation.
              </p>
              <form onSubmit={handleStartConversation} className="mb-6">
                <ConversationTypeSelector onSelect={setInterviewType} promptTypes={promptTypes} selectedType={interviewType} />
                <VoiceSelector onSelect={setVoice} />
                <PhoneCallIntegration onPhoneNumberChange={setPhoneNumber} />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Start Call
                </button>
              </form>
            </div>
          )}

          {activeTab === 'PromptManagement' && <PromptManagement prompts={INTERVIEW_PROMPTS} />}
          {activeTab === 'Settings' && <Settings />}
          {activeTab === 'Documentation' && <Documentation />}
        </div>

        <p className="text-center text-gray-500 text-xs">
          &copy; AI Conversation Bot. No rights reserved, Go Crazy 🤪<br />
          Created by <a href="https://github.com/ruvnet/voicebot" className="text-blue-500 hover:text-blue-700">ruv | Open Source Code</a>
        </p>
      </div>
    </div>
  );
};

export default Index;