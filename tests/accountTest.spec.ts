import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { AccountPageObject } from "../page-objects/AccountPageObject";

test.describe("Account Page tests", async () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  let accountPage: AccountPageObject;
  test.beforeEach("launch page and go to accounts page", async ({ page }) => {
    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
    accountPage = pageManager.accountPage();
    await accountPage.clickAccount();
  });
  test("validating Account text", async () => {
    await accountPage.validateAccountPage();
  });
});
