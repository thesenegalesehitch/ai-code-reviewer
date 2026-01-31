/**
 * @file index.ts
 * @description Point d'entrée principal du Reviseur de Code par IA
 * 
 * Ce module orchestre le processus de revue de code en :
 * 1. Récupérant les fichiers sources du répertoire cible
 * 2. Analysant chaque fichier avec l'IA Gemini
 * 3. Affichant les rapports de sécurité et d'optimisation
 * 
 * @author Antigravity
 * @version 1.0.0
 * @date Janvier 2026
 */

// Importation des modules personnalisés
import { getFiles } from './crawler';       // Module de parcours récursif des fichiers
import { analyzeCode } from './analyzer';   // Module d'analyse par IA
import * as fs from 'fs';                   // Système de fichiers Node.js
import * as path from 'path';               // Manipulation des chemins

/**
 * Fonction principale asynchrone qui lance la revue de code
 * 
 * @async
 * @returns {Promise<void>} Ne retourne rien, affiche les résultats dans la console
 * 
 * @example
 * // Analyse du répertoire courant
 * main();
 * 
 * @example
 * // Analyse d'un répertoire spécifique
 * // npm start -- /chemin/vers/projet
 */
async function main(): Promise<void> {
    // Récupération du répertoire cible (argument CLI ou répertoire courant par défaut)
    const targetDir: string = process.argv[2] || '.';
    
    // Message de démarrage
    console.log(`Démarrage du Reviseur de Code par IA dans : ${targetDir}`);

    // Récupération des fichiers à analyser (extensions supportées)
    const files: string[] = getFiles(targetDir, ['.js', '.ts', '.py', '.go', '.sh']);
    
    // Affichage du nombre de fichiers trouvés
    console.log(`${files.length} fichiers trouvés à analyser.`);

    // Parcours de chaque fichier pour analyse
    for (const file of files) {
        // Affichage du fichier en cours d'analyse
        console.log(`\nAnalyse de ${path.basename(file)}...`);
        
        try {
            // Lecture du contenu du fichier
            const code: string = fs.readFileSync(file, 'utf-8');
            
            // Analyse du code par l'IA Gemini
            const report: string = await analyzeCode(code, path.basename(file));

            // Affichage du rapport d'analyse
            console.log(`--- Rapport pour ${path.basename(file)} ---`);
            console.log(report);
            console.log('-----------------------------------\n');
        } catch (err) {
            // Gestion des erreurs de lecture
            console.error(`Erreur lors de la lecture de ${file}:`, err);
        }
    }
}

// Exécution de la fonction principale avec gestion des erreurs
main().catch(console.error);
