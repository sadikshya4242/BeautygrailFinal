import { Page, expect } from '@playwright/test';

export class TutorialPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to Tutorials page
  async gotoTutorials() {
    await this.page.getByRole('link', { name: 'theme-icon Tutorials' }).click();
    await expect(this.page.getByRole('link', { name: 'Add new' })).toBeVisible();
  }

  // Click 'Add new' button
  async clickAddNew() {
    await this.page.getByRole('link', { name: 'Add new' }).click();
    await expect(this.page.locator('h2')).toContainText('Add new tutorial');
  }

  // Fill tutorial form
  async fillTutorialForm(name: string, description: string, educator: string, category: string, richText: string) {
    await this.page.getByRole('textbox', { name: 'Enter tutorial name' }).fill(name);
    await this.page.getByRole('combobox', { name: 'Search educators...' }).click();
    await this.page.getByRole('option', { name: educator }).click();
    await this.page.getByRole('combobox', { name: 'Search and select categories' }).click();
    await this.page.getByRole('option', { name: category }).click();
    await this.page.getByRole('textbox', { name: 'Enter description...' }).fill(description);
    await this.page.locator('.ql-editor').fill(richText);
  }

  // Upload cover picture
  async uploadCoverPicture(filePath: string) {
    await this.page.getByLabel('Add cover picture').setInputFiles(filePath);
    await this.page.locator('.cropper-face').click();
    await this.page.getByRole('button', { name: 'Crop' }).click();
  }

  // Upload PDF
  async uploadPdf(filePath: string) {
    await this.page
      .locator('input[type="file"]#sections\\.0\\.files\\.0\\.fileUpload')
      .setInputFiles(filePath);
  }

  // Submit tutorial
  async submitTutorial() {
    await this.page.getByRole('button', { name: 'Create Tutorial' }).click();
    await this.page.goto('https://uat-cms.beautygrail.co/tutorials');
    await expect(this.page.locator('tbody')).toContainText('New tutorials');
  }
}
