/**
 * Favicon Generation Script
 * This script helps generate missing favicon files from existing ones
 * 
 * Prerequisites:
 * - Install sharp: npm install sharp
 * - Place your source favicon (high resolution, preferably 512x512 or larger) in public/source-favicon.png
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sourceFile = path.join(publicDir, 'source-favicon.png');

// Define the favicon sizes we need
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-144x144.png', size: 144 },
  { name: 'apple-touch-icon-120x120.png', size: 120 },
  { name: 'apple-touch-icon-114x114.png', size: 114 },
  { name: 'apple-touch-icon-76x76.png', size: 76 },
  { name: 'apple-touch-icon-72x72.png', size: 72 },
  { name: 'apple-touch-icon-60x60.png', size: 60 },
  { name: 'apple-touch-icon-57x57.png', size: 57 },
  { name: 'mstile-150x150.png', size: 150 },
];

async function generateFavicons() {
  try {
    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
      console.error('❌ Source favicon not found!');
      console.log('📝 Please place your high-resolution favicon (512x512 or larger) at:');
      console.log(`   ${sourceFile}`);
      console.log('\n💡 You can use any of your existing favicons as a source:');
      console.log('   - public/android-chrome-512x512.png');
      console.log('   - public/apple-touch-icon.png');
      console.log('   - public/favicon-32x32.png');
      return;
    }

    console.log('🎨 Generating favicon files...\n');

    for (const favicon of faviconSizes) {
      const outputPath = path.join(publicDir, favicon.name);
      
      // Skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipping ${favicon.name} (already exists)`);
        continue;
      }

      try {
        await sharp(sourceFile)
          .resize(favicon.size, favicon.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
        
        console.log(`✅ Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
      } catch (error) {
        console.error(`❌ Failed to generate ${favicon.name}:`, error.message);
      }
    }

    console.log('\n🎉 Favicon generation complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated files in the public/ directory');
    console.log('2. Update FaviconTags.tsx if you want to include additional sizes');
    console.log('3. Test your favicons in different browsers and devices');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

// Run the script
generateFavicons(); 