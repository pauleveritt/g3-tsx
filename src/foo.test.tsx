import { expect, test } from "vitest";

import { render } from "./foo";

test("Foo", () => {
  const result = render();
  expect(result).to.contain("Hello TSX");
});
