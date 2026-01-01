import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { AccountPageObject } from "../page-objects/AccountPageObject";

test.describe("Login test suite", async () => {
  test.use({ storageState: "auth.json" });
  let pageManager: PageManager;
  let account: AccountPageObject;
  test.beforeEach("Login", async ({ page }) => {
    pageManager = new PageManager(page);
    account = pageManager.accountPage();
    await page.goto("https://askomdch.com/account/");
  });
  test("validate home Page url", async ({ page }) => {
    expect.soft(await account.getHelloText()).toContain("Hello");

    await account.logOut();
  });
});
