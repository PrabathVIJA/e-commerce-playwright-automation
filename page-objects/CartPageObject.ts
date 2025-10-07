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

  async getPrice() {
    const price = this.page
      .locator("[class='woocommerce-Price-amount amount']")
      .first();
    const priceText = await price.textContent();
    return priceText ? parseFloat(priceText.replace("$", "")) : 0;
  }

  async getPriceBasedOnQuantity(quantity: number) {
    const price = await this.getPrice();
    const totalPrice = price * quantity;
    console.log(totalPrice);
    return totalPrice;
  }

  async updateCart() {
    const updateButton = this.page.getByRole("button", { name: "Update cart" });
    await updateButton.click();
  }

  async changeQuantityAndUpdate(quantity: number) {
    await this.quantityField(quantity);
    await this.updateCart();
  }

  async removeOverLay() {
    await this.page
      .locator(".blockOverlay")
      .nth(0)
      .waitFor({ state: "detached" });
  }

  async getTotalGeneratedBySystem() {
    await this.removeOverLay();
    const totalLocator = this.page.locator(".cart_totals .amount").first();
    totalLocator.waitFor({ state: "visible" });
    const totalPrice = await totalLocator.textContent();
    return totalPrice ? parseFloat(totalPrice.replace("$", "")) : 0;
  }
}
