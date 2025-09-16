import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../locators/loginPage';
import { CustomWorld } from '../../support/world';

let loginPage: LoginPage;

Given('I navigate to the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('I enter {string} in the email field', async function (this: CustomWorld, email: string) {
  await loginPage.emailInput.fill(email);
});

When('I click on the password field', async function (this: CustomWorld) {
  await loginPage.passwordInput.click();
});
When('I click on the "Sign in" button without entering email and password', async function () {
 
  await loginPage.emptylogin();
});
When('I login with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  await loginPage.login(email, password);
});

Then('I should see an error message {string}', async function (expectedMessage: string) {
  const errorMessage = this.page.getByText(expectedMessage, { exact: true });
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});

Then('I should see an error message for empty fields', async function () {
  const emailError = await loginPage.getEmailRequiredError();
  expect(emailError).toContain('Email is required');

  const passwordError = await loginPage.getPasswordRequiredError();
  expect(passwordError).toContain('Password is required');
});
Then('I should be navigated to dashboard page', async function () {
  await expect(this.page!).toHaveURL('https://uat-webapp.beautygrail.co/dashboard');
});

Then('I should see my username {string}', async function (this: CustomWorld, username: string) {
  await expect(loginPage.banner).toContainText(username);
  await this.page.screenshot({ path: './Screenshots/username.png' });
});
