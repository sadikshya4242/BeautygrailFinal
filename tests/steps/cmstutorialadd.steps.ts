import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import type { CustomWorld } from '../../support/world';
import { CMSLoginPage } from '../../locators/cmsloginPage';
import { TutorialPage } from '../../locators/cmsaddtutorialsPage';
import { expect } from '@playwright/test';
import path from 'path/win32';

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
Given('I navigate to the Tutorials page for adding a new tutorial', async function () {
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
  console.log('Step completed: Cover picture uploaded');
});

// Upload PDF

When('I upload a tutorial PDF {string}', async function (fileName: string) {
  // Get absolute path to the PDF
  const pdfPath = path.resolve('BDD/Images', fileName); 
  console.log(`Uploading PDF: ${pdfPath}`);

  // Call your page object function
  await tutorialPage.uploadPdf(pdfPath);

  console.log('PDF uploaded successfully');
});


// Submit tutorial
When('I submit the tutorial {string}', async function (tutorialName: string) {
  console.log(`Step: Submitting tutorial "${tutorialName}"...`);
  await tutorialPage.submitTutorial(tutorialName);
  console.log('Step completed: Tutorial submitted');
});

// Verify tutorial visible

Then('I should see the new tutorial {string} in the tutorials list', async function (tutorialName: string) {
  console.log(`Verifying tutorial "${tutorialName}" in the list...`);

  const rows = tutorialPage.page.locator('tbody >> tr');
  await rows.first().waitFor({ state: 'visible', timeout: 20000 }); 

  const rowCount = await rows.count();
  if (rowCount === 0) throw new Error(' No tutorials found in the list');

  // Pick the last row (most recent)
  const latestRow = rows.nth(rowCount - 1);
  const latestRowText = await latestRow.textContent();

  console.log(`Latest tutorial row text: ${latestRowText}`);

  // Check that the latest row contains the tutorial name
  await expect(latestRow).toContainText(tutorialName);

  console.log(`Tutorial "${tutorialName}" is visible in the list`);
});

