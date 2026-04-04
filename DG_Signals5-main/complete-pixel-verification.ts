import { getUncachableGitHubClient } from './server/github-helper';
import { readFile } from 'fs/promises';

async function completeVerification() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║     COMPLETE META PIXEL VERIFICATION                 ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  // 1. Check local file
  console.log('1️⃣  CHECKING LOCAL FILE (client/index.html):\n');
  const localContent = await readFile('client/index.html', 'utf-8');
  
  const localChecks = {
    'Meta Pixel script tag': localContent.includes('connect.facebook.net/en_US/fbevents.js'),
    'fbq init with ID 742825665410650': localContent.includes("fbq('init', '742825665410650')"),
    'PageView tracking': localContent.includes("fbq('track', 'PageView')"),
    'Noscript fallback': localContent.includes('facebook.com/tr?id=742825665410650&ev=PageView&noscript=1'),
    'Script in <head>': /<head>[\s\S]*fbq\('init'[\s\S]*<\/head>/.test(localContent),
    'Noscript in <body>': /<body>[\s\S]*<noscript>[\s\S]*facebook\.com\/tr\?id=742825665410650[\s\S]*<\/noscript>/.test(localContent)
  };
  
  Object.entries(localChecks).forEach(([check, passed]) => {
    console.log(`   ${passed ? '✅' : '❌'} ${check}`);
  });
  
  // 2. Check GitHub
  console.log('\n2️⃣  CHECKING GITHUB REPOSITORY:\n');
  const { data: githubFile } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/index.html'
  });
  
  if ('content' in githubFile) {
    const githubContent = Buffer.from(githubFile.content, 'base64').toString('utf-8');
    
    const githubChecks = {
      'Meta Pixel script tag': githubContent.includes('connect.facebook.net/en_US/fbevents.js'),
      'fbq init with ID 742825665410650': githubContent.includes("fbq('init', '742825665410650')"),
      'PageView tracking': githubContent.includes("fbq('track', 'PageView')"),
      'Noscript fallback': githubContent.includes('facebook.com/tr?id=742825665410650&ev=PageView&noscript=1'),
      'Script in <head>': /<head>[\s\S]*fbq\('init'[\s\S]*<\/head>/.test(githubContent),
      'Noscript in <body>': /<body>[\s\S]*<noscript>[\s\S]*facebook\.com\/tr\?id=742825665410650[\s\S]*<\/noscript>/.test(githubContent)
    };
    
    Object.entries(githubChecks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`);
    });
    
    // 3. Check if files match
    console.log('\n3️⃣  LOCAL vs GITHUB COMPARISON:\n');
    if (localContent === githubContent) {
      console.log('   ✅ Files are IDENTICAL - GitHub is up to date');
    } else {
      console.log('   ⚠️  Files are DIFFERENT - Changes not pushed yet');
    }
  }
  
  // 4. Extract exact pixel code from GitHub
  console.log('\n4️⃣  EXACT PIXEL CODE ON GITHUB:\n');
  if ('content' in githubFile) {
    const githubContent = Buffer.from(githubFile.content, 'base64').toString('utf-8');
    const pixelMatch = githubContent.match(/<!-- Meta Pixel Code -->([\s\S]*?)<!-- End Meta Pixel Code -->/);
    if (pixelMatch) {
      console.log(pixelMatch[0]);
    }
  }
  
  // 5. Check ContactPage.tsx for Lead event
  console.log('\n5️⃣  CHECKING EVENT TRACKING ON PAGES:\n');
  const { data: contactPage } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/src/pages/ContactPage.tsx'
  });
  
  if ('content' in contactPage) {
    const contactContent = Buffer.from(contactPage.content, 'base64').toString('utf-8');
    console.log(`   ${contactContent.includes("fbq('track', 'Contact')") ? '✅' : '❌'} Contact event on ContactPage.tsx`);
  }
  
  const { data: joinPage } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/src/pages/JoinPage.tsx'
  });
  
  if ('content' in joinPage) {
    const joinContent = Buffer.from(joinPage.content, 'base64').toString('utf-8');
    console.log(`   ${joinContent.includes("fbq('track', 'Lead')") ? '✅' : '❌'} Lead event on JoinPage.tsx`);
  }
  
  console.log('\n═══════════════════════════════════════════════════════\n');
}

completeVerification().catch(console.error);
