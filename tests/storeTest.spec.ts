import { test } from "@playwright/test";
test("go there", async ({ page }) => {
  await page.goto("https://askomdch.com/");
  await page.getByText("Store").first().click();
});
