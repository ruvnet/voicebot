import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Intent {
  name: string;
  description: string;
  keywords: string[];
  priority: number;
}

interface Tool {
  name: string;
  description: string;
  apiEndpoint: string;
  requiredParams: string[];
  optionalParams: string[];
}

interface ExternalTool {
  name: string;
  description: string;
  apiEndpoint: string;
  apiKey: string;
  parameters: { name: string; type: string; description: string }[];
}

interface MultiStepTask {
  name: string;
  steps: {
    instruction: string;
    expectedResponse: string;
  }[];
}

export const DynamicIntentConfig: React.FC = () => {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [contextManagement, setContextManagement] = useState({
    enabled: false,
    duration: 30,
  });
  const [multiStepTasks, setMultiStepTasks] = useState<MultiStepTask[]>([]);
  const [externalTools, setExternalTools] = useState<ExternalTool[]>([]);

  const handleAddIntent = () => {
    setIntents([...intents, { name: '', description: '', keywords: [], priority: 0 }]);
  };

  const handleUpdateIntent = (index: number, field: keyof Intent, value: string | string[] | number) => {
    const newIntents = [...intents];
    newIntents[index] = { ...newIntents[index], [field]: value };
    setIntents(newIntents);
  };

  const handleAddTool = () => {
    setTools([...tools, { name: '', description: '', apiEndpoint: '', requiredParams: [], optionalParams: [] }]);
  };

  const handleUpdateTool = (index: number, field: keyof Tool, value: string | string[]) => {
    const newTools = [...tools];
    newTools[index] = { ...newTools[index], [field]: value };
    setTools(newTools);
  };

  const handleAddMultiStepTask = () => {
    setMultiStepTasks([...multiStepTasks, { name: '', steps: [{ instruction: '', expectedResponse: '' }] }]);
  };

  const handleUpdateMultiStepTask = (taskIndex: number, field: keyof MultiStepTask, value: string | MultiStepTask['steps']) => {
    const newTasks = [...multiStepTasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], [field]: value };
    setMultiStepTasks(newTasks);
  };

  const handleAddStep = (taskIndex: number) => {
    const newTasks = [...multiStepTasks];
    newTasks[taskIndex].steps.push({ instruction: '', expectedResponse: '' });
    setMultiStepTasks(newTasks);
  };

  const handleUpdateStep = (taskIndex: number, stepIndex: number, field: keyof MultiStepTask['steps'][0], value: string) => {
    const newTasks = [...multiStepTasks];
    newTasks[taskIndex].steps[stepIndex] = { ...newTasks[taskIndex].steps[stepIndex], [field]: value };
    setMultiStepTasks(newTasks);
  };

  const handleAddExternalTool = () => {
    setExternalTools([...externalTools, { name: '', description: '', apiEndpoint: '', apiKey: '', parameters: [] }]);
  };

  const handleUpdateExternalTool = (index: number, field: keyof ExternalTool, value: string | ExternalTool['parameters']) => {
    const newExternalTools = [...externalTools];
    newExternalTools[index] = { ...newExternalTools[index], [field]: value };
    setExternalTools(newExternalTools);
  };

  const handleAddParameter = (toolIndex: number) => {
    const newExternalTools = [...externalTools];
    newExternalTools[toolIndex].parameters.push({ name: '', type: '', description: '' });
    setExternalTools(newExternalTools);
  };

  const handleUpdateParameter = (toolIndex: number, paramIndex: number, field: keyof ExternalTool['parameters'][0], value: string) => {
    const newExternalTools = [...externalTools];
    newExternalTools[toolIndex].parameters[paramIndex] = { ...newExternalTools[toolIndex].parameters[paramIndex], [field]: value };
    setExternalTools(newExternalTools);
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full">
        {/* Existing Accordion Items */}
        <AccordionItem value="intents">
          <AccordionTrigger>Custom Intents</AccordionTrigger>
          <AccordionContent>
            {intents.map((intent, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <Label htmlFor={`intent-name-${index}`} className="block mb-1">
                  Intent Name
                </Label>
                <Input
                  id={`intent-name-${index}`}
                  value={intent.name}
                  onChange={(e) => handleUpdateIntent(index, 'name', e.target.value)}
                  className="mb-2"
                  placeholder="Enter intent name"
                />

                <Label htmlFor={`intent-description-${index}`} className="block mb-1">
                  Intent Description
                </Label>
                <Textarea
                  id={`intent-description-${index}`}
                  value={intent.description}
                  onChange={(e) => handleUpdateIntent(index, 'description', e.target.value)}
                  className="mb-2"
                  placeholder="Describe the intent"
                />

                <Label htmlFor={`intent-keywords-${index}`} className="block mb-1">
                  Keywords
                </Label>
                <Input
                  id={`intent-keywords-${index}`}
                  value={intent.keywords.join(', ')}
                  onChange={(e) => handleUpdateIntent(index, 'keywords', e.target.value.split(', ').filter(Boolean))}
                  className="mb-2"
                  placeholder="Enter keywords (comma-separated)"
                />

                <Label htmlFor={`intent-priority-${index}`} className="block mb-1">
                  Priority
                </Label>
                <Input
                  id={`intent-priority-${index}`}
                  type="number"
                  value={intent.priority}
                  onChange={(e) => handleUpdateIntent(index, 'priority', parseInt(e.target.value) || 0)}
                  className="mb-2"
                  placeholder="Enter priority (0-10)"
                  min="0"
                  max="10"
                />
              </div>
            ))}
            <Button onClick={handleAddIntent} className="mt-2">Add Intent</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tools">
          <AccordionTrigger>Tool Configuration</AccordionTrigger>
          <AccordionContent>
            {tools.map((tool, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <Label htmlFor={`tool-name-${index}`} className="block mb-1">
                  Tool Name
                </Label>
                <Input
                  id={`tool-name-${index}`}
                  value={tool.name}
                  onChange={(e) => handleUpdateTool(index, 'name', e.target.value)}
                  className="mb-2"
                  placeholder="Enter tool name"
                />

                <Label htmlFor={`tool-description-${index}`} className="block mb-1">
                  Tool Description
                </Label>
                <Textarea
                  id={`tool-description-${index}`}
                  value={tool.description}
                  onChange={(e) => handleUpdateTool(index, 'description', e.target.value)}
                  className="mb-2"
                  placeholder="Describe the tool's functionality"
                />

                <Label htmlFor={`tool-api-${index}`} className="block mb-1">
                  API Endpoint
                </Label>
                <Input
                  id={`tool-api-${index}`}
                  value={tool.apiEndpoint}
                  onChange={(e) => handleUpdateTool(index, 'apiEndpoint', e.target.value)}
                  className="mb-2"
                  placeholder="Enter API endpoint URL"
                />

                <Label htmlFor={`tool-required-params-${index}`} className="block mb-1">
                  Required Parameters
                </Label>
                <Input
                  id={`tool-required-params-${index}`}
                  value={tool.requiredParams.join(', ')}
                  onChange={(e) => handleUpdateTool(index, 'requiredParams', e.target.value.split(', ').filter(Boolean))}
                  className="mb-2"
                  placeholder="Enter required parameters (comma-separated)"
                />

                <Label htmlFor={`tool-optional-params-${index}`} className="block mb-1">
                  Optional Parameters
                </Label>
                <Input
                  id={`tool-optional-params-${index}`}
                  value={tool.optionalParams.join(', ')}
                  onChange={(e) => handleUpdateTool(index, 'optionalParams', e.target.value.split(', ').filter(Boolean))}
                  className="mb-2"
                  placeholder="Enter optional parameters (comma-separated)"
                />
              </div>
            ))}
            <Button onClick={handleAddTool} className="mt-2">Add Tool</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="multi-step-tasks">
          <AccordionTrigger>Multi-Step Task Configuration</AccordionTrigger>
          <AccordionContent>
            {multiStepTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="mb-6 p-4 border rounded">
                <Label htmlFor={`task-name-${taskIndex}`} className="block mb-1">
                  Task Name
                </Label>
                <Input
                  id={`task-name-${taskIndex}`}
                  value={task.name}
                  onChange={(e) => handleUpdateMultiStepTask(taskIndex, 'name', e.target.value)}
                  className="mb-2"
                  placeholder="Enter task name"
                />
                
                {task.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="mt-4 p-3 bg-gray-50 rounded">
                    <Label htmlFor={`step-instruction-${taskIndex}-${stepIndex}`} className="block mb-1">
                      Step {stepIndex + 1} Instruction
                    </Label>
                    <Textarea
                      id={`step-instruction-${taskIndex}-${stepIndex}`}
                      value={step.instruction}
                      onChange={(e) => handleUpdateStep(taskIndex, stepIndex, 'instruction', e.target.value)}
                      className="mb-2"
                      placeholder="Enter step instruction"
                    />
                    
                    <Label htmlFor={`step-response-${taskIndex}-${stepIndex}`} className="block mb-1">
                      Expected Response
                    </Label>
                    <Textarea
                      id={`step-response-${taskIndex}-${stepIndex}`}
                      value={step.expectedResponse}
                      onChange={(e) => handleUpdateStep(taskIndex, stepIndex, 'expectedResponse', e.target.value)}
                      className="mb-2"
                      placeholder="Enter expected response"
                    />
                  </div>
                ))}
                
                <Button onClick={() => handleAddStep(taskIndex)} className="mt-2">Add Step</Button>
              </div>
            ))}
            <Button onClick={handleAddMultiStepTask} className="mt-2">Add Multi-Step Task</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="context-management">
          <AccordionTrigger>Context Management Settings</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                id="context-enabled"
                checked={contextManagement.enabled}
                onCheckedChange={(checked) => setContextManagement({ ...contextManagement, enabled: checked })}
              />
              <Label htmlFor="context-enabled">Enable Context Management</Label>
            </div>
            <div>
              <Label htmlFor="context-duration">Context Duration (minutes)</Label>
              <Input
                id="context-duration"
                type="number"
                value={contextManagement.duration}
                onChange={(e) => setContextManagement({ ...contextManagement, duration: parseInt(e.target.value) || 30 })}
                className="mt-1"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="external-tools">
          <AccordionTrigger>External Tool Integration</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-500 mb-2">Configure settings for integrating external tools.</p>
            {externalTools.map((tool, toolIndex) => (
              <div key={toolIndex} className="mb-4 p-4 border rounded">
                <Label htmlFor={`tool-name-${toolIndex}`} className="block mb-1">
                  Tool Name
                </Label>
                <Input
                  id={`tool-name-${toolIndex}`}
                  value={tool.name}
                  onChange={(e) => handleUpdateExternalTool(toolIndex, 'name', e.target.value)}
                  className="mb-2"
                  placeholder="Enter tool name"
                />

                <Label htmlFor={`tool-description-${toolIndex}`} className="block mb-1">
                  Tool Description
                </Label>
                <Textarea
                  id={`tool-description-${toolIndex}`}
                  value={tool.description}
                  onChange={(e) => handleUpdateExternalTool(toolIndex, 'description', e.target.value)}
                  className="mb-2"
                  placeholder="Describe the tool's functionality"
                />

                <Label htmlFor={`tool-api-endpoint-${toolIndex}`} className="block mb-1">
                  API Endpoint
                </Label>
                <Input
                  id={`tool-api-endpoint-${toolIndex}`}
                  value={tool.apiEndpoint}
                  onChange={(e) => handleUpdateExternalTool(toolIndex, 'apiEndpoint', e.target.value)}
                  className="mb-2"
                  placeholder="Enter API endpoint URL"
                />

                <Label htmlFor={`tool-api-key-${toolIndex}`} className="block mb-1">
                  API Key
                </Label>
                <Input
                  id={`tool-api-key-${toolIndex}`}
                  value={tool.apiKey}
                  onChange={(e) => handleUpdateExternalTool(toolIndex, 'apiKey', e.target.value)}
                  className="mb-2"
                  placeholder="Enter API key"
                  type="password"
                />

                <Label className="block mb-1">Parameters</Label>
                {tool.parameters.map((param, paramIndex) => (
                  <div key={paramIndex} className="mb-2 p-2 bg-gray-50 rounded">
                    <Input
                      value={param.name}
                      onChange={(e) => handleUpdateParameter(toolIndex, paramIndex, 'name', e.target.value)}
                      className="mb-1"
                      placeholder="Parameter name"
                    />
                    <Input
                      value={param.type}
                      onChange={(e) => handleUpdateParameter(toolIndex, paramIndex, 'type', e.target.value)}
                      className="mb-1"
                      placeholder="Parameter type"
                    />
                    <Input
                      value={param.description}
                      onChange={(e) => handleUpdateParameter(toolIndex, paramIndex, 'description', e.target.value)}
                      className="mb-1"
                      placeholder="Parameter description"
                    />
                  </div>
                ))}
                <Button onClick={() => handleAddParameter(toolIndex)} className="mt-2">Add Parameter</Button>
              </div>
            ))}
            <Button onClick={handleAddExternalTool} className="mt-2">Add External Tool</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Save Configuration</Button>
    </div>
  );
};