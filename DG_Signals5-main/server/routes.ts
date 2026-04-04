import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { readdir, readFile, writeFile } from "fs/promises";
import { join, relative } from "path";
import express from "express";

const WEBSITE_DIR = join(process.cwd(), 'website-repo');

async function getAllFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...await getAllFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      files.push(relative(baseDir, fullPath));
    }
  }
  
  return files;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from website-repo
  app.use('/preview', express.static(WEBSITE_DIR));
  
  // Get list of all files
  app.get('/api/files', async (req, res) => {
    try {
      const files = await getAllFiles(WEBSITE_DIR);
      const editableExtensions = ['.tsx', '.ts', '.jsx', '.js', '.html', '.css', '.md', '.json'];
      
      const fileList = files.map(file => ({
        path: file,
        isEditable: editableExtensions.some(ext => file.endsWith(ext))
      }));
      
      res.json(fileList);
    } catch (error) {
      res.status(500).json({ error: 'Failed to list files' });
    }
  });
  
  // Get file content
  app.get('/api/file', async (req, res) => {
    try {
      const filePath = req.query.path as string;
      if (!filePath) {
        return res.status(400).json({ error: 'Path required' });
      }
      
      const fullPath = join(WEBSITE_DIR, filePath);
      const content = await readFile(fullPath, 'utf-8');
      
      res.json({ path: filePath, content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read file' });
    }
  });
  
  // Save file content
  app.post('/api/file', express.json(), async (req, res) => {
    try {
      const { path: filePath, content } = req.body;
      if (!filePath || content === undefined) {
        return res.status(400).json({ error: 'Path and content required' });
      }
      
      const fullPath = join(WEBSITE_DIR, filePath);
      await writeFile(fullPath, content, 'utf-8');
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save file' });
    }
  });
  
  // Search for text in files
  app.get('/api/search', async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: 'Query required' });
      }
      
      const files = await getAllFiles(WEBSITE_DIR);
      const results: any[] = [];
      
      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html')) {
          const fullPath = join(WEBSITE_DIR, file);
          const content = await readFile(fullPath, 'utf-8');
          const lines = content.split('\n');
          
          lines.forEach((line, index) => {
            if (line.toLowerCase().includes(query.toLowerCase())) {
              results.push({
                file,
                line: index + 1,
                content: line.trim(),
                match: query
              });
            }
          });
        }
      }
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
