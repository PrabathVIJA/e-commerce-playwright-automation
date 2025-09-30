import { Page } from "@playwright/test";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { StorePageObjects } from "../page-objects/StorePageObjects";
export class PageManager {
  readonly page: Page;
  readonly home: HomePageObjects;
  readonly store: StorePageObjects;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePageObjects(this.page);
    this.store = new StorePageObjects(this.page);
  }

  homePage() {
    return this.home;
  }

  storePage() {
    return this.store;
  }
}
