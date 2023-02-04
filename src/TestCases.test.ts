import { expect, test } from "vitest";
import { ByText, makeDocument, Result, TestCases } from "./TestCases";

test("update document with content results", () => {
  const content = `<html lang="en"><head><title>Doc</title></head><body>x</body></html>`;
  const newDocument = makeDocument(content);
  expect(newDocument.body.innerText).to.equal("x");
});
test("run an assertion", () => {
  const newDocument = makeDocument(`<a href="/target">Target</a>`);
  const bt = new ByText({ role: "link", value: "Target" });
  expect(bt.assert(newDocument)).to.be.true;
});
test("run a test cases with no errors", () => {
  const bt = new ByText({ role: "link", value: "Target" });
  const tcs = new TestCases();

  tcs.add("/some-url", [bt]);
  const results: Result[] = [
    { url: "/some-url", content: `<a href="/target">Target</a>` },
  ];
  const logResults = tcs.validate(results);
  expect(logResults.length).to.equal(0);
});
test("run a test cases with errors", () => {
  const bt = new ByText({ role: "link", value: "XXX" });
  const tcs = new TestCases();

  tcs.add("/some-url", [bt]);
  const results: Result[] = [
    { url: "/some-url", content: `<a href="/target">Target</a>` },
  ];
  const logResults = tcs.validate(results);
  expect(logResults.length).to.equal(1);
});
