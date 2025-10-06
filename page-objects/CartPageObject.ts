import { Page } from "@playwright/test";
export class CartPageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async quantityField(quantity: number) {
    await this.page
      .locator(".quantity")
      .locator("[class='input-text qty text']")
      .fill(quantity.toString());
  }
}
