// noinspection ES6UnusedImports
import { h } from "nano-jsx";

type PlaylistItem = {
  title: string;
  href: string;
};
export type SidebarPlaylistsProps = {
  playlists?: PlaylistItem[];
};
const SidebarPlaylists = ({
  playlists,
}: SidebarPlaylistsProps): JSX.Element => {
  return (
    <div class="bio-page-sidebar-references-group" style="margin-top: 1rem">
      {playlists && playlists.length > 0 && (
        <>
          <p class="menu-label bio-page-sidebar-published">In Playlists</p>
          <ul class="menu-list is-small">
            {playlists.map((playlist) => (
              <li>
                <a href={playlist.href}>{playlist.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarPlaylists;
