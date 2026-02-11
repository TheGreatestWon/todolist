import fs from 'fs';
import path from 'path';

describe('Backend Directory Structure', () => {
  const srcDir = path.join(__dirname, '..');

  test('should have all required directories', () => {
    const requiredDirs = [
      'config',
      'middleware', 
      'routes',
      'controllers',
      'services',
      'repositories',
      'types',
      'utils'
    ];

    requiredDirs.forEach(dir => {
      const dirPath = path.join(srcDir, dir);
      expect(fs.existsSync(dirPath)).toBe(true);
      expect(fs.statSync(dirPath).isDirectory()).toBe(true);
    });
  });

  test('should have server.ts entry point', () => {
    const serverPath = path.join(srcDir, 'server.ts');
    expect(fs.existsSync(serverPath)).toBe(true);
    expect(fs.statSync(serverPath).isFile()).toBe(true);
  });
});