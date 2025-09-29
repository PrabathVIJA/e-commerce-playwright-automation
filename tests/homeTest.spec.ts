import { test, expect } from "@playwright/test";
import { PageManager } from "../managers/PageManager";

test.beforeEach("launch the page", async ({ page }) => {
  await page.goto("https://askomdch.com/");
});

test("validate title", async ({ page }) => {
  const pm = new PageManager(page);
  const home = pm.homePage();
  const title = await home.getTitle();
  expect(title).toEqual("AskOmDch – Become a Selenium automation expert!");
});
