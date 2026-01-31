/**
 * @file crawler.test.ts
 * @description Tests unitaires pour le module crawler
 * 
 * Ce fichier contient les tests de la fonction getFiles qui vérifie :
 * - La détection récursive des fichiers
 * - Le filtrage par extension
 * - L'exclusion des fichiers non pertinents
 * 
 * @author Alexandre Albert Ndour
 * @version 1.0.0
 * @date Janvier 2026
 */

// Importation des dépendances de test et du module à tester
import { getFiles } from '../src/crawler';  // Module de crawl à tester
import * as fs from 'fs';                   // Système de fichiers pour les tests
import * as path from 'path';               // Manipulation des chemins
import * as os from 'os';                   // Informations système

/**
 * Suite de tests pour le module Crawler
 * 
 * @description
 * Ces tests vérifient le bon fonctionnement de la fonction getFiles()
 * en créant un environnement de test temporaire.
 */
describe('Crawler', () => {
    // Répertoire temporaire pour les tests
    let tempDir: string;

    /**
     * Création de l'environnement de test avant tous les tests
     * 
     * @beforeAll
     * Crée un répertoire temporaire avec :
     * - Des fichiers de différentes extensions
     * - Un sous-répertoire avec des fichiers
     */
    beforeAll(() => {
        // Création d'un répertoire temporaire unique
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-crawler-'));
        
        // Création des fichiers de test à la racine
        fs.writeFileSync(path.join(tempDir, 'file1.ts'), 'console.log("hello");');
        fs.writeFileSync(path.join(tempDir, 'file2.js'), 'console.log("world");');
        fs.writeFileSync(path.join(tempDir, 'readme.md'), '# Readme');
        
        // Création d'un sous-répertoire avec un fichier
        fs.mkdirSync(path.join(tempDir, 'subdir'));
        fs.writeFileSync(path.join(tempDir, 'subdir', 'file3.py'), 'print("hello")');
    });

    /**
     * Nettoyage après tous les tests
     * 
     * @afterAll
     * Supprime le répertoire temporaire créé pour les tests
     */
    afterAll(() => {
        // Suppression récursive du répertoire temporaire
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    /**
     * Test : Détection des fichiers par extension de manière récursive
     * 
     * @it Devrait trouver les fichiers avec les extensions spécifiées récursivement
     * 
     * @Vérifications
     * - Le nombre de fichiers trouvés est correct (3)
     * - Les noms de fichiers correspondent exactement
     */
    it('devrait trouver les fichiers avec les extensions spécifiées récursivement', () => {
        // Récupération des fichiers avec les extensions .ts, .js, .py
        const files = getFiles(tempDir, ['.ts', '.js', '.py']);
        
        // Vérification du nombre de fichiers
        expect(files.length).toBe(3);
        
        // Vérification des noms de fichiers (triés pour comparaison)
        const basenames = files.map(f => path.basename(f)).sort();
        expect(basenames).toEqual(['file1.ts', 'file2.js', 'file3.py']);
    });

    /**
     * Test : Exclusion des fichiers avec d'autres extensions
     * 
     * @it Devrait ignorer les fichiers avec d'autres extensions
     * 
     * @Vérifications
     * - Seul le fichier .md est trouvé
     * - Le nom du fichier correspond exactement
     */
    it('devrait ignorer les fichiers avec d\'autres extensions', () => {
        // Récupération uniquement des fichiers .md
        const files = getFiles(tempDir, ['.md']);
        
        // Vérification du nombre de fichiers
        expect(files.length).toBe(1);
        
        // Vérification du nom du fichier
        expect(path.basename(files[0])).toBe('readme.md');
    });
});
