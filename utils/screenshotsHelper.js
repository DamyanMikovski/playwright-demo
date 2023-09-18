export class ScreenshotHelper {
  constructor(page) {
    this.page = page
    this.filePathPrefix = "tests/visual_comparison/home_page.spec.js-snapshots/"
  }

  generateScreenshotPath(filePath) {
    return `${this.filePathPrefix}${filePath}`
  }

    async takePageScreenshot(screenshotName) {
    await this.page.goto("/");
    await this.page.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-chromium-win32.png`) })
  }

    async takeFullScreenScreenshot(screenshotName) {
    await this.page.goto("/");
    await this.page.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-chromium-win32.png`),
     fullPage: true 
    })
  }

  async takeScreenshotByLocator(screenshotName, locator) {
    await this.page.goto("/");
    await this.page.waitForSelector(locator);
    const elementHandle = await this.page.locator(locator).first();
    if (!elementHandle) {
      throw new Error(`Element not found with locator: ${locator}`);
    }
  
    await elementHandle.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-chromium-win32.png`) });
  }
  
  async takeFullPageScreenshotByLocator(screenshotName, locator) {
    await this.page.goto("/");
    await this.page.waitForSelector(locator);
    const elementHandle = await this.page.locator(locator).first();
    if (!elementHandle) {
      throw new Error(`Element not found with locator: ${locator}`);
    }
  
    await elementHandle.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-chromium-win32.png`),
      fullPage: true
    });
  }
}