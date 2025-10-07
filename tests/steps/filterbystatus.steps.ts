import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CMSLoginPage } from '../../locators/cmsloginPage';
import { TutorialPage } from '../../locators/cmsaddtutorialsPage';
import type { CustomWorld } from '../../support/world';

let loginPage: CMSLoginPage;
let tutorialsPage: TutorialPage;

Given('I am logged in as a CMS admin', async function (this: CustomWorld) {
  loginPage = new CMSLoginPage(this.page);
  tutorialsPage = new TutorialPage(this.page);

  await loginPage.goto();
  await loginPage.login('sadikshya.bhusal@ebpearls.com', 'Sadikshya@123');
});

Given('I navigate to the CMS tutorials page', async function () {
  await tutorialsPage.gotoTutorials();
});

When('I open the tutorials status filter dropdown', async function () {
  await this.page.getByRole('button', { name: 'Filter' }).click();
  await this.page.locator('//div[@id="status"]').click();
});

Then('I should see the following filter options:', async function (dataTable) {
  const expected = dataTable.raw().flat();
  const options = await this.page.locator('li[role="option"]').allTextContents();

  for (const value of expected) {
    expect(options).toContain(value);
  }
});

When('I apply the {string} status filter', async function (status: string) {
  await this.page.getByRole('button', { name: 'Filter' }).click();
  await this.page.locator('//div[@id="status"]').click();
  await this.page.locator(`//li[@role="option" and text()="${status}"]`).click();
  await this.page.getByRole('button', { name: 'Apply Filters' }).click();
});

Then('I should see only tutorials with status {string}', async function (status: string) {
  const statuses = await this.page.locator('//table//tbody//td[5]//span').allTextContents();
  for (const s of statuses) {
    expect(s).toBe(status.toUpperCase());
  }
});
