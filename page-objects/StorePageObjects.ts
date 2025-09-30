import { Page } from "@playwright/test";
export class StorePageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickStore() {
    await this.page
      .locator("[class='menu-link']")
      .getByText("Store")
      .nth(0)
      .click();
  }
  async getTitle() {
    return this.page.title();
  }
  async getOrderbyDropdownOptions() {
    const dropdown = this.page.locator(".orderby");
    return dropdown.locator("option").allTextContents();
  }

  async selectOrderbyDropdownOption(optionText: string) {
    const dropdown = this.page.locator(".orderby");
    await dropdown.selectOption({ label: optionText });
  }
  async loopOrderbyDropdownOptions() {
    const options = await this.getOrderbyDropdownOptions();
    for (const option of options) {
      await this.selectOrderbyDropdownOption(option);
    }
  }
  //methods dealing category dropdown
  async getCategoryDropdownOptions() {
    const dropDown = this.page.locator("#product_cat");
    return dropDown.locator("option").allTextContents();
  }

  async selectCategoryDropdownOption(optionText: string) {
    const dropDown = this.page.locator("#product_cat");
    console.log(optionText);

    await dropDown.scrollIntoViewIfNeeded();
    await dropDown.selectOption({ label: optionText });
  }

  async loopCategoryDropdown() {
    const options = await this.getCategoryDropdownOptions();

    for (const option of options) {
      await this.selectCategoryDropdownOption(option);
    }
  }
}
