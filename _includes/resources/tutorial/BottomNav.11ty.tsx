// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type PrevNext = {
  slug: string;
  label: string;
};

export type BottomNavProps = {
  previous?: PrevNext;
  next?: PrevNext;
  playlistLabel?: string;
};
const BottomNav = ({
  previous,
  next,
  playlistLabel,
}: BottomNavProps): JSX.Element => {
  // If playlistLabel is passed in, tack it onto the links for going
  // forward and backwards, to allow presenting the previous/next
  // item in the context of a playlist.
  const playlistPrefix = playlistLabel ? `?playlist=${playlistLabel}` : "";
  return (
    <div className="columns is-size-10 is-size-6">
      <div className="column has-text-left">
        {previous && (
          <a
            href={`${previous.slug}${playlistPrefix}`}
            className="bottomnav-previous is-small"
          >
            <span className="icon" title={previous.label}>
              <i className="fas fa-arrow-left" />
            </span>
            <span style="padding-left: 1em">{previous.label}</span>
          </a>
        )}
      </div>
      <div className="column has-text-right">
        {next && (
          <a
            href={`${next.slug}${playlistPrefix}`}
            className="bottomnav-next is-small"
          >
            <span style="padding-right: 1em">{next.label}</span>
            <span className="icon" title={next.label}>
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
