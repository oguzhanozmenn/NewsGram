import { GoogleGenAI } from "@google/genai";
import { NewsItem, Category } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fetchNewsFromGemini = async (category: Category): Promise<NewsItem[]> => {
  try {
    const model = 'gemini-2.5-flash'; 
    
    const prompt = `
      You are a backend API for a news app. 
      Search for the latest, most trending news in Turkey and the World specifically for the category: "${category}".
      
      Find 5 distinct news stories from the last 24 hours.
      
      Return ONLY a raw JSON array (no markdown formatting, no code blocks) with the following structure for each item:
      [
        {
          "headline": "Short punchy headline (max 10 words)",
          "summary": "A slightly longer engaging summary (max 30 words)",
          "source": "Name of the news outlet (e.g. CNN Turk, BBC)",
          "timeAgo": "e.g. 2s, 15d (minutes/hours ago)",
          "sourceUrl": "The URL found in the grounding metadata if available, otherwise null"
        }
      ]
      
      Ensure the tone is neutral but engaging.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType cannot be JSON when using search tools, so we parse text manually
      },
    });

    const text = response.text || '[]';
    
    // Clean up potential markdown code blocks if Gemini adds them despite instructions
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData: any[] = [];
    try {
      parsedData = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return [];
    }

    // Map to our internal NewsItem structure
    // We extract grounding metadata links if available to enhance sourceUrl
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return parsedData.map((item, index) => {
      // Try to find a relevant link in grounding chunks if the model didn't provide one
      let url = item.sourceUrl;
      if (!url && groundingChunks.length > index) {
        const chunk = groundingChunks[index];
        if (chunk.web?.uri) url = chunk.web.uri;
      }

      return {
        id: `${category}-${Date.now()}-${index}`,
        headline: item.headline,
        summary: item.summary,
        source: item.source || "NewsBot",
        category: category,
        timeAgo: item.timeAgo || "Şimdi",
        likes: Math.floor(Math.random() * 500) + 10, // Simulation
        // Use Picsum with a deterministic seed based on headline length + index to keep it consistent
        imageUrl: `https://picsum.photos/seed/${item.headline.length + index}${category}/600/600`, 
        sourceUrl: url,
        likedByMe: false,
      };
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};