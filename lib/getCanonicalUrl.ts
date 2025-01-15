import config from '@/config'

const baseUrl = `https://${config.domainName}`

export const getCanonicalUrl = (path: string) => {
  return `${baseUrl}${path}`
}
