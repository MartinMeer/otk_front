import * as esbuild from 'esbuild'
import { rimraf } from 'rimraf'
import stylePlugin from 'esbuild-style-plugin'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { copyFile, mkdir, writeFile, readFile } from 'fs/promises'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { spawn } from 'child_process'
import { createHash } from 'crypto'

const args = process.argv.slice(2)
const isProd = args[0] === '--production'

await rimraf('dist')

// Generate version hash for cache busting
function generateVersionHash() {
  const timestamp = Date.now().toString()
  const hash = createHash('md5').update(timestamp).digest('hex').slice(0, 8)
  return hash
}

const versionHash = generateVersionHash()

// Copy public folder to dist
async function copyPublicFolder() {
  try {
    const publicDir = 'public'
    const distDir = 'dist'
    
    // Create dist directory if it doesn't exist
    await mkdir(distDir, { recursive: true })
    
    // Copy all files from public to dist
    const files = await readdir(publicDir, { withFileTypes: true })
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(join(publicDir, file.name), join(distDir, file.name))
      }
    }
    
    // Copy images folder
    const imagesDir = join(publicDir, 'images')
    const distImagesDir = join(distDir, 'images')
    await mkdir(distImagesDir, { recursive: true })
    
    const imageFiles = await readdir(imagesDir, { withFileTypes: true })
    for (const file of imageFiles) {
      if (file.isFile()) {
        await copyFile(join(imagesDir, file.name), join(distImagesDir, file.name))
      }
    }

    // Copy downloads folder
    const downloadsDir = join(publicDir, 'downloads')
    const distDownloadsDir = join(distDir, 'downloads')
    await mkdir(distDownloadsDir, { recursive: true })
    try {
      const downloadFiles = await readdir(downloadsDir, { withFileTypes: true })
      for (const file of downloadFiles) {
        if (file.isFile()) {
          await copyFile(join(downloadsDir, file.name), join(distDownloadsDir, file.name))
        }
      }
    } catch (err) {
      // Optional folder; ignore if missing
    }
  } catch (error) {
    console.log('No public folder found or error copying files:', error.message)
  }
}

await copyPublicFolder()

// Ensure index.html exists in dist before we modify it later
await mkdir('dist', { recursive: true })
await copyFile('index.html', 'dist/index.html')

/**
 * @type {esbuild.BuildOptions}
 */
const esbuildOpts = {
  color: true,
  entryPoints: ['src/main.tsx'],
  outdir: 'dist',
  entryNames: '[name]',
  write: true,
  bundle: true,
  format: 'iife',
  sourcemap: isProd ? false : 'linked',
  minify: isProd,
  treeShaking: true,
  jsx: 'automatic',
  loader: {
    '.html': 'copy',
    '.png': 'file',
  },
  define: { __DEV__: isProd ? 'false' : 'true' },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
}


if (isProd) {
  await esbuild.build(esbuildOpts)
  
  // Generate version manifest
  const manifest = {
    version: versionHash,
    timestamp: new Date().toISOString()
  }
  
  await writeFile('dist/version.json', JSON.stringify(manifest, null, 2))
  
  // Update index.html with versioned assets via query params
  const indexPath = 'dist/index.html'
  let indexContent = await readFile(indexPath, 'utf-8')
  
  // Remove dev-only EventSource hot-reload lines if present
  indexContent = indexContent
    .split('\n')
    .filter(line => !line.includes('/esbuild'))
    .join('\n')
  
  // Append version query params to bust caches
  indexContent = indexContent.replace(/main\.css(?!\?v=)/g, `main.css?v=${versionHash}`)
  indexContent = indexContent.replace(/main\.js(?!\?v=)/g, `main.js?v=${versionHash}`)
  
  await writeFile(indexPath, indexContent)
  
  console.log(`Build completed with version: ${versionHash}`)
} else {
  const ctx = await esbuild.context(esbuildOpts)
  await ctx.watch()
  
  // Start a static file server for the dist folder
  const serveProcess = spawn('npx', ['serve', 'dist', '-p', '8001'], {
    stdio: 'inherit',
    shell: true
  })
  
  console.log(`Running on:`)
  console.log(`http://127.0.0.1:8001`)
  console.log(`http://172.20.10.2:8001`)
  
  // Handle process termination
  process.on('SIGINT', () => {
    serveProcess.kill()
    process.exit()
  })
}
