import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
import { OrderBy } from "../enums/OrderBy";
import { describe } from "node:test";
import orderData from "../data/orderData.json";

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
  test("selecting single option from order by dropdown", async () => {
    const selectedOption = await storePage.selectOrderbyDropdownOption(
      OrderBy.PRICE_DESCENDING
    );
    expect(selectedOption).toBe(OrderBy.PRICE_DESCENDING);
  });

  test("selecting single option from category dropdown", async () => {
    await storePage.selectCategoryDropdownOption("Purses And Handbags  (1)");
  });
});

//describe for order flow

describe("order flow", () => {
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

  test("positive order flow", async () => {
    const data = orderData.order1;
    const confirmationText = await storePage.placeOrder(
      data.product,
      data.firstName,
      data.lastName,
      data.company,
      data.address,
      data.addressTwo,
      data.townOrCity,
      data.postalCode,
      data.email
    );

    expect(confirmationText).toContain(
      "Thank you. Your order has been received"
    );
  });
});
