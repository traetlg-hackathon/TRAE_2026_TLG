import { expect, test } from "@playwright/test";

test("creates all scene videos and controls preview scenes", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /extract replay data/i }).click();
  await expect(page.getByText("Refined Replay Data")).toBeVisible();

  await page.getByRole("button", { name: /generate storyboard/i }).click();
  await expect(page.getByText("Live Replay Preview")).toBeVisible();
  await expect(page.getByText(/Scene 1 \/ 5:/).first()).toBeVisible();

  await page.getByRole("button", { name: "Preview create video" }).click();
  await expect(page.getByText(/Queued 5 scenes at 10s each/)).toBeVisible();
  await expect(page.getByText(/Scene 1\/5 ready:/)).toBeVisible();
  await expect(page.getByText(/Scene 5\/5 ready:/)).toBeVisible();
  await expect(page.getByText(/All scenes rendered/)).toBeVisible();
  await expect(page.locator("video")).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("src", /flower\.mp4/);

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
});
