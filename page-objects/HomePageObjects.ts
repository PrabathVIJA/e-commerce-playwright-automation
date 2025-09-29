import { test, Page } from "@playwright/test";
export class HomePageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async getTitle() {
    return await this.page.title();
  }
}
