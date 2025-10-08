import { Page, expect } from '@playwright/test';

export class TutorialsVisibilityPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  tutorialsMenuBtn = () => this.page.getByRole('link', { name: 'theme-icon Tutorials' });
  heading = () => this.page.locator("//h2[text()='Tutorials']");
  searchBox = () => this.page.getByRole('textbox', { name: 'Search' });
  filterBtn = () => this.page.getByRole('button', { name: 'Filter' });
  addNewBtn = () => this.page.getByRole('link', { name: 'Add new' });
  tutorialsTable = () =>
    this.page.locator('#root div').filter({ hasText: 'Tutorial NameEducatorCategoriesLinkedStatus' }).first();

  // Navigate to Tutorials page
  async navigateToTutorials() {
    await this.tutorialsMenuBtn().click();
    await expect(this.heading()).toBeVisible();
    await expect(this.addNewBtn()).toBeVisible();
    await expect(this.searchBox()).toBeVisible();
    await expect(this.filterBtn()).toBeVisible();
    await expect(this.tutorialsTable()).toBeVisible();
  }
}
