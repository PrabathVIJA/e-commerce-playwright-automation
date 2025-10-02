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

    await inputField.fill("blue");
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
  async enterFirstName(firstName: string) {
    await this.page.locator("#billing_first_name").fill(firstName);
  }
  async enterLastName(lastName: string) {
    await this.page.locator("#billing_last_name").fill(lastName);
  }
  async enterCompanyName(company: string) {
    await this.page.locator("#billing_company").fill(company);
  }
  async enterStreetAddress(address: string) {
    await this.page
      .getByRole("textbox", { name: "Street address" })
      .fill(address);
  }
  async enterStreetAddressTwo(addressTwo: string) {
    await this.page.locator("#billing_address_2").fill(addressTwo);
  }
  async enterTownOrCity(city: string) {
    await this.page.locator("#billing_city").fill(city);
  }
  async enterPostalCode(postalCode: string) {
    await this.page.locator("#billing_postcode").fill(postalCode);
  }
  async enterEmail(email: string) {
    await this.page.locator("#billing_email").fill(email);
  }
  async placeOrderBtn() {
    await this.page.locator("#place_order").click();
  }
  async getOrderConfirmation() {
    return await this.page
      .locator(".woocommerce-thankyou-order-received")
      .textContent();
  }
  async placeOrder(
    product: string,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    addressTwo: string,
    townOrCity: string,
    postalCode: string,
    email: string
  ) {
    await this.searchProductField(product);
    await this.clickSearch();
    await this.addToCart();

    await this.hoverOverShoppingCart();
    await this.clickCheckout();

    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterCompanyName(company);
    await this.enterStreetAddress(address);
    await this.enterStreetAddressTwo(addressTwo);
    await this.enterTownOrCity(townOrCity);
    await this.enterPostalCode(postalCode);
    await this.enterEmail(email);
    await this.placeOrderBtn();

    return await this.getOrderConfirmation();
  }
}
