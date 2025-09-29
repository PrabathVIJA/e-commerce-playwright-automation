import { test, Page } from "@playwright/test";
import { HomePageObjects } from "../page-objects/HomePageObjects";
export class PageManager {
  readonly page: Page;
  readonly home: HomePageObjects;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePageObjects(this.page);
  }

  homePage() {
    return this.home;
  }
}
