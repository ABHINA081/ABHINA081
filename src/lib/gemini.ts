import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateNotes = async (apiKey: string, transcript: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  if (!transcript) {
    throw new Error("Transcript is empty.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert note-taker for a classroom setting.
    Below is a raw transcript of a lecture or meeting.
    Please process this text and provide two distinct sections:

    1. **Summary**: A concise paragraph summarizing the key points.
    2. **Structured Notes**: A bulleted list or markdown structure of the important details, definitions, and action items.

    Raw Transcript:
    "${transcript}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating notes:", error);
    throw new Error("Failed to generate notes. Please check your API key and try again.");
  }
};
