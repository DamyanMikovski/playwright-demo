export class ScreenshotHelper {
  constructor(page) {
    this.page = page
    this.filePathPrefix = "tests/visual_comparison/home_page.spec.js-snapshots/"
    this.url = url
  }

  generateScreenshotPath(filePath) {
    return `${this.filePathPrefix}${filePath}`
  }

    async takePageScreenshot(screenshotName) {
    await this.page.goto("/")
    await this.page.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-chromium-win32.png`) })
  }

  async takeFullScreenScreenshot(screenshotName) {
    await this.page.goto("/")
    await this.page.screenshot({ path: this.generateScreenshotPath(`${screenshotName}-full-chromium-win32.png`),
     fullPage: true 
    })
  }
}