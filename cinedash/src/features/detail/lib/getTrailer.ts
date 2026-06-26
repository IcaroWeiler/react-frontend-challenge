import type { MovieVideo } from '../api/getMovie'

export const getTrailer = (videos: MovieVideo[]) => {
  if (!videos) return
  const trailer = videos.find(
    (video) =>
      video.site === 'YouTube' && video.type === 'Trailer' && video.official,
  )

  return trailer
}

export const getVideoEmbedUrl = (video: MovieVideo | undefined) => {
  if (!video) return

  return `https://www.youtube.com/embed/${video.key}`
}
