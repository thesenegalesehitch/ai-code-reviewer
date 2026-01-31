/**
 * @file analyzer.ts
 * @description Module d'analyse de code par l'IA Gemini
 * 
 * Ce module utilise l'API Google Generative AI pour analyser le code source
 * et générer des rapports de sécurité, de performance et de qualité.
 * 
 * @author Alexandre Albert Ndour
 * @version 1.0.0
 * @date Janvier 2026
 */

// Importation des dépendances
import { GoogleGenerativeAI } from '@google/generative-ai';  // Client IA Gemini
import * as dotenv from 'dotenv';                            // Variables d'environnement

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Récupération de la clé API Gemini depuis les variables d'environnement
const API_KEY: string | undefined = process.env.GEMINI_API_KEY;

/**
 * Analyse le code source fourni et génère un rapport via l'IA Gemini
 * 
 * @param {string} code - Le code source à analyser
 * @param {string} filename - Le nom du fichier contenant le code
 * @returns {Promise<string>} Le rapport d'analyse généré par l'IA
 * 
 * @example
 * const rapport = await analyzeCode(`
 * function add(a, b) {
 *   return a + b;
 * }
 * `, 'addition.js');
 * 
 * @throws {Error} Retourne un message d'erreur si l'analyse échoue
 */
export async function analyzeCode(code: string, filename: string): Promise<string> {
    // Vérification de la présence de la clé API
    if (!API_KEY) {
        return "Erreur : GEMINI_API_KEY non définie dans le fichier .env.";
    }

    try {
        // Initialisation du client Google Generative AI
        const genAI = new GoogleGenerativeAI(API_KEY);
        
        // Sélection du modèle Gemini Pro pour l'analyse
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Construction du prompt pour l'IA
        // On demande à l'IA de jouer le rôle d'un expert en sécurité et qualité de code
        const prompt: string = `
Tu es un auditeur de sécurité et réviseur de code expert.
Analyse le code suivant du fichier '${filename}' pour :
- Vulnérabilités de sécurité
- Bugs potentiels
- Optimisations de performance

Fournis un rapport concis et structuré de tes découvertes.

Code à analyser :
${code}`;

        // Génération du contenu par l'IA
        const result = await model.generateContent(prompt);
        
        // Extraction et retour de la réponse textuelle
        const response = await result.response;
        return response.text();
        
    } catch (error: any) {
        // Gestion des erreurs et retour d'un message descriptif
        return `Erreur lors de l'analyse de ${filename} : ${error.message}`;
    }
}
