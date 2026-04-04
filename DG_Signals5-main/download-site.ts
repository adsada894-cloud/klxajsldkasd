import { cloneRepository } from './server/clone-repo';
import { resolve } from 'path';

async function main() {
  const targetPath = resolve(process.cwd(), 'website-repo');
  console.log('Downloading repository...');
  
  try {
    const fileCount = await cloneRepository('usermame7', 'victorypipsfx-website', targetPath);
    console.log(`Successfully downloaded ${fileCount} files`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
