import { getUncachableGitHubClient } from './server/github-helper';

async function verifyPixel() {
  const octokit = await getUncachableGitHubClient();
  const owner = 'usermame7';
  const repo = 'victorypipsfx-website';
  
  console.log('=== VERIFYING META PIXEL ON GITHUB ===\n');
  
  // Check index.html
  const { data: indexHtml } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'client/index.html'
  });
  
  if ('content' in indexHtml) {
    const content = Buffer.from(indexHtml.content, 'base64').toString('utf-8');
    
    // Check for pixel code
    const hasPixelInit = content.includes("fbq('init', '742825665410650')");
    const hasPixelTrack = content.includes("fbq('track', 'PageView')");
    const hasPixelScript = content.includes('connect.facebook.net/en_US/fbevents.js');
    const hasNoscript = content.includes('facebook.com/tr?id=742825665410650');
    
    console.log('✅ Pixel Installation Check:');
    console.log(`  - fbq init with correct ID: ${hasPixelInit ? '✅ YES' : '❌ NO'}`);
    console.log(`  - PageView tracking: ${hasPixelTrack ? '✅ YES' : '❌ NO'}`);
    console.log(`  - Pixel script URL: ${hasPixelScript ? '✅ YES' : '❌ NO'}`);
    console.log(`  - Noscript fallback: ${hasNoscript ? '✅ YES' : '❌ NO'}`);
    
    // Extract the pixel code section
    const pixelCodeMatch = content.match(/<!-- Meta Pixel Code -->([\s\S]*?)<!-- End Meta Pixel Code -->/);
    if (pixelCodeMatch) {
      console.log('\n✅ Pixel Code Found on GitHub:\n');
      console.log(pixelCodeMatch[0].substring(0, 300) + '...');
    }
    
    // Check if it's in the head section
    const headSection = content.match(/<head>([\s\S]*?)<\/head>/);
    if (headSection && headSection[0].includes("fbq('init'")) {
      console.log('\n✅ Pixel is correctly placed in <head> section');
    } else {
      console.log('\n❌ Pixel is NOT in <head> section');
    }
    
    // Check noscript placement
    const bodySection = content.match(/<body>([\s\S]*?)<div id="root">/);
    if (bodySection && bodySection[0].includes('facebook.com/tr?id=742825665410650')) {
      console.log('✅ Noscript fallback correctly placed in <body>');
    } else {
      console.log('❌ Noscript fallback NOT properly placed');
    }
  }
}

verifyPixel().catch(console.error);
