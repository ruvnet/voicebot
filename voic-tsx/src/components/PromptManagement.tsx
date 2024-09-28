import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DynamicIntentConfig } from './DynamicIntentConfig';
import { getPromptTypes, getPrompt, saveUserPrompt } from '@/data/interviewPrompts';
import { useToast } from "@/hooks/use-toast";

interface PromptManagementProps {
  prompts?: Record<string, string>;
}

export const PromptManagement: React.FC<PromptManagementProps> = ({ prompts = {} }) => {
  const [promptType, setPromptType] = useState('default');
  const [promptText, setPromptText] = useState('');
  const [promptTypes, setPromptTypes] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setPromptTypes(getPromptTypes());
  }, []);

  useEffect(() => {
    if (promptType) {
      setPromptText(getPrompt(promptType));
    }
  }, [promptType]);

  const handlePromptTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPromptType(e.target.value);
  };

  const handleSavePrompt = () => {
    saveUserPrompt(promptType, promptText);
    toast({
      title: "Prompt Saved",
      description: `Your custom prompt for ${promptType} has been saved.`,
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="prompt-management">
          <AccordionTrigger>Prompt Management</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="promptType">Select Interview Type:</Label>
                <select
                  id="promptType"
                  value={promptType}
                  onChange={handlePromptTypeChange}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="default">Default</option>
                  {promptTypes.filter(type => type !== 'default').map((type) => (
                    <option key={type} value={type}>
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="promptEditor">Edit Prompt:</Label>
                <Textarea
                  id="promptEditor"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full mt-1"
                  rows={10}
                  placeholder="Edit the prompt here..."
                />
              </div>
              <Button onClick={handleSavePrompt} className="w-full">
                Save Prompt
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="dynamic-intent-config">
          <AccordionTrigger>Dynamic Intent and Tool Configuration</AccordionTrigger>
          <AccordionContent>
            <DynamicIntentConfig />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};