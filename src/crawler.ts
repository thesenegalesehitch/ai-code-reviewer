import fs from 'fs';
import path from 'path';

export function getFiles(dir: string, extensions: string[]): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(getFiles(fullPath, extensions));
            }
        } else {
            if (extensions.includes(path.extname(fullPath))) {
                results.push(fullPath);
            }
        }
    });
    return results;
}
