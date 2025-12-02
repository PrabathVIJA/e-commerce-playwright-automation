import { Page, expect } from "@playwright/test";
export class UIUtils {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async selectDropDownByValue(locator: string, option: string) {
    await this.page.pause();
    const dropDown = this.page.locator(locator);
    await dropDown.selectOption(option);
    await expect(dropDown).toHaveValue(option);
  }
}
