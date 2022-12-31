import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPlaylists, {
  SidebarPlaylistsProps,
} from "./SidebarPlaylists.11ty";

const props: SidebarPlaylistsProps = {
  playlists: [
    { title: "Playlist Item 1", href: "/playlist-item1" },
    { title: "Playlist Item 2", href: "/playlist-item2" },
  ],
};

test("SidebarPlaylists", () => {
  document.body.innerHTML = SidebarPlaylists(props);
  const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  expect(results[0].href).to.equal("/playlist-item1");
  expect(results[1].href).to.equal("/playlist-item2");
});
