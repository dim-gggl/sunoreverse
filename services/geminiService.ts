
import { GoogleGenAI, Type } from "@google/genai";
import { SunoPrompt } from "../types";

const PROMPT_INSTRUCTION = `
You are a master musicologist and prompt engineer for AI music generation (Suno AI).
Your task is to deconstruct the audio/music into a precise "Style Prompt".

STRATEGY:
1. **SEARCH**: Use Google Search to find the track's metadata, genre specifics, production credits, and critical reception. Look for details on instrumentation (e.g., "Roland TR-808", "Stratocaster"), vocal nuances, and specific sub-genres.
2. **LISTEN/ANALYZE**: Correlate search findings with the actual audio content (or the detailed description from the link). Identify the specific "vibe", tempo, and mixing style.
3. **SYNTHESIZE**: Create a prompt that would allow Suno AI to hallucinate a track in this exact style.

Return the response in JSON format matching this schema:
{
  "genre": "comma-separated list of genres and subgenres",
  "vocalStyle": "detailed description of vocals (gender, tone, language, processing)",
  "instruments": "list of primary and secondary instruments and textures",
  "productionStyle": "how it was recorded/mixed (e.g., lo-fi, polished, analog, reverb-drenched)",
  "mood": "emotional keywords",
  "tempo": "speed and rhythmic feel (e.g., mid-tempo, 120bpm, swing feel)"
}
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    genre: { type: Type.STRING },
    vocalStyle: { type: Type.STRING },
    instruments: { type: Type.STRING },
    productionStyle: { type: Type.STRING },
    mood: { type: Type.STRING },
    tempo: { type: Type.STRING },
  },
  required: ["genre", "vocalStyle", "instruments", "productionStyle", "mood", "tempo"]
};

export async function analyzeAudioFile(base64Data: string, mimeType: string, contextInfo?: string): Promise<SunoPrompt> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  const textPart = contextInfo 
    ? `Context/Title: "${contextInfo}". ${PROMPT_INSTRUCTION}`
    : PROMPT_INSTRUCTION;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: textPart }
      ]
    },
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function analyzeMusicUrl(url: string, contextInfo?: string): Promise<SunoPrompt> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

  const textContent = `Analyze the music at this link: ${url}. 
  ${contextInfo ? `Additional Context: ${contextInfo}` : ''}
  ${PROMPT_INSTRUCTION}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: textContent,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });

  return JSON.parse(response.text || "{}");
}
