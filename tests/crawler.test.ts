import { getFiles } from '../src/crawler';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Crawler', () => {
    let tempDir: string;

    beforeAll(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-crawler-'));
        fs.writeFileSync(path.join(tempDir, 'file1.ts'), 'console.log("hello");');
        fs.writeFileSync(path.join(tempDir, 'file2.js'), 'console.log("world");');
        fs.writeFileSync(path.join(tempDir, 'readme.md'), '# Readme');
        fs.mkdirSync(path.join(tempDir, 'subdir'));
        fs.writeFileSync(path.join(tempDir, 'subdir', 'file3.py'), 'print("hello")');
    });

    afterAll(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    it('should find files with specific extensions recursively', () => {
        const files = getFiles(tempDir, ['.ts', '.js', '.py']);
        expect(files.length).toBe(3);
        const basenames = files.map(f => path.basename(f)).sort();
        expect(basenames).toEqual(['file1.ts', 'file2.js', 'file3.py']);
    });

    it('should ignore files with other extensions', () => {
        const files = getFiles(tempDir, ['.md']);
        expect(files.length).toBe(1);
        expect(path.basename(files[0])).toBe('readme.md');
    });
});
