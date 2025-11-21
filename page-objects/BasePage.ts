import { Page } from "@playwright/test";
export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisible(locator: string, timeout = 6000) {
    await this.page
      .locator(locator)
      .waitFor({ state: "visible", timeout: timeout });
  }
}
