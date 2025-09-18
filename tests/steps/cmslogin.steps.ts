import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CMSLoginPage } from '../../locators/cmsloginPage';
import type { CustomWorld } from '../../support/world';

let cmsLoginPage: CMSLoginPage;

Given('I navigate to the cms login page', async function (this: CustomWorld) {
  cmsLoginPage = new CMSLoginPage(this.page);
  await cmsLoginPage.goto();
});

// Invalid email
When('I enter {string} in the cms email field', async function (this: CustomWorld, email: string) {
  await cmsLoginPage.emailInput.fill("sadikshya");
});

When('I click on the cms password field', async function (this: CustomWorld) {
  await cmsLoginPage.passwordInput.click();
  });
Then('I should see a cms email error message {string}', async function (message: string) {
     const errorMessage = this.page.getByText(message, { exact: true });
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});



// Empty fields
When('I click on the {string} button on cms without entering email and password', async function (this: CustomWorld, btnName: string) {
  await cmsLoginPage.signInButton.click();
});

Then('I should see a cms error message for empty fields', async function () {
  await cmsLoginPage.validateEmptyFieldErrors();
});

// Invalid credentials
When('I login to cms with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  await cmsLoginPage.login("sadikshya.bhusal@ebpearls.com", "password");
});
Then('I should see a cms login error message {string}', async function (message: string) {
    await cmsLoginPage.validateInvalidCredentialsError();
 
});

// Valid login

Then('I should be navigated to the cms dashboard page', async function () {
  await cmsLoginPage.validateLogin();
});

