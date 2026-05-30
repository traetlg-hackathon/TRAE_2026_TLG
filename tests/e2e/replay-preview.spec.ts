import { expect, test } from "@playwright/test";

test("creates all scene videos and controls preview scenes", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /extract replay data/i }).click();
  await expect(page.getByText("Refined Replay Data")).toBeVisible();

  await page.getByRole("button", { name: /generate storyboard/i }).click();
  await expect(page.getByText("Live Replay Preview")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Storyboard Editor" })).toBeVisible();
  await expect(page.getByText("Readable scene list. Select a scene, then edit details in Scene Controls.")).toBeVisible();
  await expect(page.getByText("10s each / 50s total")).toBeVisible();
  await expect(page.getByText(/Scene 1 \/ 5:/).first()).toBeVisible();

  await page.getByRole("button", { name: "Preview create video" }).click();
  await expect(page.getByText(/Queued 5 scenes at 10s each/)).toBeVisible();
  await expect(page.getByText(/Scene 1\/5 ready:/)).toBeVisible();
  await expect(page.getByText(/Scene 5\/5 ready:/)).toBeVisible();
  await expect(page.getByText(/All scenes rendered/)).toBeVisible();
  await expect(page.locator("video")).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("src", /flower\.mp4/);
  await expect(page.getByRole("link", { name: "Download video" })).toHaveAttribute(
    "href",
    /\/api\/video-download\?url=.*flower\.mp4/,
  );

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download video" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^duelcut-scene-1-.*\.mp4$/);

  const video = page.locator("video");
  await video.evaluate((node: HTMLVideoElement) => node.pause());
  await page.getByRole("button", { name: "Preview play video" }).click();
  await expect.poll(async () => video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(false);

  await page.getByRole("button", { name: "Preview next scene" }).click();
  await expect(page.getByText(/Scene 2 \/ 5:/).first()).toBeVisible();
  await expect(page.locator("video")).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("src", /flower\.mp4/);

  await page.getByRole("button", { name: "Preview previous scene" }).click();
  await expect(page.getByText(/Scene 1 \/ 5:/).first()).toBeVisible();
  await expect(page.locator("video")).toBeVisible();

  await page.getByRole("button", { name: "Preview play video" }).click();
  await page.locator("video").evaluate((node: HTMLVideoElement) => node.dispatchEvent(new Event("ended", { bubbles: true })));
  await expect(page.getByText(/Scene 2 \/ 5:/).first()).toBeVisible();
});
