import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../../utils/screenshotsHelper";
import { navigationBar } from "../../utils/locators/locatorsHelper";

test("Art page-visual", async ({ page }) => {
  const screenshotHelper = new ScreenshotHelper(page);
  
  await screenshotHelper.takePageScreenshot("testScreenshot");
  await page.goto("/");

  await expect(page).toHaveScreenshot("testScreenshot.png");
});

test("Art page-visual-Full-Page", async ({ page }) => {
  const screenshotHelper = new ScreenshotHelper(page);

  await screenshotHelper.takeFullScreenScreenshot("ArtFullPage");
  await page.goto("/");
  await expect(page).toHaveScreenshot("ArtFullPage.png", {
    fullPage: true,
  });
});

test("Verify BasketCounter element-visual", async ({ page }) => {
    const screenshotHelper = new ScreenshotHelper(page);
    const basketCounterLocator = navigationBar.basketCounter;
  
    await screenshotHelper.takeScreenshotByLocator("BasketCounter", basketCounterLocator);
  
    await page.goto("/");
    await expect(page.locator(basketCounterLocator)).toHaveScreenshot("BasketCounter.png");
  });

  test("Verify BasketCounter full page page element-visual", async ({ page }) => {
    const screenshotHelper = new ScreenshotHelper(page);
    const basketCounterLocator = navigationBar.basketCounter;
  
    await screenshotHelper.takeScreenshotByLocator("BasketCounter", basketCounterLocator);
  
    await page.goto("/");
    await expect(page.locator(basketCounterLocator)).toHaveScreenshot("BasketCounter.png", {
        fullPage: true
    } );
  });
