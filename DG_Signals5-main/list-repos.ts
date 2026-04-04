import { getUncachableGitHubClient } from './server/github-helper';

async function main() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log('Authenticated as:', user.login);
    
    // List repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100
    });
    
    console.log('\nYour repositories:');
    repos.forEach(repo => {
      console.log(`- ${repo.full_name} (${repo.private ? 'private' : 'public'})`);
    });
    
    // Search for victorypips
    const matching = repos.filter(r => r.name.toLowerCase().includes('victory') || r.name.toLowerCase().includes('pips'));
    if (matching.length > 0) {
      console.log('\nMatching repositories:');
      matching.forEach(repo => {
        console.log(`- ${repo.full_name}`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
