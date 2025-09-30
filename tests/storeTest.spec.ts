import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";

test.describe("store Page tests", () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  let storePage: StorePageObjects;
  test.beforeEach("launch the page", async ({ page }) => {
    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
    storePage = pageManager.storePage();
    await storePage.clickStore();
  });

  test("Store title validation", async () => {
    const title = await storePage.getTitle();
    expect(title).toBe("Products – AskOmDch");
  });
  test("select All orderBy dropdown options", async () => {
    await storePage.loopOrderbyDropdownOptions();
  });

  test("select all category dropdown options", async () => {
    await storePage.loopCategoryDropdown();
  });
  test("ssingle order by dropdown option", async () => {
    await storePage.selectOrderbyDropdownOption("Sort by average rating");
  });

  test("single category dropdown option", async () => {
    await storePage.selectCategoryDropdownOption("Purses And Handbags  (1)");
  });
});
