import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
}

export const aiService = {
  /**
   * Summarizes product reviews using AI.
   */
  async summarizeReviews(reviews: { comment: string, rating: number }[]) {
    if (reviews.length === 0) return "No reviews yet.";
    
    const context = reviews.map(r => `Rating: ${r.rating}, Comment: ${r.comment}`).join('\n');
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize these customer reviews for a kitchenware product in 2-3 sentences. Focus on common pros and cons:\n\n${context}`,
      });
      return response.text;
    } catch (error) {
      console.error("AI Review Summary Error:", error);
      return "Could not summarize reviews at this time.";
    }
  },

  /**
   * Smart Chat Assistant for kitchenware advice.
   */
  async getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are the Maple Leaf Ventures Smart Assistant. You help Nigerian customers find the best kitchenware for their needs. You are friendly, helpful, and knowledgeable about Nigerian cooking (Jollof rice, pounded yam, soups). Recommend products from Maple Leaf Ventures and give cooking tips.",
        },
        history: history as any,
      });

      const result = await chat.sendMessage(message);
      return result.text;
    } catch (error) {
      console.error("AI Chat Error:", error);
      return "I'm having a bit of trouble connecting. Try again in a moment!";
    }
  },

  /**
   * Visual Search: Identify a product from an image.
   */
  async visualSearch(base64Image: string, products: Product[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `Analyze this image and identify which of these kitchenware products it most closely resembles. Return ONLY the JSON object of the match and a 'confidence' score (0-1). If no good match, return null.\n\nProducts:\n${JSON.stringify(products)}`,
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              match: { type: Type.OBJECT, properties: { id: { type: Type.STRING } } },
              confidence: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            }
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Visual Search Error:", error);
      return null;
    }
  },

  /**
   * Semantic Search: Search products using natural language.
   */
  async semanticSearch(query: string, products: Product[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the search query "${query}", rank the following products by relevance. Return a JSON array of product IDs in order of relevance.\n\nProducts:\n${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, description: p.description, tags: p.tags })))}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      const rankedIds = JSON.parse(response.text || '[]');
      return rankedIds.map((id: string) => products.find(p => p.id === id)).filter(Boolean) as Product[];
    } catch (error) {
      console.error("Semantic Search Error:", error);
      return products; // Return original if AI fails
    }
  }
};
