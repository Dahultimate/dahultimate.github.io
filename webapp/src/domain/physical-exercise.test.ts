import { describe, expect, it } from "vitest";
import { extractYouTubeVideoId } from "./physical-exercise";

describe("extractYouTubeVideoId", () => {
  it.each([
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtube.com/watch?v=dQw4w9WgXcQ&t=42s", "dQw4w9WgXcQ"],
    ["https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtu.be/dQw4w9WgXcQ?t=5", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/embed/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://m.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
  ])("reconnaît %s -> %s", (url, expected) => {
    expect(extractYouTubeVideoId(url)).toBe(expected);
  });

  it.each([
    ["https://vimeo.com/123456789"],
    ["https://example.com/video.mp4"],
    ["not a url"],
    ["https://www.youtube.com/"],
    ["https://www.youtube.com/watch"],
  ])("retourne null pour une source non intégrable : %s", (url) => {
    expect(extractYouTubeVideoId(url)).toBeNull();
  });
});
