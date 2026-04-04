import { getUncachableGitHubClient } from './server/github-helper';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function checkChanges() {
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  const filesToCheck = [
    'client/src/components/Hero.tsx',
    'client/src/components/Header.tsx',
    'client/src/components/Footer.tsx',
    'client/src/components/AboutSection.tsx',
    'client/src/components/WhyChooseUs.tsx',
    'client/src/components/HowItWorks.tsx',
    'client/src/components/Testimonials.tsx',
    'client/src/components/Pricing.tsx',
    'client/src/index.css'
  ];
  
  console.log('Checking for visual changes not yet pushed to GitHub...\n');
  
  for (const filePath of filesToCheck) {
    try {
      // Get file from GitHub
      const { data: githubFile } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath
      });
      
      if ('content' in githubFile) {
        const githubContent = Buffer.from(githubFile.content, 'base64').toString('utf-8');
        
        // Get local file
        const localPath = join(process.cwd(), 'client', filePath.replace('client/', ''));
        const localContent = await readFile(localPath, 'utf-8');
        
        if (githubContent !== localContent) {
          console.log(`❌ DIFFERENT: ${filePath}`);
        } else {
          console.log(`✅ SAME: ${filePath}`);
        }
      }
    } catch (error: any) {
      if (error.status === 404) {
        console.log(`🆕 NEW FILE (not on GitHub): ${filePath}`);
      } else {
        console.log(`⚠️  ERROR checking ${filePath}: ${error.message}`);
      }
    }
  }
}

checkChanges().catch(console.error);
