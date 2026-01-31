/**
 * @file crawler.ts
 * @description Module de parcours récursif des fichiers sources
 * 
 * Ce module scanne récursivement un répertoire pour trouver tous les fichiers
 * correspondant aux extensions spécifiées, en excluant les répertoires système.
 * 
 * @author Antigravity
 * @version 1.0.0
 * @date Janvier 2026
 */

// Importation des modules Node.js
import fs from 'fs';      // Système de fichiers
import path from 'path';  // Manipulation des chemins

/**
 * Récupère récursivement tous les fichiers correspondant aux extensions données
 * 
 * @param {string} dir - Répertoire de départ pour le scan
 * @param {string[]} extensions - Tableau des extensions de fichiers à inclure
 * @returns {string[]} Tableau des chemins absolus des fichiers trouvés
 * 
 * @example
 * // Récupérer tous les fichiers TypeScript et JavaScript
 * const fichiers = getFiles('/mon/projet', ['.ts', '.js']);
 * 
 * @example
 * // Récupérer tous les fichiers Python
 * const fichiers = getFiles('/mon/projet', ['.py']);
 */
export function getFiles(dir: string, extensions: string[]): string[] {
    // Tableau des résultats
    let results: string[] = [];
    
    // Liste des éléments dans le répertoire courant
    const list = fs.readdirSync(dir);
    
    // Parcours de chaque élément
    list.forEach((file: string) => {
        // Construction du chemin complet
        const fullPath: string = path.join(dir, file);
        
        // Récupération des informations sur l'élément
        const stat: fs.Stats | undefined = fs.statSync(fullPath);
        
        if (stat && stat.isDirectory()) {
            // Si c'est un répertoire, on vérifie s'il faut l'exclure
            // On exclut node_modules, .git et dist pour optimiser le scan
            if (!file.includes('node_modules') && 
                !file.includes('.git') && 
                !file.includes('dist')) {
                
                // Récursion pour explorer les sous-répertoires
                results = results.concat(getFiles(fullPath, extensions));
            }
        } else {
            // Si c'est un fichier, on vérifie son extension
            if (extensions.includes(path.extname(fullPath))) {
                // Ajout du fichier aux résultats
                results.push(fullPath);
            }
        }
    });
    
    // Retourne la liste complète des fichiers
    return results;
}
