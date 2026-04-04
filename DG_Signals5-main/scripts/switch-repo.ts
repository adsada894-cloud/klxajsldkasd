import { getUncachableGitHubClient } from '../server/github-helper';
import * as fs from 'fs';
import * as path from 'path';

const OWNER = 'usermame7';
const REPO = '04signals_website';

async function fetchRepoContents(octokit: any, path: string = ''): Promise<any[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: path,
    });
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.log(`Could not fetch ${path}: ${error}`);
    return [];
  }
}

async function downloadFile(octokit: any, filePath: string): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: filePath,
    });
    
    if (data.type === 'file' && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf8');
    }
    return null;
  } catch (error) {
    console.log(`Could not download ${filePath}: ${error}`);
    return null;
  }
}

async function processDirectory(octokit: any, repoPath: string, localBasePath: string) {
  const contents = await fetchRepoContents(octokit, repoPath);
  
  for (const item of contents) {
    const localPath = path.join(localBasePath, item.name);
    
    if (item.type === 'dir') {
      // Skip certain directories
      if (['node_modules', '.git', 'dist', 'original_backup_website_1', 'website-repo', 'attached_assets'].includes(item.name)) {
        console.log(`⏭️ Skipping directory: ${item.path}`);
        continue;
      }
      
      fs.mkdirSync(localPath, { recursive: true });
      await processDirectory(octokit, item.path, localPath);
    } else if (item.type === 'file') {
      // Skip certain files
      if (item.name.endsWith('.lock') || item.name === 'package-lock.json') {
        console.log(`⏭️ Skipping: ${item.path}`);
        continue;
      }
      
      const content = await downloadFile(octokit, item.path);
      if (content !== null) {
        fs.mkdirSync(path.dirname(localPath), { recursive: true });
        fs.writeFileSync(localPath, content);
        console.log(`✅ Downloaded: ${item.path}`);
      }
    }
  }
}

async function main() {
  console.log(`🔄 Connecting to GitHub...`);
  const octokit = await getUncachableGitHubClient();
  
  console.log(`📂 Fetching ${OWNER}/${REPO}...`);
  
  // Get repo info
  const { data: repoInfo } = await octokit.repos.get({
    owner: OWNER,
    repo: REPO,
  });
  
  console.log(`📋 Repository: ${repoInfo.full_name}`);
  console.log(`📝 Default branch: ${repoInfo.default_branch}`);
  
  // Create temp directory
  const tempDir = '/home/runner/workspace/temp_04signals';
  fs.mkdirSync(tempDir, { recursive: true });
  
  // Download all files
  console.log(`📥 Downloading files...`);
  await processDirectory(octokit, '', tempDir);
  
  console.log(`\n✅ Files downloaded to ${tempDir}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Review the files in ${tempDir}`);
  console.log(`2. Copy needed files to main workspace`);
  console.log(`3. Update github-push.ts to point to ${REPO}`);
}

main().catch(console.error);
