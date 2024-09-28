import axios from 'axios';
import { getPrompt } from '../data/interviewPrompts';

const getApiKey = () => {
  const envApiKey = import.meta.env.VITE_BLAND_AI_API_KEY;
  if (envApiKey) return envApiKey;
  
  const storedApiKey = localStorage.getItem('blandApiKey');
  if (storedApiKey) return storedApiKey;

  throw new Error('No API key found. Please set it in the environment or in the settings.');
};

const API_URL = 'https://api.bland.ai/v1/calls';

const blandApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

blandApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = getApiKey();
  return config;
});

export const startCall = async (phoneNumber: string, interviewType: string, voice: string, externalTools: any[]) => {
  const data = {
    phone_number: phoneNumber,
    from: null,
    task: getPrompt(interviewType),
    model: "enhanced",
    language: "en",
    voice: voice,
    voice_settings: {},
    pathway_id: null,
    local_dialing: false,
    max_duration: "2",
    answered_by_enabled: true,
    wait_for_greeting: true,
    record: true,
    amd: false,
    interruption_threshold: 100,
    voicemail_message: null,
    temperature: null,
    transfer_phone_number: null,
    transfer_list: {},
    metadata: {},
    pronunciation_guide: [],
    start_time: null,
    request_data: {},
    tools: externalTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      api_endpoint: tool.apiEndpoint,
      api_key: tool.apiKey,
      parameters: tool.parameters
    })),
    dynamic_data: [],
    analysis_preset: null,
    analysis_schema: {},
    webhook: null,
    calendly: {}
  };

  try {
    const response = await blandApi.post('', data);
    return response.data;
  } catch (error) {
    console.error('Error starting call:', error);
    throw error;
  }
};

export const testApiKey = async (apiKey: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: apiKey }
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};