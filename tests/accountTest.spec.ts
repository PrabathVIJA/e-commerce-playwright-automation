import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";
import { HomePageObjects } from "../page-objects/HomePageObjects";
import { AccountPageObject } from "../page-objects/AccountPageObject";
import fs from "fs";
const data = JSON.parse(
  fs.readFileSync("./data/userCredentials.json", "utf-8")
);
test.describe("Account Page tests", async () => {
  let pageManager: PageManager;
  let homePage: HomePageObjects;
  let accountPage: AccountPageObject;
  test.beforeEach("launch page and go to accounts page", async ({ page }) => {
    pageManager = new PageManager(page);
    homePage = pageManager.homePage();
    await homePage.goto();
    accountPage = pageManager.accountPage();
    await accountPage.clickAccount();
  });
  test("validating Account text", async () => {
    await accountPage.validateAccountPage();
  });

  test("Login with valid details", async () => {
    const username = data.credentials[0].userName;
    const password = data.credentials[0].password;
    await accountPage.validateUserlogin(username, password);
    expect(await accountPage.getHelloText()).toContain("Hello");
    await accountPage.logOut();
    await accountPage.validateAccountPage();
  });
  // test("test without login", async () => {
  //   test.use();
  // });
});
