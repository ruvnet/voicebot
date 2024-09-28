import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import axios from 'axios';

export const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    apiKey: '',
    webhook: '',
    analysisSchema: '',
    timeout: 2000,
    cache: true,
    from: '',
    pathwayId: '',
    voiceSettings: '{}',
    localDialing: false,
    maxDuration: 2,
    answeredByEnabled: true,
    waitForGreeting: true,
    record: true,
    amd: false,
    interruptionThreshold: 100,
    voicemailMessage: '',
    temperature: 0.7,
    transferPhoneNumber: '',
    pronunciationGuide: '[]',
    startTime: '',
    requestData: '{}',
    tools: '{}',
    dynamicData: '[]',
    analysisPreset: '',
    calendly: '{}'
  });

  const [useStoredApiKey, setUseStoredApiKey] = useState(false);
  const [apiKeySuccess, setApiKeySuccess] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('blandApiKey');
    if (storedApiKey) {
      setSettings(prev => ({ ...prev, apiKey: storedApiKey }));
      setUseStoredApiKey(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    if (name === 'apiKey') {
      setApiKeySuccess(false);
      localStorage.setItem('blandApiKey', value);
    }
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = () => {
    if (useStoredApiKey) {
      localStorage.setItem('blandApiKey', settings.apiKey);
    } else {
      localStorage.removeItem('blandApiKey');
    }
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
    });
  };

  const testApiKey = async () => {
    try {
      const response = await axios.get('https://api.bland.ai/v1/calls', {
        headers: { Authorization: settings.apiKey }
      });
      if (response.status === 200) {
        setApiKeySuccess(true);
        toast({
          title: "API Key Valid",
          description: "Your API key is valid and working correctly.",
        });
      }
    } catch (error) {
      setApiKeySuccess(false);
      toast({
        title: "API Key Error",
        description: "There was an error validating your API key. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  const settingsGroups = [
    {
      title: "API Configuration",
      items: [
        {
          name: "apiKey",
          label: "API Key",
          description: "Your Bland AI API key"
        },
        {
          name: "webhook",
          label: "Webhook URL",
          description: "URL for receiving call events"
        }
      ]
    },
    {
      title: "Call Settings",
      items: [
        { name: "from", label: "From Number", description: "The phone number to call from" },
        { name: "maxDuration", label: "Max Duration", description: "Maximum call duration in minutes" },
        { name: "localDialing", label: "Local Dialing", description: "Enable local dialing", type: "switch" },
        { name: "answeredByEnabled", label: "Answered By Enabled", description: "Enable answered by detection", type: "switch" },
        { name: "waitForGreeting", label: "Wait for Greeting", description: "Wait for greeting before speaking", type: "switch" },
        { name: "record", label: "Record Call", description: "Record the call", type: "switch" },
        { name: "amd", label: "AMD", description: "Enable Answering Machine Detection", type: "switch" },
      ]
    },
    {
      title: "Voice Settings",
      items: [
        { name: "voiceSettings", label: "Voice Settings", description: "JSON string of voice settings" },
        { name: "interruptionThreshold", label: "Interruption Threshold", description: "Threshold for interruptions in milliseconds" },
        { name: "temperature", label: "Temperature", description: "AI response randomness (0-1)" },
        { name: "pronunciationGuide", label: "Pronunciation Guide", description: "JSON array of pronunciation guides" },
      ]
    },
    {
      title: "Advanced Settings",
      items: [
        { name: "analysisSchema", label: "Analysis Schema", description: "JSON schema for call analysis" },
        { name: "timeout", label: "Timeout", description: "API request timeout in milliseconds" },
        { name: "cache", label: "Cache", description: "Enable caching", type: "switch" },
        { name: "pathwayId", label: "Pathway ID", description: "ID of the conversation pathway" },
        { name: "transferPhoneNumber", label: "Transfer Phone Number", description: "Number to transfer calls to" },
        { name: "startTime", label: "Start Time", description: "Scheduled start time for the call" },
        { name: "requestData", label: "Request Data", description: "Additional JSON data for the request" },
        { name: "tools", label: "Tools", description: "JSON object of available tools" },
        { name: "dynamicData", label: "Dynamic Data", description: "JSON array of dynamic data" },
        { name: "analysisPreset", label: "Analysis Preset", description: "Preset for call analysis" },
        { name: "calendly", label: "Calendly", description: "JSON object for Calendly integration" },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="use-stored-api-key"
          checked={useStoredApiKey}
          onCheckedChange={(checked) => setUseStoredApiKey(checked)}
        />
        <Label htmlFor="use-stored-api-key">Use stored API key</Label>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {settingsGroups.map((group, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{group.title}</AccordionTrigger>
            <AccordionContent>
              {group.items.map((item) => (
                <div key={item.name} className="mb-4">
                  <Label htmlFor={item.name} className="text-sm font-medium">
                    {item.label}
                  </Label>
                  <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                  {item.type === 'switch' ? (
                    <Switch
                      id={item.name}
                      checked={settings[item.name as keyof typeof settings] as boolean}
                      onCheckedChange={handleSwitchChange(item.name)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Input
                        type={typeof settings[item.name as keyof typeof settings] === 'number' ? 'number' : 'text'}
                        id={item.name}
                        name={item.name}
                        value={settings[item.name as keyof typeof settings] as string | number}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                      {item.name === 'apiKey' && (
                        <>
                          <Button onClick={testApiKey} variant="outline">Test</Button>
                          {apiKeySuccess && <CheckCircle2 className="text-green-500" />}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button onClick={handleSaveSettings} className="w-full">
        Save Settings
      </Button>
    </div>
  );
};