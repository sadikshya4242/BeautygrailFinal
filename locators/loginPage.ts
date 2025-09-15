import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly form: Locator;
  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Input field for Email
    this.emailInput = page.getByRole('textbox', { name: 'Email' }); // Add your locator here

    // Input field for Password
    this.passwordInput = page.getByRole('textbox', { name: 'Password' }); // Add your locator here

    // Sign in button
    this.loginButton = page.getByRole('button', { name: 'Sign in now' }); // Add your locator here

    // Form container
    this.form = page.locator('form'); // Add your locator here

    // Banner containing username after login
    this.banner = page.getByRole('banner'); // Add your locator here
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    // Navigate to the main UAT URL
    await this.page.goto('https://uat-webapp.beautygrail.co/');

    // Click the LOGIN link to open the login form
    await this.page.getByRole('link', { name: 'LOGIN' }).click();
  }

  /**
   * Perform login with given email and password
   * @param email - User email
   * @param password - User password
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
