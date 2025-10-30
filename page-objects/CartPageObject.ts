import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class CartPageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async updateQuantityField(quantity: number): Promise<void> {
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

    return totalPrice;
  }

  async updateCart() {
    const updateButton = this.page.getByRole("button", { name: "Update cart" });
    const isDisabled = await updateButton.getAttribute("aria-disabled");

    if (isDisabled !== "true") {
      await updateButton.click();
    } else {
      await updateButton.click({ force: true });
    }
  }

  async waitForOverlayToDisappear() {
    await this.page
      .locator(".blockOverlay")
      .nth(0)
      .waitFor({ state: "detached" });
  }

  async getTotalGeneratedBySystem() {
    await this.waitForOverlayToDisappear();
    const totalLocator = this.page.locator(".cart_totals .amount").first();
    const updatedText = await this.getPriceBasedOnQuantity(3);
    const totalPrice = await totalLocator.textContent();

    return totalPrice ? parseFloat(totalPrice.replace("$", "")) : 0;
  }

  async proceedToCheckOut() {
    await this.page.locator(".wc-proceed-to-checkout").click();
  }
}
