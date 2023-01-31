// noinspection ES6UnusedImports
import { h } from "nano-jsx";

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
    <div class="columns is-size-10 is-size-6">
      <div class="column has-text-left">
        {previous && (
          <a
            href={`${previous.slug}${playlistPrefix}`}
            class="bottomnav-previous is-small"
          >
            <span class="icon" title={previous.label}>
              <i class="fas fa-arrow-left" />
            </span>
            <span style="padding-left: 1em">{previous.label}</span>
          </a>
        )}
      </div>
      <div class="column has-text-right">
        {next && (
          <a
            href={`${next.slug}${playlistPrefix}`}
            class="bottomnav-next is-small"
          >
            <span style="padding-right: 1em">{next.label}</span>
            <span class="icon" title={next.label}>
              <i class="fas fa-arrow-right" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
