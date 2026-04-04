// GitHub Push Script using Replit GitHub Integration
import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function getAllFiles(dir: string, baseDir: string = dir): Promise<{path: string, content: string}[]> {
  const files: {path: string, content: string}[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    // Skip node_modules, .git, and other common ignore patterns
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.replit' || 
        entry.name === 'replit.nix' || entry.name === '.cache' || entry.name === 'dist' ||
        entry.name === '.upm' || entry.name === '.config') {
      continue;
    }
    
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath, baseDir));
    } else {
      try {
        const content = fs.readFileSync(fullPath, 'base64');
        files.push({ path: relativePath, content });
      } catch (e) {
        console.log(`Skipping ${relativePath}: ${e}`);
      }
    }
  }
  
  return files;
}

async function pushToGitHub() {
  const owner = 'usermame7';
  const repo = '04signals_website';
  const branch = 'main';
  const commitMessage = 'Update: Website fixes and improvements';

  console.log('🔄 Connecting to GitHub...');
  const octokit = await getUncachableGitHubClient();
  
  console.log('📂 Getting current repository state...');
  
  // Get the current commit SHA
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`
  });
  const currentCommitSha = refData.object.sha;
  console.log(`Current commit: ${currentCommitSha}`);
  
  // Get the current tree
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: currentCommitSha
  });
  const currentTreeSha = commitData.tree.sha;
  
  console.log('📁 Collecting files to push...');
  const files = await getAllFiles('.');
  console.log(`Found ${files.length} files to push`);
  
  // Create blobs for each file
  console.log('📤 Creating file blobs...');
  const treeItems: any[] = [];
  
  for (const file of files) {
    try {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: 'base64'
      });
      
      treeItems.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
    } catch (e) {
      console.log(`Error creating blob for ${file.path}: ${e}`);
    }
  }
  
  console.log('🌳 Creating new tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentTreeSha,
    tree: treeItems
  });
  
  console.log('📝 Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: newTree.sha,
    parents: [currentCommitSha]
  });
  
  console.log('🚀 Pushing to GitHub...');
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha
  });
  
  console.log('✅ Successfully pushed to GitHub!');
  console.log(`Commit SHA: ${newCommit.sha}`);
  console.log(`View at: https://github.com/${owner}/${repo}/commit/${newCommit.sha}`);
}

pushToGitHub().catch(console.error);
