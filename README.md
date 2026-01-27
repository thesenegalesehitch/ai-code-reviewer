# The AI Code Reviewer

An automated code analysis tool powered by Google's Gemini AI. It scans your project directories and provides security and optimization insights.

## Features

- **Recursive Scanning**: Automatically finds `.js`, `.ts`, `.py`, `.go` files in your project.
- **AI-Powered Analysis**: Uses Gemini Pro to detect vulnerabilities and suggest improvements.
- **Concise Reporting**: Outputs a clear, actionable report for each file.

## Prerequisites

- **Node.js**: v18 or higher.
- **Gemini API Key**: Obtain one from [Google AI Studio](https://makersuite.google.com/app/apikey).

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd ai-code-reviewer
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure API Key:
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

## Usage

Run the reviewer on a target directory:

```bash
npm start -- /path/to/project
```

Or scan the current directory:

```bash
npm start
```

## License

Copyright (c) 27 Janvier 2026 - Antigravity
See [LICENSE](LICENSE) for details.
