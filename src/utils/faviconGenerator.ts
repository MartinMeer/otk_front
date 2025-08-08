/**
 * Favicon generation utilities
 * Converts SVG favicon to various required formats and sizes
 */

interface FaviconSize {
  width: number;
  height: number;
  filename: string;
  purpose?: string;
}

/**
 * Standard favicon sizes for comprehensive device support
 */
export const FAVICON_SIZES: FaviconSize[] = [
  // Standard favicons
  { width: 16, height: 16, filename: 'favicon-16x16.png' },
  { width: 32, height: 32, filename: 'favicon-32x32.png' },
  
  // Apple Touch Icons (iOS)
  { width: 57, height: 57, filename: 'apple-touch-icon-57x57.png' },
  { width: 60, height: 60, filename: 'apple-touch-icon-60x60.png' },
  { width: 72, height: 72, filename: 'apple-touch-icon-72x72.png' },
  { width: 76, height: 76, filename: 'apple-touch-icon-76x76.png' },
  { width: 114, height: 114, filename: 'apple-touch-icon-114x114.png' },
  { width: 120, height: 120, filename: 'apple-touch-icon-120x120.png' },
  { width: 144, height: 144, filename: 'apple-touch-icon-144x144.png' },
  { width: 152, height: 152, filename: 'apple-touch-icon-152x152.png' },
  { width: 180, height: 180, filename: 'apple-touch-icon.png' },
  
  // Android Chrome Icons
  { width: 192, height: 192, filename: 'android-chrome-192x192.png', purpose: 'any maskable' },
  { width: 512, height: 512, filename: 'android-chrome-512x512.png', purpose: 'any maskable' },
  
  // Windows Tile
  { width: 150, height: 150, filename: 'mstile-150x150.png' },
];

/**
 * Generate favicon blob from SVG source
 */
export const generateFaviconBlob = async (
  svgSource: string, 
  width: number, 
  height: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, width, height);
      
      // Draw SVG image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/png', 1.0);
    };

    img.onerror = () => reject(new Error('Failed to load SVG'));
    
    // Create data URL from SVG
    const svgBlob = new Blob([svgSource], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  });
};

/**
 * Download all favicon sizes as files
 * Useful for development and manual favicon generation
 */
export const downloadFaviconSet = async (svgSource: string) => {
  for (const size of FAVICON_SIZES) {
    try {
      const blob = await generateFaviconBlob(svgSource, size.width, size.height);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = size.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to generate ${size.filename}:`, error);
    }
  }
};

/**
 * Validate favicon support in current browser
 */
export const getFaviconSupport = () => {
  const canvas = document.createElement('canvas');
  const hasCanvas = !!canvas.getContext;
  
  return {
    svg: 'SVGElement' in window,
    canvas: hasCanvas,
    webp: hasCanvas && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
    download: 'download' in document.createElement('a'),
  };
};

/**
 * Get optimal favicon format for current browser
 */
export const getOptimalFaviconFormat = (): 'svg' | 'png' | 'ico' => {
  const support = getFaviconSupport();
  
  if (support.svg) return 'svg';
  if (support.canvas) return 'png';
  return 'ico';
};