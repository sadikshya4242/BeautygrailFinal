import { Page, expect } from '@playwright/test';
import path from 'path';

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

  // Rich text editor
  const editor = this.page.locator('div.ql-editor');
  await editor.click();
  await editor.type(richText); // <-- use type() instead of fill()
  await this.page.waitForTimeout(1000); // wait for 1 second to ensure text is entered
}


  // Upload cover picture
async uploadCoverPicture(filePath: string) {
  // Upload image
  await this.page.getByLabel('Add cover picture').setInputFiles(filePath);

  // Wait briefly for crop UI to appear
  await this.page.waitForTimeout(1000);

  const cropBtn = this.page.getByRole('button', { name: 'Crop' });
  await cropBtn.scrollIntoViewIfNeeded();

  if (await cropBtn.isVisible()) {
    console.log(' Crop button found, cropping image...');
    await this.page.locator('.cropper-face').click();
    await cropBtn.click();
  } else {
    console.log(' Crop button not found');
  }
}

//Upload PD and video
async uploadPdf(filePath: string, sectionName: string = 'Section 1', videoUrl: string = 'https://vimeo.com/1125786946?fl=wc') {
  // Expand section if needed
  const sectionButton = this.page.locator(
    `xpath=//div[normalize-space(text())='${sectionName}']//button[.//svg[@data-testid='ExpandMoreIcon']]`
  );
  if (await sectionButton.count() > 0) {
    await sectionButton.scrollIntoViewIfNeeded();
    await sectionButton.click();
  }

  // Wait for video input to appear
   const videoInput = this.page.locator(`xpath=//input[@name='sections.0.videoUrl' and @placeholder='Enter video URL']`);
   await videoInput.waitFor({ state: 'visible', timeout: 30000 });
   await videoInput.fill(videoUrl);
  console.log(`✅ Video URL entered: ${videoUrl}`);

  // Wait for a moment to ensure the video URL is processed
  await this.page.waitForTimeout(2000);       


  // Upload PDF
  // const pdfPath = path.resolve(filePath.replace(/\\/g, '/'));
  // const fileInput = this.page.locator('input[type="file"]#sections\\.0\\.files\\.0\\.fileUpload');
  // await fileInput.scrollIntoViewIfNeeded();
  // await fileInput.setInputFiles(pdfPath);

  // console.log(`✅ PDF uploaded successfully: ${pdfPath}`);
}


  // Submit tutorial
async submitTutorial(tutorialName: string) {
  // Click the submit button
  const submitBtn = this.page.getByRole('button', { name: 'Create Tutorial' });
  await submitBtn.waitFor({ state: 'visible', timeout: 30000 });
  await submitBtn.click();

  // Wait for tutorials page to load
  await this.page.waitForURL('**/tutorials');

  // Get the first row
  const firstRow = this.page.locator('tbody >> tr').first();

  // Wait until the first row is visible and has some text
  await firstRow.waitFor({ state: 'visible', timeout: 20000 });
  
  // Get the text content
  const rowText = await firstRow.textContent();
  if (!rowText) throw new Error('First row has no text');

  // Check if it contains the tutorial name
  if (!rowText.includes(tutorialName)) {
    throw new Error(`Tutorial "${tutorialName}" not found in the first row`);
  }

  console.log(`✅ Tutorial "${tutorialName}" is visible in the first row`);
}
}