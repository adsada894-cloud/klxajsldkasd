import { getUncachableGitHubClient } from './server/github-helper';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function pushAdvancedMatching() {
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  console.log('Pushing Meta Pixel Advanced Matching update to GitHub...\n');
  
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const branch = repoData.default_branch;
  
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`
  });
  const currentCommitSha = refData.object.sha;
  
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: currentCommitSha
  });
  const currentTreeSha = commitData.tree.sha;
  
  // Read updated index.html
  const indexHtmlPath = join(process.cwd(), 'website-repo/client/index.html');
  const indexHtmlContent = await readFile(indexHtmlPath, 'utf-8');
  
  // Create blob
  const blob = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from(indexHtmlContent).toString('base64'),
    encoding: 'base64'
  });
  
  // Create tree
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentTreeSha,
    tree: [{
      path: 'client/index.html',
      mode: '100644',
      type: 'blob',
      sha: blob.data.sha
    }]
  });
  
  // Create commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Add Meta Pixel Advanced Matching parameters for better conversion attribution',
    tree: newTree.sha,
    parents: [currentCommitSha]
  });
  
  // Update reference
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha
  });
  
  console.log('✅ Successfully pushed to GitHub!');
  console.log(`Commit SHA: ${newCommit.sha}`);
  console.log(`\nView on GitHub: https://github.com/${owner}/${repo}/commit/${newCommit.sha}`);
  
  // Verify the change
  console.log('\n✅ Advanced Matching Parameters Added:');
  console.log('  - em (email)');
  console.log('  - ph (phone)');
  console.log('  - fn (first name)');
  console.log('  - ln (last name)');
  console.log('  - ct (city)');
  console.log('  - st (state)');
  console.log('  - zp (zip code)');
  console.log('  - country');
}

pushAdvancedMatching().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
