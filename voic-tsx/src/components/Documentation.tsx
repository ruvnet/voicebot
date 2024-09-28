import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Documentation</h1>
      
      <Tabs defaultValue="introduction">
        <TabsList>
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="introduction">
          <Accordion type="single" collapsible>
            <AccordionItem value="overview">
              <AccordionTrigger>Overview</AccordionTrigger>
              <AccordionContent>
                <p>AI Conversation Bot is a powerful tool designed to facilitate phone-based AI-powered conversations for mock interviews and personal guidance. It leverages advanced AI technology to provide realistic and interactive experiences.</p>
                <p>Key benefits include:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Practice interviews in a realistic setting</li>
                  <li>Receive personalized guidance and feedback</li>
                  <li>Improve communication skills</li>
                  <li>Prepare for various professional scenarios</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="key-features">
              <AccordionTrigger>Key Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>AI-powered phone conversations with natural language processing</li>
                  <li>Customizable prompts for various scenarios (interviews, counseling, etc.)</li>
                  <li>Multiple voice options with adjustable characteristics</li>
                  <li>Seamless integration with phone systems</li>
                  <li>Advanced settings for fine-tuning conversations</li>
                  <li>Real-time conversation analysis and feedback</li>
                  <li>Multi-step task configuration for complex scenarios</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="setup">
          <Accordion type="single" collapsible>
            <AccordionItem value="api-setup">
              <AccordionTrigger>API Setup</AccordionTrigger>
              <AccordionContent>
                <p>To use the AI Conversation Bot, you need to obtain an API key from Bland AI. Follow these steps:</p>
                <ol className="list-decimal pl-5">
                  <li>Visit the Bland AI website (https://www.bland.ai)</li>
                  <li>Sign up for an account or log in</li>
                  <li>Navigate to the API section in your dashboard</li>
                  <li>Generate a new API key</li>
                  <li>Copy the API key and keep it secure</li>
                </ol>
                <p className="mt-2">Once you have your API key, enter it in the Settings tab of the application under "API Configuration".</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="installation">
              <AccordionTrigger>Installation</AccordionTrigger>
              <AccordionContent>
                <p>To install and run the AI Conversation Bot locally:</p>
                <ol className="list-decimal pl-5">
                  <li>Clone the repository from GitHub: <code>git clone https://github.com/ruvnet/voicebot.git</code></li>
                  <li>Navigate to the project directory: <code>cd voicebot</code></li>
                  <li>Install dependencies: <code>npm install</code></li>
                  <li>Create a <code>.env</code> file and add your API key: <code>BLAND_API_KEY=your_api_key_here</code></li>
                  <li>Start the application: <code>npm start</code></li>
                </ol>
                <p className="mt-2">The application should now be running on <code>http://localhost:3000</code>.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="features">
          <Accordion type="single" collapsible>
            <AccordionItem value="prompt-management">
              <AccordionTrigger>Prompt Management</AccordionTrigger>
              <AccordionContent>
                <p>The Prompt Management feature allows you to customize and create new conversation prompts:</p>
                <ul className="list-disc pl-5">
                  <li>Select from pre-defined prompt types (e.g., job interview, counseling session)</li>
                  <li>Edit existing prompts to tailor them to your specific needs</li>
                  <li>Create new custom prompts for unique scenarios</li>
                  <li>Save and manage your prompts for future use</li>
                </ul>
                <p className="mt-2">To access Prompt Management:</p>
                <ol className="list-decimal pl-5">
                  <li>Click on the "Prompts" tab in the main interface</li>
                  <li>Select a prompt type or create a new one</li>
                  <li>Use the text editor to modify the prompt content</li>
                  <li>Click "Save Prompt" to store your changes</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="voice-selection">
              <AccordionTrigger>Voice Selection</AccordionTrigger>
              <AccordionContent>
                <p>Choose from a variety of AI voices for your conversations:</p>
                <ul className="list-disc pl-5">
                  <li>Multiple voice options with different characteristics (gender, accent, tone)</li>
                  <li>Preview voices before starting a conversation</li>
                  <li>Adjust voice settings like speed and pitch (in advanced settings)</li>
                </ul>
                <p className="mt-2">To select a voice:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the main interface</li>
                  <li>Find the "Voice Selection" dropdown</li>
                  <li>Choose your preferred voice from the list</li>
                  <li>Click the preview button to hear a sample</li>
                  <li>Adjust advanced voice settings if needed (in Settings tab)</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="phone-integration">
              <AccordionTrigger>Phone Integration</AccordionTrigger>
              <AccordionContent>
                <p>Seamlessly integrate with phone systems for realistic conversations:</p>
                <ul className="list-disc pl-5">
                  <li>Enter your phone number to receive calls</li>
                  <li>Set up webhooks for call events (in advanced settings)</li>
                  <li>Configure call settings like duration and recording options</li>
                </ul>
                <p className="mt-2">To set up phone integration:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the main interface</li>
                  <li>Enter your phone number in the designated field</li>
                  <li>Click on the Settings tab</li>
                  <li>Under "Call Settings", configure options like max duration and recording preferences</li>
                  <li>If using webhooks, enter the webhook URL in the advanced settings</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Accordion type="single" collapsible>
            <AccordionItem value="custom-prompts">
              <AccordionTrigger>Creating Custom Prompts</AccordionTrigger>
              <AccordionContent>
                <p>To create a custom prompt:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the "Prompts" tab</li>
                  <li>Click "Add New Prompt"</li>
                  <li>Enter a name for your prompt</li>
                  <li>Write or paste your custom prompt text</li>
                  <li>Use variables like {'{user_name}'} or {'{company}'} for dynamic content</li>
                  <li>Click "Save" to add the prompt to your library</li>
                </ol>
                <p className="mt-2">Tips for effective prompts:</p>
                <ul className="list-disc pl-5">
                  <li>Be clear and specific about the scenario</li>
                  <li>Include instructions for the AI's behavior and tone</li>
                  <li>Specify any particular questions or topics to cover</li>
                  <li>Consider adding follow-up questions or branching paths</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="voice-customization">
              <AccordionTrigger>Customizing Voice Settings</AccordionTrigger>
              <AccordionContent>
                <p>To customize voice settings:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Voice Settings" section</li>
                  <li>Adjust parameters such as:</li>
                  <ul className="list-disc pl-5">
                    <li>Speed: Control how fast the AI speaks</li>
                    <li>Pitch: Adjust the voice pitch higher or lower</li>
                    <li>Volume: Set the overall volume of the voice</li>
                    <li>Accent: Choose regional accents (if available)</li>
                  </ul>
                  <li>Use the "Test Voice" button to preview changes</li>
                  <li>Save your custom voice profile for future use</li>
                </ol>
                <p className="mt-2">Note: Available voice customization options may vary depending on the selected voice model.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="conversation-flow">
              <AccordionTrigger>Customizing Conversation Flow</AccordionTrigger>
              <AccordionContent>
                <p>To customize the conversation flow:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Conversation Flow" section</li>
                  <li>Adjust settings such as:</li>
                  <ul className="list-disc pl-5">
                    <li>Response Time: Set how quickly the AI responds</li>
                    <li>Interruption Handling: Choose how the AI deals with interruptions</li>
                    <li>Topic Switching: Configure how easily the AI changes topics</li>
                    <li>Conversation Length: Set target duration or number of exchanges</li>
                  </ul>
                  <li>Use the "Dynamic Intent Configuration" to create custom conversation paths</li>
                  <li>Set up "Multi-Step Tasks" for complex conversation scenarios</li>
                </ol>
                <p className="mt-2">Experiment with these settings to create more natural and varied conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dynamic-intent">
              <AccordionTrigger>Dynamic Intent Configuration</AccordionTrigger>
              <AccordionContent>
                <p>Fine-tune the AI's understanding and responses with dynamic intents:</p>
                <ul className="list-disc pl-5">
                  <li>Create custom intents for specific conversation scenarios</li>
                  <li>Define keywords and priorities for each intent</li>
                  <li>Set up complex conversation flows and decision trees</li>
                </ul>
                <p className="mt-2">To configure dynamic intents:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Dynamic Intent Configuration" section</li>
                  <li>Click "Add New Intent"</li>
                  <li>Enter a name and description for the intent</li>
                  <li>Add keywords that trigger this intent</li>
                  <li>Set the priority level (higher numbers take precedence)</li>
                  <li>Define the AI's response or action for this intent</li>
                  <li>Save the new intent</li>
                </ol>
                <p className="mt-2">Use dynamic intents to create more contextually aware and responsive conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="external-tools">
              <AccordionTrigger>External Tool Integration</AccordionTrigger>
              <AccordionContent>
                <p>Enhance conversations with external tool integrations:</p>
                <ul className="list-disc pl-5">
                  <li>Connect to external APIs for real-time data</li>
                  <li>Integrate with CRM systems or databases</li>
                  <li>Use external services for additional processing or analysis</li>
                </ul>
                <p className="mt-2">To set up external tool integration:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "External Tool Integration" section</li>
                  <li>Click "Add New Tool"</li>
                  <li>Enter the tool name and description</li>
                  <li>Provide the API endpoint URL</li>
                  <li>Set up authentication (API key, OAuth, etc.)</li>
                  <li>Define input parameters and expected output</li>
                  <li>Create triggers or conditions for using the tool</li>
                  <li>Test the integration before saving</li>
                </ol>
                <p className="mt-2">External tools can significantly expand the capabilities of your AI conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="analytics">
              <AccordionTrigger>Conversation Analytics</AccordionTrigger>
              <AccordionContent>
                <p>Gain insights from your AI conversations with advanced analytics:</p>
                <ul className="list-disc pl-5">
                  <li>View detailed conversation logs and transcripts</li>
                  <li>Analyze conversation duration, topics, and sentiment</li>
                  <li>Generate reports on conversation performance and user engagement</li>
                  <li>Track custom metrics and KPIs</li>
                </ul>
                <p className="mt-2">To access and use conversation analytics:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Analytics tab in the main interface</li>
                  <li>Select the date range for analysis</li>
                  <li>Choose from available report types:
                    <ul className="list-disc pl-5">
                      <li>Conversation Overview</li>
                      <li>Topic Analysis</li>
                      <li>Sentiment Trends</li>
                      <li>User Engagement Metrics</li>
                      <li>Custom Reports (if configured)</li>
                    </ul>
                  </li>
                  <li>Use filters to focus on specific conversation types or users</li>
                  <li>Export data or reports for further analysis</li>
                </ol>
                <p className="mt-2">Use these analytics to continuously improve your AI conversations and measure their effectiveness.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};