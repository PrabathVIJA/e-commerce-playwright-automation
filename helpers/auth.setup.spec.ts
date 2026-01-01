import { test, expect } from "@playwright/test";
test("login", async ({ page }) => {
  await page.goto("https://askomdch.com/account/");
  await page.fill("#username", "user");
  await page.fill("#password", "pass");
  await page.click("button[type=submit]");
  await page.context().storageState({ path: "auth.json" });
});
