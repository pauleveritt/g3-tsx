import { vi } from "vitest";

// import Image from "@11ty/eleventy-img";
vi.mock("@11ty/eleventy-img", () => {
  const mockImage = vi.fn();
  // @ts-ignore
  mockImage.statsSync = vi.fn();
  // @ts-ignore
  mockImage.generateHTML = vi.fn();
  return {
    default: mockImage,
  };
});
