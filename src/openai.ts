const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const BASE_URL = 'https://api.openai.com/v1';

export async function translateText(
  text: string, 
  fromLanguage: string, 
  toLanguage: string
): Promise<string> {

  if (!text.trim()) {
    throw new Error("No text provided for translation");
  }

  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not found.");
  }

  try {
    const response = await fetch(`${BASE_URL}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano-2025-04-14',
        instructions: 'You are a professional translation expert. Your task is to accurately and naturally translate text between two languages to facilitate clear communication between two people who do not understand each other’s language. Focus on maintaining the original meaning, tone, and context.',
        input: `Translate the following text from ${fromLanguage} to ${toLanguage}:\n\n${text}`,
        max_output_tokens: 10000,
        store: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText = data.output[0].content[0].text.trim();
    
    if (!translatedText) {
      throw new Error("No translation received from OpenAI");
    }

    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};
