import { Page, Locator, expect } from '@playwright/test';

export class CMSLoginPage {
  readonly page: Page;

  // Locators
  readonly emailInput: Locator;              // Email field
  readonly passwordInput: Locator;           // Password field
  readonly signInButton: Locator;            // "Sign in now" button
  readonly dashboardText: Locator;           // Dashboard visible after login

  readonly emailError: Locator;              // Invalid email error
  readonly emailRequiredError: Locator;      // Email required error
  readonly passwordRequiredError: Locator;   // Password required error
  readonly invalidCredentialsError: Locator; // Wrong credentials error

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.emailInput = page.getByRole('textbox', { name: 'Email' });           // Add your locator here
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });     // Add your locator here
    this.signInButton = page.getByRole('button', { name: 'Sign in now' });    // Add your locator here

    // Success
    this.dashboardText = page.getByText('Dashboard');                         // Add your locator here

    // Error messages
    this.emailError = page.getByText("Email must be a valid email");   
    this.emailRequiredError = page.getByText("Email is a required field");
    this.passwordRequiredError = page.getByText("Password is a required field");
    this.invalidCredentialsError = page.locator(`//div[contains(@class, 'MuiAlert-message css-1xsto0d') and text()="Username or Password doesn't match"]`).first();


  }

  // Navigate to CMS login page
  async goto(url: string = 'https://uat-cms.beautygrail.co/') {
    await this.page.goto(url);
  }

  // Fill login form
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
  

  // Validate successful login
  async validateLogin() {
    await expect(this.page).toHaveURL('https://uat-cms.beautygrail.co/', { timeout: 15000 });
   
  }

  // Validate error states
  async validateInvalidEmailError() {
    await expect(this.emailError).toBeVisible();
  }

  async validateEmptyFieldErrors() {
    await expect(this.emailRequiredError).toBeVisible();
    await expect(this.passwordRequiredError).toBeVisible();
  }

  async validateInvalidCredentialsError() {
    await expect(this.invalidCredentialsError).toBeVisible();
  }
}