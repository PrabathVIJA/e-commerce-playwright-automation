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
    const selectedValue = await dropdown
      .locator("option:checked")
      .textContent();

    return selectedValue;
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

    await dropDown.scrollIntoViewIfNeeded();
    await dropDown.selectOption({ label: optionText });
    const selectedOption = await dropDown
      .locator("option:checked")
      .textContent();

    return selectedOption;
  }

  async loopCategoryDropdown() {
    const options = await this.getCategoryDropdownOptions();

    for (const option of options) {
      await this.selectCategoryDropdownOption(option);
    }
  }

  async searchProductField(item: string) {
    const inputField = this.page.locator("#woocommerce-product-search-field-0");

    await inputField.fill(item);
  }

  //add all items to cart
  async allItemsToCart() {
    const allItemsOnPage = this.page.locator(
      "div.ast-woocommerce-container a.add_to_cart_button"
    );
    const items = await allItemsOnPage.elementHandles();
    for (const item of items) {
      await item.click();
      await this.page.waitForTimeout(500);
    }
  }

  async getCountInCart() {
    const totalNoOfItemsinCart = await this.page
      .locator("div#ast-desktop-header .count")
      .textContent();

    return totalNoOfItemsinCart?.trim();
  }

  async goToNextPage() {
    await this.page.locator("a.next").click();
  }

  async clickSearch() {
    await this.page.getByRole("button", { name: "Search" }).click();
  }
  async addToCart() {
    await this.page
      .getByRole("link", {
        name: "Add “Blue Shoes” to your cart",
      })
      .click();
  }
  async hoverOverShoppingCart() {
    await this.page.locator(".cart-container .count").first().hover();
  }
  async clickCheckout() {
    await this.page.getByRole("link", { name: "Checkout" }).click();
  }
  async clickViewCart() {
    await this.page.getByRole("link", { name: "View cart" }).first().click();
  }

  async searchItemAndAddToCart(product: string) {
    await this.searchProductField(product);
    await this.clickSearch();
    await this.addToCart();
  }
  //for hovering over view cart and click checkout
  async hoverOverCartAndCheckOut() {
    await this.hoverOverShoppingCart();
    await this.clickCheckout();
  }
  //for hovering over view cart and click view cart
  async hoverOverCartAndClickCart() {
    await this.hoverOverShoppingCart();
    await this.clickViewCart();
  }
}
