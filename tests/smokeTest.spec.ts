import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { CheckoutPageObjects } from "../page-objects/CheckoutPageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";

test.describe("smoketests", () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  let storePage: StorePageObjects;
  let checkOutPage: CheckoutPageObjects;

  test("smoke flow", async ({ page }) => {
    console.log("hii");

    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title).toBe("AskOmDch – Become a Selenium automation expert!");
    storePage = pageManager.storePage();
    await storePage.clickStore();
    await storePage.searchProductField("Shoes");
    await storePage.clickSearch();
    await storePage.dynamicAddToCart("Blue Shoes");
    await storePage.hoverOverCartAndCheckOut();
    checkOutPage = pageManager.checkOutPage();
    expect(page).toHaveURL("/checkout/");
  });
});
