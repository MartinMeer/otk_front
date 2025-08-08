#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFile, writeFile } from 'fs/promises'
import { createHash } from 'crypto'

async function deploy() {
  console.log('🚀 Starting deployment...')
  
  try {
    // Build the project
    console.log('📦 Building project...')
    execSync('npm run build', { stdio: 'inherit' })
    
    // Read the generated version.json
    const versionData = JSON.parse(await readFile('dist/version.json', 'utf-8'))
    const version = versionData.version
    
    console.log(`✅ Build completed with version: ${version}`)
    
    // Create a deployment manifest
    const deploymentManifest = {
      version,
      timestamp: new Date().toISOString(),
      buildHash: createHash('md5').update(version).digest('hex'),
      files: versionData.files || []
    }
    
    await writeFile('dist/deployment.json', JSON.stringify(deploymentManifest, null, 2))
    
    // Generate cache headers file for web server
    const cacheHeaders = `
# Cache control headers for versioned assets
/main.*.js
  Cache-Control: public, max-age=31536000, immutable

/main.*.css
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/version.json
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

/deployment.json
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
`
    
    await writeFile('dist/_headers', cacheHeaders)
    
    console.log('📋 Generated deployment files:')
    console.log('  - version.json (version info)')
    console.log('  - deployment.json (deployment manifest)')
    console.log('  - _headers (cache control)')
    
    console.log('\n🎉 Deployment ready!')
    console.log(`Version: ${version}`)
    console.log('Upload the contents of the dist/ folder to your web server.')
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    process.exit(1)
  }
}

deploy() 