import { expect, Page } from "@playwright/test";
export class AccountPageObject {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
