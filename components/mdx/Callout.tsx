import { Info, AlertCircle, CheckCircle } from 'lucide-react'
import React from 'react'

type CalloutType = 'info' | 'warning' | 'success'

interface CalloutProps {
  children: React.ReactNode
  type?: CalloutType
}

const calloutStyles = {
  info: {
    container:
      'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20',
    icon: 'text-blue-800 dark:text-blue-300',
    content: 'text-blue-800 dark:text-blue-300',
  },
  warning: {
    container:
      'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20',
    icon: 'text-yellow-800 dark:text-yellow-300',
    content: 'text-yellow-800 dark:text-yellow-300',
  },
  success: {
    container:
      'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20',
    icon: 'text-green-800 dark:text-green-300',
    content: 'text-green-800 dark:text-green-300',
  },
}

const CalloutIcon = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = calloutStyles[type]
  const Icon = CalloutIcon[type]

  return (
    <div className={`my-6 rounded-lg border ${styles.container}`}>
      <div className="flex items-start p-4">
        <Icon className={`h-5 w-5 ${styles.icon} flex-shrink-0 mt-1`} />
        <div className={`ml-3 ${styles.content} [&>p]:mt-0 [&>p]:mb-0`}>
          {children}
        </div>
      </div>
    </div>
  )
}
