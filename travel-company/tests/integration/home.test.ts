import { expect, test } from "@playwright/test";

test("Home Page Renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("logo")).toBeVisible();
});