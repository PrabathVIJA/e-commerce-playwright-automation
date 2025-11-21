import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class AccountPageObject extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickAccount() {
    await this.page.locator("#ast-hf-menu-1 li").nth(5).click();
  }

  async validateAccountPage() {
    const heading = this.page.locator("h1").filter({ hasText: "Account" });
    await heading.waitFor({ state: "visible", timeout: 5000 });
    const headingText = await heading.textContent();

    expect(headingText).toBe("Account");
  }
  async userName(userName: string) {
    return this.page.getByLabel("username").fill(userName);
  }

  async password(password: string) {
    return this.page.getByLabel("password").fill(password);
  }
  async loginBtn() {
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  async validateUserlogin(userName: string, password: string) {
    await this.userName(userName);
    await this.password(password);
    await this.loginBtn();
  }
}
