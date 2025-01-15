'use client'

import { Crisp } from 'crisp-sdk-web'
import config from '@/config'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Use this button if chat is hidden on some routes. config.js has onlyShowOnRoutes set to ["/"] so it will be hidden on all routes except the home page.
// If Crisp is not enable, it will open the support email in the default email client.
const ButtonSupport = ({
  className,
  size = 'sm',
  variant = 'outline',
}: {
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}) => {
  const handleClick = () => {
    if (config.crisp?.id) {
      Crisp.chat.show()
      Crisp.chat.open()
    } else if (config.resend?.supportEmail) {
      // open default email client in new window with "need help with ${config.appName}" as subject
      window.open(
        `mailto:${config.resend.supportEmail}?subject=Need help with ${config.appName}`,
        '_blank'
      )
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={cn('group gap-2 transition-colors duration-200', className)}
      size={size}
      variant={variant}
    >
      <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      Support
    </Button>
  )
}

export default ButtonSupport
