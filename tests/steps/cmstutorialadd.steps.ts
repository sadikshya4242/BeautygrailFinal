import { Given, When, Then } from '@cucumber/cucumber';
import { TutorialPage } from '../../locators/cmsaddtutorialsPage';
import type { CustomWorld } from '../../support/world';
import { expect } from '@playwright/test';

let tutorialPage: TutorialPage;

Given('I navigate to the CMS tutorials page', async function (this: CustomWorld) {
  tutorialPage = new TutorialPage(this.page);
  await tutorialPage.gotoTutorials();
});

When('I click on "Add new" tutorial', async function () {
  await tutorialPage.page.getByRole('link', { name: tutorialPage.addNewButton }).click();
});

When(
  'I enter tutorial name {string} and description {string}',
  async function (this: CustomWorld, name: string, description: string) {
    await tutorialPage.addNewTutorial(name, description);
  }
);

When('I select educator {string}', async function (this: CustomWorld, educator: string) {
  await tutorialPage.page.getByRole('combobox', { name: tutorialPage.educatorDropdown }).click();
  await tutorialPage.page.getByRole('option', { name: educator }).click();
});

When('I select category {string}', async function (this: CustomWorld, category: string) {
  await tutorialPage.page.getByRole('combobox', { name: tutorialPage.categoryDropdown }).click();
  await tutorialPage.page.getByRole('option', { name: category }).click();
});

When('I enter rich text description {string}', async function (this: CustomWorld, text: string) {
  await tutorialPage.page.locator(tutorialPage.richTextEditor).fill(text);
});

When('I upload a cover picture {string}', async function (this: CustomWorld, filePath: string) {
  await tutorialPage.uploadCoverPicture(filePath);
});

When('I upload a tutorial PDF {string}', async function (this: CustomWorld, filePath: string) {
  await tutorialPage.uploadPdf(filePath);
});

When('I submit the tutorial', async function () {
  await tutorialPage.submitTutorial();
});

Then(
  'I should see the new tutorial {string} in the tutorials list',
  async function (this: CustomWorld, tutorialName: string) {
    await expect(tutorialPage.page.locator(tutorialPage.tutorialsTable)).toContainText(tutorialName);
  }
);
