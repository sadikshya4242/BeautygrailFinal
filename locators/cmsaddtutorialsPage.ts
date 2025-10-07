import { Page, expect } from '@playwright/test';

export class TutorialPage {
  readonly page: Page;

  // Locators
  readonly tutorialsTab: string;
  readonly addNewButton: string;
  readonly tutorialTitleInput: string;
  readonly educatorDropdown: string;
  readonly categoryDropdown: string;
  readonly descriptionInput: string;
  readonly richTextEditor: string;
  readonly coverPictureInput: string;
  readonly cropperFace: string;
  readonly cropButton: string;
  readonly pdfUploadInput: string;
  readonly submitButton: string;
  readonly tutorialsTable: string;

  constructor(page: Page) {
    this.page = page;

    // Sidebar / navigation
    this.tutorialsTab = 'theme-icon Tutorials';
    this.addNewButton = 'Add new';

    // Form fields
    this.tutorialTitleInput = 'Enter tutorial name';
    this.educatorDropdown = 'Search educators...';
    this.categoryDropdown = 'Search and select categories';
    this.descriptionInput = 'Enter description...';
    this.richTextEditor = '.ql-editor';

    // File uploads
    this.coverPictureInput = 'Add cover picture';
    this.cropperFace = '.cropper-face';
    this.cropButton = 'Crop';
    this.pdfUploadInput = 'input[type="file"]#sections\\.0\\.files\\.0\\.fileUpload';

    // Actions
    this.submitButton = 'Create Tutorial';

    // Table
    this.tutorialsTable = 'tbody';
  }

  // Navigate to Tutorials tab
  async gotoTutorials() {
    await this.page.getByRole('link', { name: this.tutorialsTab }).click();
    await expect(this.page.getByRole('link', { name: this.addNewButton })).toBeVisible();
  }

  // Add new tutorial
  async addNewTutorial(name: string, description: string) {
    await this.page.getByRole('link', { name: this.addNewButton }).click();
    await expect(this.page.locator('h2')).toContainText('Add new tutorial');

    await this.page.getByRole('textbox', { name: this.tutorialTitleInput }).fill(name);
    await this.page.getByRole('combobox', { name: this.educatorDropdown }).click();
    await this.page.getByRole('option', { name: 'Test Test' }).click();
    await this.page.getByRole('combobox', { name: this.categoryDropdown }).click();
    await this.page.getByRole('option', { name: 'Styling' }).click();
    await this.page.getByRole('textbox', { name: this.descriptionInput }).fill(description);
    await this.page.locator(this.richTextEditor).fill('dsdsdddf ');
  }

  // Upload cover picture
  async uploadCoverPicture(filePath: string) {
    await this.page.getByLabel(this.coverPictureInput).setInputFiles(filePath);
    await this.page.locator(this.cropperFace).click();
    await this.page.getByRole('button', { name: this.cropButton }).click();
  }

  // Upload PDF file
  async uploadPdf(filePath: string) {
    await this.page.locator(this.pdfUploadInput).setInputFiles(filePath);
  }

  // Submit tutorial
  async submitTutorial() {
    await this.page.getByRole('button', { name: this.submitButton }).click();
    await this.page.goto('https://uat-cms.beautygrail.co/tutorials');
    await expect(this.page.locator(this.tutorialsTable)).toContainText('New tutorials');
  }
}
