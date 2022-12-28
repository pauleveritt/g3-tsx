import { expect, test } from "vitest";

import { Data, render } from "./index.11ty";

test("Foo", () => {
  const data: Data = {
    siteTitle: "Hello TSX!",
  };
  const result = render(data);
  expect(result).to.contain("Hello TSX");
});
