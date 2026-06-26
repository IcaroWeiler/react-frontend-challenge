import type { MovieVideo } from '#/shared/models/types/movie'
import { getTrailer, getVideoEmbedUrl } from '../lib/getTrailer'

interface TrailerProps {
  videos: MovieVideo[]
}

export function Trailer({ videos }: TrailerProps) {
  const trailer = getTrailer(videos)

  const embedUrl = getVideoEmbedUrl(trailer)

  return (
    <div className="mt-5">
      {trailer ? (
        <div>
          <iframe
            src={embedUrl}
            title="Movie Trailer"
            width="100%"
            height="500"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
