import { test } from "vitest";

import { PlaylistLayout } from "./PlaylistLayout.11ty";
import fixtures from "../../fixtures";
import { TipLayoutData } from "../tip/TipLayout.11ty";
import { SiteCollections } from "../../models";

test("should render PlaylistLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: TipLayoutData = {
    ...tip0.data,
    page: tip0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
  };
  document.body.innerHTML = PlaylistLayout.call(fixtures.context, renderProps);
  // expect(screen.getByText("Some Playlist")).to.exist;
  // expect(screen.getByText("The TipLayout")).to.exist;
});
