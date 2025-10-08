import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { TutorialsVisibilityPage } from '../../locators/cmstutorialPage';

setDefaultTimeout(60 * 1000); // increase timeout to 60s for login and page load

let browser: Browser;
let page: Page;
let tutorialsPage: TutorialsVisibilityPage;

Given('I am logged in to the CMS with email {string} and password {string}', async function (email: string, password: string) {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto('https://uat-cms.beautygrail.co/');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in now' }).click();

  tutorialsPage = new TutorialsVisibilityPage(page);
});

When('I navigate to the Tutorials page for tutorialsvisibility', async function () {
  await tutorialsPage.navigateToTutorials();
});

Then('I should see the "Tutorials" heading', async function () {
  await expect(tutorialsPage.heading()).toBeVisible();
});

Then('I should see the "Search" textbox', async function () {
  await expect(tutorialsPage.searchBox()).toBeVisible();
});

Then('I should see the {string} button', async function (buttonName: string) {
  if (buttonName === 'Filter') await expect(tutorialsPage.filterBtn()).toBeVisible();
  if (buttonName === 'Add new') await expect(tutorialsPage.addNewBtn()).toBeVisible();
});

Then('I should see the tutorials list table', async function () {
  await expect(tutorialsPage.tutorialsTable()).toBeVisible();

}
)
