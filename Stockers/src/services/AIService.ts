export type AIAnalyzeRequest = {
  message: string;
};

export type AIAnalyzeResponse = {
  response: string;
};

const AI_API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL;

export const analyzeMessage = async (
  payload: AIAnalyzeRequest
): Promise<AIAnalyzeResponse> => {
  const response = await fetch(`${AI_API_BASE_URL}api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}`);
  }

  return response.json();
};