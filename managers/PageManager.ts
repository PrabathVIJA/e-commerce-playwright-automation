import { Page } from "@playwright/test";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
import { CartPageObjects } from "../page-objects/CartPageObject";
export class PageManager {
  readonly page: Page;
  readonly home: HomePageObjects;
  readonly store: StorePageObjects;
  readonly cart: CartPageObjects;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePageObjects(this.page);
    this.store = new StorePageObjects(this.page);
    this.cart = new CartPageObjects(this.page);
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
}
