import { getUncachableGitHubClient } from './server/github-helper';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function pushChanges() {
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
  
  // Read the updated files
  const contactPageContent = await readFile(join(process.cwd(), 'website-repo/client/src/pages/ContactPage.tsx'), 'utf-8');
  const joinPageContent = await readFile(join(process.cwd(), 'website-repo/client/src/pages/JoinPage.tsx'), 'utf-8');
  const indexHtmlContent = await readFile(join(process.cwd(), 'website-repo/client/index.html'), 'utf-8');
  
  // Create blobs for the updated files
  console.log('Creating blobs for updated files...');
  const contactPageBlob = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from(contactPageContent).toString('base64'),
    encoding: 'base64'
  });
  
  const joinPageBlob = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from(joinPageContent).toString('base64'),
    encoding: 'base64'
  });
  
  const indexHtmlBlob = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from(indexHtmlContent).toString('base64'),
    encoding: 'base64'
  });
  
  // Create a new tree with the updated files
  console.log('Creating new tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentTreeSha,
    tree: [
      {
        path: 'client/src/pages/ContactPage.tsx',
        mode: '100644',
        type: 'blob',
        sha: contactPageBlob.data.sha
      },
      {
        path: 'client/src/pages/JoinPage.tsx',
        mode: '100644',
        type: 'blob',
        sha: joinPageBlob.data.sha
      },
      {
        path: 'client/index.html',
        mode: '100644',
        type: 'blob',
        sha: indexHtmlBlob.data.sha
      }
    ]
  });
  
  // Create a new commit
  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Update: Replace Telegram links and add Meta Pixel tracking (ID: 742825665410650)',
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
  
  console.log('\n✅ Successfully pushed to GitHub!');
  console.log(`Commit SHA: ${newCommit.sha}`);
  console.log(`View on GitHub: https://github.com/${owner}/${repo}/commit/${newCommit.sha}`);
}

pushChanges().catch(error => {
  console.error('Error pushing to GitHub:', error);
  process.exit(1);
});
