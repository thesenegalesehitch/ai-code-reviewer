import { getFiles } from './crawler';
import { analyzeCode } from './analyzer';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const targetDir = process.argv[2] || '.';
    console.log(`Starting AI Code Reviewer in: ${targetDir}`);

    const files = getFiles(targetDir, ['.js', '.ts', '.py', '.go', '.sh']);
    console.log(`Found ${files.length} files to analyze.`);

    for (const file of files) {
        console.log(`\nAnalyzing ${path.basename(file)}...`);
        try {
            const code = fs.readFileSync(file, 'utf-8');
            const report = await analyzeCode(code, path.basename(file));

            console.log(`--- Report for ${path.basename(file)} ---`);
            console.log(report);
            console.log('-----------------------------------\n');
        } catch (err) {
            console.error(`Error reading ${file}:`, err);
        }
    }
}

main().catch(console.error);
