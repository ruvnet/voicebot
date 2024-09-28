const promptFiles = import.meta.glob('./prompts/*.txt', { as: 'raw', eager: true });

export const INTERVIEW_PROMPTS: Record<string, string> = Object.fromEntries(
  Object.entries(promptFiles).map(([path, content]) => [
    path.split('/').pop()?.replace('.txt', '') || '',
    content
  ])
);

export function getPrompt(type: string): string {
  const userPrompt = localStorage.getItem(`userPrompt_${type}`);
  return userPrompt || INTERVIEW_PROMPTS[type] || INTERVIEW_PROMPTS['default'];
}

export function saveUserPrompt(type: string, prompt: string): void {
  localStorage.setItem(`userPrompt_${type}`, prompt);
}

export function getPromptTypes(): string[] {
  return Object.keys(INTERVIEW_PROMPTS);
}