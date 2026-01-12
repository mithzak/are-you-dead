
import { GoogleGenAI } from "@google/genai";

export class SafetyAIService {
  private ai: GoogleGenAI;

  constructor() {
    // Corrected initialization to strictly follow guidelines: use direct process.env.API_KEY access
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Generates localized safety tips or helps draft clear emergency notifications.
   */
  async generateSafetyAdvice(context: string): Promise<string | undefined> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As a safety expert, provide 3 concise, actionable safety tips for: ${context}. Keep it under 100 words.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Stay safe and keep your check-ins updated.";
    }
  }

  /**
   * Refines legal disclaimers for specific regions.
   */
  async refineDisclaimer(region: string): Promise<string | undefined> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Refine this legal disclaimer for a safety app in ${region}: "We are not responsible for technical failures." Make it sound professional yet protective of the user's rights.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return undefined;
    }
  }
}

export const safetyAI = new SafetyAIService();
