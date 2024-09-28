# VOIC

## Application Introduction

Welcome to VOIC! This project is designed to provide a comprehensive solution for managing and interacting with various prompts and configurations. It leverages modern web technologies such as React, TypeScript, and Vite to deliver a seamless and efficient user experience.

## Try it
https://voic.gptengineer.run/

## Deploy it
https://gitpod.io/#https://github.com/ruvnet/voicebot/voic-tsx

## Features

- **Prompt Management**: Easily manage and customize various prompts for different scenarios.
- **Dynamic Intent Configuration**: Configure custom intents and tools dynamically.
- **Phone Call Integration**: Integrate phone call functionalities with customizable settings.
- **Advanced User Settings**: Detailed settings for advanced users to fine-tune the application.
- **API Integration**: Seamless integration with external APIs for enhanced functionality.

## Installation

To get started with VOIC, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/ruvnet/voic.git
   cd voic
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm run dev
   ```

4. **Build the application for production**:
   ```sh
   npm run build
   ```

5. **Preview the production build**:
   ```sh
   npm run preview
   ```

## Configuration

VOIC provides various configuration options to customize its behavior. Here are some key configuration details:

- **API Key**: Set your API key in the environment or in the settings.
- **Webhook URL**: Configure the webhook URL for receiving call events.
- **Voice Settings**: Customize voice settings using JSON strings.
- **Context Management**: Enable and configure context management settings.
- **External Tools**: Integrate external tools with customizable parameters.

## Modifications

To modify VOIC, you can follow these guidelines:

- **Adding New Prompts**: Add new prompt files in the `src/data/prompts` directory.
- **Customizing Intents**: Use the `DynamicIntentConfig` component to add or update custom intents.
- **Updating API Integration**: Modify the `src/api/blandApi.ts` file to update API integration settings.
- **Enhancing UI Components**: Update or add new UI components in the `src/components` directory.

## Prompts Information

VOIC includes a variety of prompts for different scenarios. You can manage and customize these prompts using the `PromptManagement` component. The prompts are stored in the `src/data/prompts` directory, and you can add or modify prompt files as needed.

## Advanced User Documentation

For advanced users, VOIC provides detailed settings and customization options:

- **API Configuration**: Set up and test your API key using the `Settings` component.
- **Voice and Call Settings**: Customize voice and call settings in the `Settings` component.
- **Dynamic Intent and Tool Configuration**: Use the `DynamicIntentConfig` component to configure custom intents and tools.
- **Performance and Load Testing**: Implement performance and load testing strategies to ensure the application meets performance requirements.

For more detailed information, refer to the source code and comments within the application.
