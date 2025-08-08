import { useVersion } from '../hooks/use-version'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { RefreshCw, Download } from 'lucide-react'

export function UpdateNotification() {
  const { isUpdateAvailable, applyUpdate, isLoading } = useVersion()

  if (!isUpdateAvailable) {
    return null
  }

  return (
    <Alert className="fixed bottom-4 right-4 w-80 z-50 bg-background border-2 border-primary shadow-lg">
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>New version available!</span>
        </div>
        <Button
          size="sm"
          onClick={applyUpdate}
          disabled={isLoading}
          className="ml-2"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            'Update'
          )}
        </Button>
      </AlertDescription>
    </Alert>
  )
} 