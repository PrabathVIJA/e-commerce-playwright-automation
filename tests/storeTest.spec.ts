import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
import { OrderBy } from "../enums/OrderBy";

import orderData from "../data/orderData.json";
import { CartPageObjects } from "../page-objects/CartPageObject";
import productData from "../data/products.json";

import { CheckoutPageObjects } from "../page-objects/CheckoutPageObjects";
import { AccountPageObject } from "../page-objects/AccountPageObject";
import { UIUtils } from "../helpers/uiUtils";
import { OrderByDropdownValues } from "../enums/OrderByDropdownValues";
import fs from "fs";
const userData = JSON.parse(
  fs.readFileSync("./data/userCredentials.json", "utf-8")
);

test.describe("store Page tests", () => {
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
  let ui: UIUtils;

  test.beforeEach("launch the page", async ({ page }) => {
    ui = new UIUtils(page);
    pm = new PageManager(page);
    homePage = pm.homePage();
    await homePage.goto();
    storePage = pm.storePage();
    await storePage.clickStore();
    cartPage = pm.cartPage();
    checkOutPage = pm.checkOutPage();
  });

  test("updates cart quantity and navigates to checkout", async () => {
    const quantity = 3;
    const data = orderData.orders[0];
    await storePage.searchItemAndAddToCart(data.product);
    await storePage.hoverOverCartAndClickCart();
    await cartPage.updateQuantityField(quantity);
    await cartPage.updateCart();
    await cartPage.waitForOverlayToDisappear();
    await cartPage.proceedToCheckOut();
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

    expect(modeOfPayment).toContain(data.expectedText);
  });

  test("select All items on Both Pages and checkout", async () => {
    const data = orderData.orders[0];
    const totalCartCount = 13;
    await storePage.allItemsToCart();
    await storePage.goToNextPage();
    await storePage.allItemsToCart();
    await storePage.hoverOverCartAndCheckOut();

    await storePage.waitForCartCount(totalCartCount);

    await checkOutPage.fillCheckoutDetails(
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
  });

  test("Login with valid credentials in check out page and make an order", async () => {
    const data = orderData.orders[0];
    await storePage.searchItemAndAddToCart(data.product);
    await storePage.hoverOverCartAndCheckOut();
    await checkOutPage.clickHereToLoginBtn();
    await checkOutPage.enterUsernameOrEmail("kiran");
    await checkOutPage.enterPassword("kiran1993");

    await checkOutPage.clickLoginBtn();
    await checkOutPage.fillCheckoutDetails(
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
  });
  for (const [index, product] of productData.products.entries())
    test(`should add a product to the cart dynamically based on product name, the current product is ${product}`, async () => {
      const data = orderData.orders[0];
      if (index >= 8) {
        await storePage.goToNextPage();
      }
      await storePage.dynamicAddToCart(product);
      await storePage.hoverOverCartAndCheckOut();

      await checkOutPage.fillCheckoutDetails(
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
      const confirmationText = await checkOutPage.orderConfirmationText();
      expect(confirmationText).toBe("Thank you. Your order has been received.");
    });

  test("positive flow through selection option from category dropdown", async () => {
    const {
      product,
      firstName,
      lastName,
      company,
      address,
      addressTwo,
      townOrCity,
      postalCode,
      email,
      payment,
      expectedText,
    } = orderData.orders[0];
    const item = productData.products[1];
    // await storePage.categoryDropdown("men");
    await ui.selectDropDownByValue("#product_cat", "men");
    await storePage.dynamicAddToCart(item);
    await storePage.hoverOverCartAndCheckOut();
    const modeOfPayment = await checkOutPage.fillCheckoutDetails(
      firstName,
      lastName,
      company,
      address,
      addressTwo,
      townOrCity,
      postalCode,
      email
    );
    expect(modeOfPayment).toContain(expectedText);
  });

  test("positive flow through selection option from Sort dropdown", async () => {
    const {
      product,
      firstName,
      lastName,
      company,
      address,
      addressTwo,
      townOrCity,
      postalCode,
      email,
      payment,
      expectedText,
    } = orderData.orders[0];
    const item = productData.products[1];
    await ui.selectDropDownByValue(
      ".orderby",
      OrderByDropdownValues.POPULARITY
    );
    await storePage.dynamicAddToCart(item);
    await storePage.hoverOverCartAndCheckOut();
    const modeOfPayment = await checkOutPage.fillCheckoutDetails(
      firstName,
      lastName,
      company,
      address,
      addressTwo,
      townOrCity,
      postalCode,
      email
    );
    expect(modeOfPayment).toContain(expectedText);
  });
});

test.describe("login from account page and make payment", async () => {
  let pm: PageManager;
  let homePage: HomePageObjects;
  let storePage: StorePageObjects;
  let cartPage: CartPageObjects;
  let checkOutPage: CheckoutPageObjects;
  let accountPage: AccountPageObject;
  test.beforeEach("launching and going to accountpage", async ({ page }) => {
    pm = new PageManager(page);
    homePage = pm.homePage();
    await homePage.goto();
    storePage = pm.storePage();
    accountPage = pm.accountPage();
    cartPage = pm.cartPage();
    checkOutPage = pm.checkOutPage();
    accountPage.clickAccount();
  });
  test("login from account page and make an order", async () => {
    const data = orderData.orders[0];
    const username = userData.credentials[0].userName;
    const password = userData.credentials[0].password;
    await accountPage.validateUserlogin(username, password);
    expect(await accountPage.getHelloText()).toContain("Hello");
    await storePage.clickStore();
    await storePage.searchItemAndAddToCart(data.product);
    await storePage.hoverOverCartAndCheckOut();
    await checkOutPage.fillCheckoutDetails(
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
  });
});
