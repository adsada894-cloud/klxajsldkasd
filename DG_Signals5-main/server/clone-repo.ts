import { getUncachableGitHubClient } from './github-helper';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function cloneRepository(owner: string, repo: string, targetPath: string) {
  const octokit = await getUncachableGitHubClient();
  
  // Get repository tree
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;
  
  const { data: tree } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: defaultBranch,
    recursive: 'true'
  });
  
  // Download all files
  for (const item of tree.tree) {
    if (item.type === 'blob' && item.path) {
      try {
        const { data: blob } = await octokit.git.getBlob({
          owner,
          repo,
          file_sha: item.sha!
        });
        
        const filePath = join(targetPath, item.path);
        const dirPath = join(filePath, '..');
        
        await mkdir(dirPath, { recursive: true });
        
        const content = Buffer.from(blob.content, blob.encoding as BufferEncoding);
        await writeFile(filePath, content);
        
        console.log(`Downloaded: ${item.path}`);
      } catch (error) {
        console.error(`Error downloading ${item.path}:`, error);
      }
    }
  }
  
  return tree.tree.length;
}
