import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export async function analyzeCode(code: string, filename: string): Promise<string> {
    if (!API_KEY) {
        return "Error: GEMINI_API_KEY not set in .env file.";
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an expert security auditor and code reviewer. Analyze the following code from file '${filename}' for security vulnerabilities, potential bugs, and performance optimizations. Provide a concise, bulleted report of your findings.\n\nCode:\n${code}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        return `Error analyzing ${filename}: ${error.message}`;
    }
}
