import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";

test.describe("Home Page tests", () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  test.beforeEach("launch the page", async ({ page }) => {
    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
  });

  test("validate title", async ({ page }) => {
    const title = await homePage.getTitle();
    expect(title).toBe("AskOmDch – Become a Selenium automation expert!");
  });
});
