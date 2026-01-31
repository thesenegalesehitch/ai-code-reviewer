# Le Reviseur de Code par IA

Un outil d'analyse de code automatisé alimenté par l'IA Gemini de Google. Il scanne vos répertoires de projet et fournit des informations sur la sécurité et l'optimisation.

## Fonctionnalités

- **Scan Récursif** : Trouve automatiquement les fichiers `.js`, `.ts`, `.py`, `.go` dans votre projet.
- **Analyse par IA** : Utilise Gemini Pro pour détecter les vulnérabilités et suggérer des améliorations.
- **Rapports Concis** : Génère un rapport clair et actionnable pour chaque fichier.

## Prérequis

- **Node.js** : version 18 ou supérieure.
- **Clé API Gemini** : Obtenez-en une sur [Google AI Studio](https://makersuite.google.com/app/apikey).

## Installation

1.  Clonez le dépôt :
    ```bash
    git clone <url-du-depot>
    cd ai-code-reviewer
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Configurez la clé API :
    Créez un fichier `.env` à la racine du projet :
    ```env
    GEMINI_API_KEY=votre_cle_api
    ```

## Utilisation

Exécutez le revisuer sur un répertoire cible :

```bash
npm start -- /chemin/vers/projet
```

Ou scannez le répertoire courant :

```bash
npm start
```

## Structure du Projet

```
ai-code-reviewer/
├── src/
│   ├── analyzer.ts   # Analyseur de code AI
│   ├── crawler.ts    # Scan récursif des fichiers
│   └── index.ts      # Point d'entrée
├── tests/
│   └── crawler.test.ts # Tests unitaires
├── package.json
├── tsconfig.json
└── README.md
```

## Licence

Copyright (c) 27 Janvier 2026 - Antigravity
Voir [LICENSE](LICENSE) pour plus de détails.
