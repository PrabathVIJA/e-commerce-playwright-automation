import { Page } from "@playwright/test";
export class CheckoutPageObjects {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //-->for user login
  async clickHereToLoginBtn() {
    await this.page.getByRole("link", { name: "Click here to login" }).click();
  }

  async enterUsernameOrEmail(value: string) {
    console.log(value);

    const inputfield = this.page.getByLabel("Username or email ");
    await inputfield.click();
    await this.page.keyboard.type(value, { delay: 50 });
  }
  async enterPassword(value: string) {
    const passwordField = this.page.getByRole("textbox", { name: "password" });
    await passwordField.click();
    await this.page.keyboard.type(value, { delay: 50 });
  }
  async clickRemembermeRadioBtn() {
    await this.page.getByLabel("Remember me").click();
  }
  async clickLoginBtn() {
    await this.page.locator(".woocommerce-form-login__submit").click();
    await this.page.waitForTimeout(6000);
  }
  //
  async enterFirstName(firstName: string) {
    await this.page.locator("#billing_first_name").fill(firstName);
  }
  async enterLastName(lastName: string) {
    await this.page.locator("#billing_last_name").fill(lastName);
  }
  async enterCompanyName(company: string) {
    await this.page.locator("#billing_company").fill(company);
  }
  //loop over country dropdown options -> will come back to this later
  async loopOverCountryDropdown() {
    const countrySelectionArrow = await this.page.locator(
      "#billing_country_field .woocommerce-input-wrapper .select2-selection__arrow"
    );
    await countrySelectionArrow.click();
    const countryDropdown = this.page.locator("#select2-billing_state-results");

    const countryOptions = countryDropdown.locator("li");

    const options = await countryOptions.allTextContents();

    console.log(options);

    for (const option of options) {
      console.log(option);

      await countryDropdown.selectOption({ label: option.trim() });
      await countrySelectionArrow.click();

      await this.page.waitForTimeout(500);
    }
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
  async orderConfirmationText() {
    return await this.page
      .locator("p.woocommerce-thankyou-order-received")
      .textContent();
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
