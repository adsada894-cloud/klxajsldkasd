import { getUncachableGitHubClient } from './server/github-helper';
import { readFileSync } from 'fs';

async function pushChanges() {
  try {
    const octokit = await getUncachableGitHubClient();
    const owner = 'usermame7';
    const repo = '02signals_website_';
    
    console.log('=== PUSHING BRIGHTER BUTTON CHANGES ===\n');
    
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    const currentSHA = ref.object.sha;
    
    const { data: currentCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: currentSHA });
    
    const changedFiles = [
      'client/src/components/TelegramButton.tsx',
      'client/src/index.css'
    ];
    
    const blobs = await Promise.all(
      changedFiles.map(async (filePath) => {
        const content = readFileSync(`/home/runner/signals-project/${filePath}`, 'utf-8');
        const { data: blob } = await octokit.git.createBlob({ owner, repo, content, encoding: 'utf-8' });
        return { path: filePath, sha: blob.sha, mode: '100644' as const, type: 'blob' as const };
      })
    );
    
    const { data: newTree } = await octokit.git.createTree({
      owner, repo, base_tree: currentCommit.tree.sha, tree: blobs
    });
    
    const commitMessage = `Make "Join Free Channel" button brighter

Changes:
- Updated button gradient from hsl(184,100%,44%) to hsl(180,100%,55%)
- Second color from hsl(195,100%,42%) to hsl(195,100%,50%)
- Added glowing box-shadow effect for more visibility
- Fixed class name from "btn-gradient" to "cta-style-a1"`;
    
    const { data: newCommit } = await octokit.git.createCommit({
      owner, repo, message: commitMessage, tree: newTree.sha, parents: [currentSHA]
    });
    
    await octokit.git.updateRef({ owner, repo, ref: 'heads/main', sha: newCommit.sha });
    
    console.log('✅ SUCCESS!\nCommit:', newCommit.sha.substring(0, 7));
    console.log('URL: https://github.com/' + owner + '/' + repo + '/commit/' + newCommit.sha);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

pushChanges();
