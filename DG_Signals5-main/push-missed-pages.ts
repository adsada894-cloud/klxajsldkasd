import { getUncachableGitHubClient } from './server/github-helper';
import { readFileSync } from 'fs';

async function pushChanges() {
  try {
    const octokit = await getUncachableGitHubClient();
    const owner = 'usermame7';
    const repo = '02signals_website_';
    
    console.log('=== PUSHING MISSED PAGES FIXES ===\n');
    
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    const currentSHA = ref.object.sha;
    
    const { data: currentCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: currentSHA });
    
    const changedFiles = [
      'client/src/pages/JoinPage.tsx',
      'client/src/pages/ContactPage.tsx',
      'client/src/pages/DisclaimerPage.tsx',
      'client/src/pages/PrivacyPolicyPage.tsx',
      'client/src/pages/TermsOfUsePage.tsx'
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
    
    const commitMessage = `Fix: Update CSS classes in all pages (completed transformation)

Updated 5 pages that were missed:
- JoinPage.tsx: glass-card → surface-panel-v2, bg-gradient-custom → backdrop-blend-v1
- ContactPage.tsx: glass-card → surface-panel-v2, bg-gradient-custom → backdrop-blend-v1
- DisclaimerPage.tsx: glass-card → surface-panel-v2
- PrivacyPolicyPage.tsx: glass-card → surface-panel-v2
- TermsOfUsePage.tsx: glass-card → surface-panel-v2

All animations renamed:
- animate-bg-shift → backdrop-morph
- bg-particles → backdrop-dots-v1
- animate-particles → dots-drift

Now 100% CSS class transformation is complete!`;
    
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
