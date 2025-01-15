declare module 'rss' {
  // @ts-ignore
  export default class RSS {
    constructor(options: {
      title: string
      description: string
      site_url: string
      feed_url: string
      language: string
    })
    item(options: {
      title: string
      description: string
      url: string
      date: string
      categories: string[]
    }): void
    xml(): string
  }
}
