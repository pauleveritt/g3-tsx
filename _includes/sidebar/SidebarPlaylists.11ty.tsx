// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

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
    <div className="bio-page-sidebar-references-group" style="margin-top: 1rem">
      {playlists && playlists.length > 0 && (
        <>
          <p className="menu-label bio-page-sidebar-published">In Playlists</p>
          <ul className="menu-list is-small">
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
