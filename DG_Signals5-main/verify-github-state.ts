import { getUncachableGitHubClient } from './server/github-helper';

async function verifyGitHub() {
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  console.log('=== Checking Latest Commit on GitHub ===');
  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 1
  });
  
  console.log(`Latest commit: ${commits[0].sha}`);
  console.log(`Message: ${commits[0].commit.message}`);
  console.log(`Date: ${commits[0].commit.author?.date}`);
  
  console.log('\n=== Checking ContactPage.tsx ===');
  const { data: contactPage } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/src/pages/ContactPage.tsx'
  });
  
  if ('content' in contactPage) {
    const content = Buffer.from(contactPage.content, 'base64').toString('utf-8');
    const telegramMatch = content.match(/telegramUrl = "(.+?)"/);
    console.log(`Telegram URL: ${telegramMatch?.[1] || 'NOT FOUND'}`);
  }
  
  console.log('\n=== Checking index.html ===');
  const { data: indexHtml } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/index.html'
  });
  
  if ('content' in indexHtml) {
    const content = Buffer.from(indexHtml.content, 'base64').toString('utf-8');
    const pixelMatch = content.match(/fbq\('init', '(\d+)'\)/);
    console.log(`Meta Pixel ID: ${pixelMatch?.[1] || 'NOT FOUND'}`);
  }
}

verifyGitHub().catch(console.error);
