import { getUncachableGitHubClient } from './server/github-helper';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function pushAllChanges() {
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  console.log('Getting repository default branch...');
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const branch = repoData.default_branch;
  
  console.log(`Working on branch: ${branch}`);
  
  // Get the current commit SHA
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`
  });
  const currentCommitSha = refData.object.sha;
  
  // Get the tree for the current commit
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: currentCommitSha
  });
  const currentTreeSha = commitData.tree.sha;
  
  // Read all updated files
  const filesToUpdate = [
    'client/src/pages/ContactPage.tsx',
    'client/src/pages/JoinPage.tsx',
    'client/index.html',
    'client/src/components/Hero.tsx'
  ];
  
  console.log('Creating blobs for updated files...');
  const blobs = [];
  
  for (const filePath of filesToUpdate) {
    const localPath = join(process.cwd(), 'website-repo', filePath);
    const content = await readFile(localPath, 'utf-8');
    
    const blob = await octokit.git.createBlob({
      owner,
      repo,
      content: Buffer.from(content).toString('base64'),
      encoding: 'base64'
    });
    
    blobs.push({ path: filePath, sha: blob.data.sha });
    console.log(`  ✓ ${filePath}`);
  }
  
  // Create a new tree with all updated files
  console.log('Creating new tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentTreeSha,
    tree: blobs.map(blob => ({
      path: blob.path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha
    }))
  });
  
  // Create a new commit
  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Update: Telegram links, Meta Pixel tracking, and Hero section visual improvements',
    tree: newTree.sha,
    parents: [currentCommitSha]
  });
  
  // Update the reference to point to the new commit
  console.log('Pushing to GitHub...');
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha
  });
  
  console.log('\n✅ Successfully pushed ALL changes to GitHub!');
  console.log(`Commit SHA: ${newCommit.sha}`);
  console.log(`\nFiles updated:`);
  filesToUpdate.forEach(file => console.log(`  - ${file}`));
  console.log(`\nView on GitHub: https://github.com/${owner}/${repo}/commit/${newCommit.sha}`);
}

pushAllChanges().catch(error => {
  console.error('Error pushing to GitHub:', error);
  process.exit(1);
});
