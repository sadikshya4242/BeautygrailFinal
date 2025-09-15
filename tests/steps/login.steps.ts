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

When('I login with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  await loginPage.login(email, password);
});

Then('I should see an error message {string}', async function (this: CustomWorld, message: string) {
 const errorMessage = this.page.locator(`div.MuiAlert-message:has-text("${message}")`);
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});

Then('I should see a success alert {string}', async function (this: CustomWorld, message: string) {
  const alert = this.page.getByRole('alert', { name: message });
  await expect(alert).toBeVisible();
  await this.page.screenshot({ path: './Screenshots/successmessage.png' });
});

Then('I should see my username {string}', async function (this: CustomWorld, username: string) {
  await expect(loginPage.banner).toContainText(username);
  await this.page.screenshot({ path: './Screenshots/username.png' });
});
