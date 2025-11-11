import { expect, Page } from "@playwright/test";
export class AccountPageObject {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickAccount() {
    this.page.locator("#ast-hf-menu-1 li").nth(5).click();
  }

  async validateAccountPage() {
    const heading = this.page.locator("h1").filter({ hasText: "Account" });
    await heading.waitFor({ state: "visible", timeout: 5000 });
    const headingText = await heading.textContent();

    expect(headingText).toBe("Account");
  }
}
