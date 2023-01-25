import h, { JSX } from "vhtml";

export type VideoPlayerProps = {
  source: string,
  poster?: string
}

const VideoPlayer = ({ source, poster }: VideoPlayerProps): JSX.Element => {
  return <video
      aria-label="video player"
      class="video-js vjs-default-skin"
      controls
      width="480" height="270"
      data-setup='{ "techOrder": ["youtube"] }'
      poster={poster}
    >
      <source src={source} type="video/youtube" />
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
        >
      </p>
    </video>;
};

export default VideoPlayer;