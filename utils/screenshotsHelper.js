export const screenshotHelper = async (page, screenshotName) => {
    const filePathPrefix = "tests/visual_comparison/home_page.spec.js-snapshots/";
  
    const generateScreenshotPath = (filePath) => {
      return `${filePathPrefix}${filePath}`;
    };
  
    await page.goto("/");
    await page.screenshot({ path: generateScreenshotPath(`${screenshotName}-chromium-win32.png`) });
  };