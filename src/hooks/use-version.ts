import { useState, useEffect, useCallback } from 'react'

interface VersionInfo {
  version: string
  timestamp: string
  files: string[]
}

interface UseVersionReturn {
  currentVersion: string | null
  latestVersion: string | null
  isUpdateAvailable: boolean
  checkForUpdates: () => Promise<void>
  applyUpdate: () => void
  isLoading: boolean
}

export function useVersion(): UseVersionReturn {
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const [latestVersion, setLatestVersion] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkForUpdates = useCallback(async () => {
    if (window.location.hostname === 'localhost') return;
    setIsLoading(true)
    try {
      const response = await fetch('/version.json', {
        cache: 'no-cache', // Always fetch fresh version
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (response.ok) {
        const versionInfo: VersionInfo = await response.json()
        setLatestVersion(versionInfo.version)
        
        // Check if this is a new version
        if (currentVersion && versionInfo.version !== currentVersion) {
          console.log('New version available:', versionInfo.version)
        }
      }
    } catch (error) {
      console.error('Failed to check for updates:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentVersion])

  const applyUpdate = useCallback(() => {
    // Reload the page to apply the update
    window.location.reload()
  }, [])

  useEffect(() => {
    // Get current version from localStorage or set initial
    const storedVersion = localStorage.getItem('app-version')
    if (storedVersion) {
      setCurrentVersion(storedVersion)
    }

    // Check for updates on mount
    checkForUpdates()

    // Set up periodic update checks (every 5 minutes)
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [checkForUpdates])

  useEffect(() => {
    // Update stored version when latest version changes
    if (latestVersion) {
      localStorage.setItem('app-version', latestVersion)
      setCurrentVersion(latestVersion)
    }
  }, [latestVersion])

  const isUpdateAvailable = currentVersion !== null && 
                           latestVersion !== null && 
                           currentVersion !== latestVersion

  return {
    currentVersion,
    latestVersion,
    isUpdateAvailable,
    checkForUpdates,
    applyUpdate,
    isLoading
  }
} 