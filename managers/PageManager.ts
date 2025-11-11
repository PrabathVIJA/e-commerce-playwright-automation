import { Page } from "@playwright/test";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
import { CartPageObjects } from "../page-objects/CartPageObject";
import { CheckoutPageObjects } from "../page-objects/CheckoutPageObjects";
import { AccountPageObject } from "../page-objects/AccountPageObject";
export class PageManager {
  readonly page: Page;
  readonly home: HomePageObjects;
  readonly store: StorePageObjects;
  readonly cart: CartPageObjects;
  readonly checkOut: CheckoutPageObjects;
  readonly account: AccountPageObject;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePageObjects(this.page);
    this.store = new StorePageObjects(this.page);
    this.cart = new CartPageObjects(this.page);
    this.checkOut = new CheckoutPageObjects(this.page);
    this.account = new AccountPageObject(this.page);
  }

  homePage() {
    return this.home;
  }

  storePage() {
    return this.store;
  }
  cartPage() {
    return this.cart;
  }
  checkOutPage() {
    return this.checkOut;
  }
  accountPage() {
    return this.account;
  }
}
