import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
import { OrderBy } from "../enums/OrderBy";

import orderData from "../data/orderData.json";
import { CartPageObjects } from "../page-objects/CartPageObject";

import { CheckoutPageObjects } from "../page-objects/CheckoutPageObjects";

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

test.describe("order flow with COD or DIRECT Payment with Direct checkout", () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  let storePage: StorePageObjects;
  let checkOutPage: CheckoutPageObjects;
  test.beforeEach("launch the page", async ({ page }) => {
    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
    storePage = pageManager.storePage();
    await storePage.clickStore();
    checkOutPage = pageManager.checkOutPage();
  });

  for (const data of orderData.orders) {
    test(`place order using ${data.payment} payment type`, async () => {
      await storePage.searchItemAndAddToCart(data.product);
      await storePage.hoverOverCartAndCheckOut();
      const modeOfPayment = await checkOutPage.fillCheckoutDetails(
        data.firstName,
        data.lastName,
        data.company,
        data.address,
        data.addressTwo,
        data.townOrCity,
        data.postalCode,
        data.email,
        data.payment as "direct" | "cod"
      );

      console.log("hi");

      expect(modeOfPayment).toContain(data.expectedText);
    });
  }
});

test.describe("View cart and update quantity flow", () => {
  let pm: PageManager;
  let homePage: HomePageObjects;
  let storePage: StorePageObjects;
  let cartPage: CartPageObjects;
  let checkOutPage: CheckoutPageObjects;
  test.beforeEach("launch the page", async ({ page }) => {
    pm = new PageManager(page);
    homePage = pm.homePage();
    await homePage.goto();
    storePage = pm.storePage();
    await storePage.clickStore();
    cartPage = pm.cartPage();
    checkOutPage = pm.checkOutPage();
  });

  test("update items in view cart and order", async () => {
    await storePage.searchItemAndAddToCart("Blue");
    await storePage.hoverOverCartAndClickCart();
    await cartPage.changeQuantityAndUpdate(3);
    await cartPage.getPriceBasedOnQuantity(3);
    const text = await cartPage.getTotalGeneratedBySystem();
    console.log(text);
  });
});
