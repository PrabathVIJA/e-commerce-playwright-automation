import { Page } from "@playwright/test";
export class CheckoutPageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
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
  async cashOnDeliveryBtn() {
    await this.page.locator("#payment_method_cod").click();
  }

  async getModeOfPaymentText() {
    return await this.page.locator(".method strong").textContent();
  }
  //for filling input fields and returning text indicating mode of payment
  async fillCheckoutDetails(
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    addressTwo: string,
    townOrCity: string,
    postalCode: string,
    email: string,
    payment: "direct" | "cod" = "direct"
  ) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterCompanyName(company);
    await this.enterStreetAddress(address);
    await this.enterStreetAddressTwo(addressTwo);
    await this.enterTownOrCity(townOrCity);
    await this.enterPostalCode(postalCode);
    await this.enterEmail(email);

    if (payment === "cod") {
      await this.cashOnDeliveryBtn();
    }
    await this.placeOrderBtn();

    const text = await this.getModeOfPaymentText();
    if (!text) {
      throw new Error("Payment mode text not found!");
    }
    return text.trim();
  }
}
