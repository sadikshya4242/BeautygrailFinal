import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from '../../support/world';
import { CMSLoginPage } from '../../locators/cmsloginPage';
import { TutorialSearchPage } from '../../locators/cmstutorialsearch.page';

setDefaultTimeout(60 * 1000);

let loginPage: CMSLoginPage;
let searchPage: TutorialSearchPage;


Given('I am logged in as an admin in CMS', async function (this: CustomWorld) {
  loginPage = new CMSLoginPage(this.page);
  searchPage = new TutorialSearchPage(this.page);

  await loginPage.goto();
  await loginPage.login('sadikshya.bhusal@ebpearls.com', 'Sadikshya@123');
  await this.page.waitForLoadState('networkidle');
});

Given('I navigate to the Tutorials page', async function () {
  await searchPage.gotoTutorials();
  await searchPage.waitForTutorialsTable();
});



When(
  'I search for tutorials by {string} with value {string}',
  async function (this: CustomWorld, criteria: string, value: string) {
    await searchPage.searchTutorial(criteria, value);
  }
);

Then(
  'I should see tutorials related to {string}',
  async function (this: CustomWorld, value: string) {
    const result = await searchPage.verifySearchResults(value);
    expect(result).toBeTruthy();
  }
);
