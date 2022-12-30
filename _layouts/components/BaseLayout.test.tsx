import { expect, test } from "vitest";

import BaseLayout, { BaseLayoutProps } from "./BaseLayout.11ty";

const props: BaseLayoutProps = { pageTitle: "The Page", children: [] };

test("BaseLayout", () => {
  document.body.innerHTML = BaseLayout(props);
  expect(document.body).to.exist;
});
