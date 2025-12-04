import { Page, expect } from "@playwright/test";
export class UIUtils {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async selectDropDownByValue(locator: string, option: string) {
    const dropDown = this.page.locator(locator);
    try {
      await dropDown.selectOption(option);
      await expect(dropDown).toHaveValue(option);
    } catch (e) {
      throw new Error(`Failed to click ${option} from dropdown ${e}`);
    }
  }
}
