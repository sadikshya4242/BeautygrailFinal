import { Page, expect } from '@playwright/test';

export class TutorialSearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  tutorialTab = "//a[contains(text(), 'Tutorials')]"; 
  searchByName = "//input[@placeholder='Search by name']"; 
  searchByEducator = "//input[@placeholder='Search by educator']"; 
  searchByCategory = "//input[@placeholder='Search by category']"; 
  tutorialRows = "tbody tr"; 

  async gotoTutorials() {
    await this.page.locator(this.tutorialTab).click();
    await this.page.waitForLoadState('networkidle');
  }

  
  async waitForTutorialsTable() {
    await this.page.waitForSelector(this.tutorialRows, { timeout: 10000 });
  }

  
  async searchTutorial(criteria: string, value: string) {
    switch (criteria.toLowerCase()) {
      case 'name':
        await this.page.fill(this.searchByName, value);
        break;
      case 'educator':
        await this.page.fill(this.searchByEducator, value);
        break;
      case 'category':
        await this.page.fill(this.searchByCategory, value);
        break;
      default:
        throw new Error(`Unknown search criteria: ${criteria}`);
    }

    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

 
  async verifySearchResults(value: string): Promise<boolean> {
    const rows = this.page.locator(this.tutorialRows);
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
    const text = await rows.allTextContents();
    return text.some((row) => row.includes(value));
  }
}

