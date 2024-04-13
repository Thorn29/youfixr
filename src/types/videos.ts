export interface RawVideo {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  },
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number
      },
      medium: {
        url: string,
        width: number,
        height: number
      },
      high: {
        url: string,
        width: number,
        height: number
      },
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: string
  }
}

export interface VideoData {
  title: string,
  author: string,
  date: string,
  description: string,
  videoId: string,
  favorited?: boolean
}