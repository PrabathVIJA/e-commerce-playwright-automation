import { Page } from "@playwright/test";
export class HomePageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async getTitle() {
    return this.page.title();
  }
}
