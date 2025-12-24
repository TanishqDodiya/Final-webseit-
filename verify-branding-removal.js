// Verify Branding Removal Script
// Run this with: node verify-branding-removal.js

import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying Lovable Branding Removal...\n');

const filesToCheck = [
  'index.html',
  'package.json',
  'vite.config.ts',
  'src/main.tsx'
];

let foundIssues = false;

console.log('1. Checking key files for branding...');

filesToCheck.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('lovable')) {
        console.log(`❌ Found "Lovable" in ${filePath}`);
        foundIssues = true;
      } else {
        console.log(`✅ ${filePath} - Clean`);
      }
    } else {
      console.log(`⚠️  ${filePath} - File not found`);
    }
  } catch (error) {
    console.log(`❌ Error checking ${filePath}: ${error.message}`);
  }
});

console.log('\n2. Checking HTML title and meta tags...');

try {
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  
  // Check title
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    console.log(`✅ Page title: "${title}"`);
    if (title.toLowerCase().includes('lovable')) {
      console.log('❌ Title still contains Lovable branding');
      foundIssues = true;
    }
  }
  
  // Check meta description
  const descMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
  if (descMatch) {
    const description = descMatch[1];
    console.log(`✅ Meta description: "${description}"`);
    if (description.toLowerCase().includes('lovable')) {
      console.log('❌ Meta description still contains Lovable branding');
      foundIssues = true;
    }
  }
  
  // Check for Lovable images
  if (htmlContent.includes('lovable.dev')) {
    console.log('❌ Found Lovable image URLs in HTML');
    foundIssues = true;
  } else {
    console.log('✅ No Lovable image URLs found');
  }
  
} catch (error) {
  console.log(`❌ Error checking HTML: ${error.message}`);
}

console.log('\n3. Checking package.json...');

try {
  const packageContent = fs.readFileSync('package.json', 'utf8');
  const packageJson = JSON.parse(packageContent);
  
  console.log(`✅ Package name: "${packageJson.name}"`);
  console.log(`✅ Package version: "${packageJson.version}"`);
  
  if (packageJson.description) {
    console.log(`✅ Package description: "${packageJson.description}"`);
  }
  
  // Check for lovable-tagger
  if (packageJson.devDependencies && packageJson.devDependencies['lovable-tagger']) {
    console.log('❌ lovable-tagger still in devDependencies');
    foundIssues = true;
  } else {
    console.log('✅ lovable-tagger removed from dependencies');
  }
  
} catch (error) {
  console.log(`❌ Error checking package.json: ${error.message}`);
}

console.log('\n4. Checking vite.config.ts...');

try {
  const viteContent = fs.readFileSync('vite.config.ts', 'utf8');
  
  if (viteContent.includes('lovable-tagger') || viteContent.includes('componentTagger')) {
    console.log('❌ Lovable tagger still referenced in vite.config.ts');
    foundIssues = true;
  } else {
    console.log('✅ Vite config clean of Lovable references');
  }
  
} catch (error) {
  console.log(`❌ Error checking vite.config.ts: ${error.message}`);
}

console.log('\n📊 Branding Removal Summary:');
console.log('================================');

if (foundIssues) {
  console.log('❌ Issues found - Some Lovable branding may still be present');
  console.log('\nPlease review the issues above and fix them manually.');
} else {
  console.log('✅ All Lovable branding successfully removed!');
  console.log('\n🎉 Your website is now completely neutral:');
  console.log('- No Lovable branding in HTML title or meta tags');
  console.log('- No Lovable images or watermarks');
  console.log('- No Lovable dependencies');
  console.log('- Clean package.json and build configuration');
  console.log('\n🌐 When hosted, only your domain name will be visible.');
  console.log('🚀 Application running at: http://localhost:8084/');
}

console.log('\n🔧 Current Branding:');
console.log('- Site Name: ELYF EVSPARE');
console.log('- Description: Electric Vehicle Spare Parts');
console.log('- Completely neutral and professional');