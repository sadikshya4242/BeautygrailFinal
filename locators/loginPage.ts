import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidError: Locator;
  readonly invalidEmail:Locator;
  readonly emailRequiredError: Locator;
  readonly passwordRequiredError: Locator;


  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Email' });

    this.passwordInput = page.getByRole('textbox', { name: 'Password' }); 

    this.loginButton = page.getByRole('button', { name: 'Sign in now' }); 
   
    this.invalidError = page.locator('//div[contains(@class, "MuiAlert-message") and text()="Invalid login credentials"]'); 
    
    this.invalidEmail = page.locator('text=Must be a valid email');

    this.banner = page.getByRole('banner'); 

    this.emailRequiredError = page.locator('text=Email is required'); 

    this.passwordRequiredError = page.locator('text=Password is required'); 
  }


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
  async getEmailRequiredError() {
    return await this.emailRequiredError.textContent();
 }
 async getPasswordRequiredError() {
   return await this.passwordRequiredError.textContent();
}
 async emptylogin() {
    await this.emailInput.fill('');
    await this.passwordInput.fill('');
    await this.loginButton.click();
  }


}
