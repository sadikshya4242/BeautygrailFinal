import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import type { CustomWorld } from '../../support/world';
import { CMSLoginPage } from '../../locators/cmsloginPage';
import { TutorialPage } from '../../locators/cmsaddtutorialsPage';
import { expect } from '@playwright/test';

setDefaultTimeout(120 * 1000); 

let loginPage: CMSLoginPage;
let tutorialPage: TutorialPage;

// Background login
Given('I am logged in as a CMS', async function (this: CustomWorld) {
  console.log('Step: Logging in as CMS admin...');
  loginPage = new CMSLoginPage(this.page);
  tutorialPage = new TutorialPage(this.page);

  await loginPage.goto();
  await loginPage.login('sadikshya.bhusal@ebpearls.com', 'Sadikshya@123');

  console.log('Step completed: Logged in');
});

// Navigate to Tutorials page
Given('I navigate to the Tutorials page', async function () {
  console.log('Step: Navigating to Tutorials page...');
  await tutorialPage.gotoTutorials();
  await tutorialPage.page.waitForSelector('h2', { timeout: 10000 });
  console.log('Step completed: Tutorials page loaded');
});

// Click Add new
When('I click on "Add new" tutorial', async function () {
  console.log('Step: Clicking Add new tutorial...');
  await tutorialPage.clickAddNew();
  await tutorialPage.page.waitForSelector('h2', { timeout: 10000 });
  console.log('Step completed: Add new clicked');
});

// Fill tutorial form
When(
  'I enter tutorial name {string}, description {string}, educator {string}, category {string}, and rich text {string}',
  async function (
    this: CustomWorld,
    name: string,
    description: string,
    educator: string,
    category: string,
    richText: string
  ) {
    console.log(`Step: Filling tutorial form with name: ${name}`);
    await tutorialPage.fillTutorialForm(name, description, educator, category, richText);
    console.log('Step completed: Tutorial form filled');
  }
);

// Upload cover picture
When('I upload a cover picture {string}', async function (this: CustomWorld, filePath: string) {
  console.log(`Step: Uploading cover picture: ${filePath}`);
  await tutorialPage.uploadCoverPicture(filePath);
  await tutorialPage.page.waitForTimeout(1000); 
  console.log('Step completed: Cover picture uploaded');
});

// Upload PDF
When('I upload a tutorial PDF {string}', async function (this: CustomWorld, filePath: string) {
  console.log(`Step: Uploading PDF: ${filePath}`);
  await tutorialPage.uploadPdf(filePath);
  console.log('Step completed: PDF uploaded');
});

// Submit tutorial
When('I submit the tutorial', async function () {
  console.log('Step: Submitting tutorial...');
  await tutorialPage.submitTutorial();
  await tutorialPage.page.waitForSelector('tbody >> tr', { timeout: 15000 }); 
  console.log('Step completed: Tutorial submitted');
});

// Verify tutorial visible
Then('I should see the new tutorial {string} in the tutorials list', async function (this: CustomWorld, tutorialName: string) {
  console.log(`Step: Verifying tutorial "${tutorialName}" in list...`);
  const tutorialRow = tutorialPage.page.locator('tbody >> tr', { hasText: tutorialName });
  await tutorialRow.waitFor({ state: 'visible', timeout: 20000 }); 
  await expect(tutorialRow).toBeVisible();
  console.log('Step completed: Tutorial is visible in the list');
});
