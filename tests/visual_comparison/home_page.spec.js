import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../../utils/screenshotsHelper";
import { navigationBar } from "../../utils/locators/locatorsHelper";
import { urlPages } from "../../utils/pages-urls/urlHelper";

test.skip("Art page-visual", async ({ page }) => {
  const screenshotHelper = new ScreenshotHelper(page, urlPages.artPage);

  await screenshotHelper.takePageScreenshot("testScreenshot");
  await page.goto(urlPages.artPage);

  await expect(page).toHaveScreenshot("testScreenshot.png");
});

test.skip("Art page-visual-Full-Page", async ({ page }) => {
  const screenshotHelper = new ScreenshotHelper(page, urlPages.artPage);

  await screenshotHelper.takeFullScreenScreenshot("ArtFullPage");
  await page.goto(urlPages.artPage);
  await expect(page).toHaveScreenshot("ArtFullPage.png", {
    fullPage: true,
  });
});

test.skip("Verify BasketCounter element-visual", async ({ page }) => {
    const screenshotHelper = new ScreenshotHelper(page, urlPages.artPage);
    const basketCounterLocator = navigationBar.basketCounter;
  
    await screenshotHelper.takeScreenshotByLocator("BasketCounter", basketCounterLocator);
  
    await page.goto(urlPages.artPage);
    await expect(page.locator(basketCounterLocator)).toHaveScreenshot("BasketCounter.png");
  });

  test.skip("Verify BasketCounter full page page element-visual", async ({ page }) => {
    const screenshotHelper = new ScreenshotHelper(page, urlPages.artPage);
    const basketCounterLocator = navigationBar.basketCounter;
  
    await screenshotHelper.takeScreenshotByLocator("BasketCounter", basketCounterLocator);
  
    await page.goto(urlPages.artPage);
    await expect(page.locator(basketCounterLocator)).toHaveScreenshot("BasketCounter.png", {
        fullPage: true
    } );
  });

  test.skip("Verify Checkout-full-page-visual", async ({ page }) => {
    const screenshotHelper = new ScreenshotHelper(page, urlPages.checkoutPage);
  
    await screenshotHelper.takeFullScreenScreenshot
    ("Checkout-full-page");
  
    await page.goto(urlPages.checkoutPage);
    await expect(page).toHaveScreenshot("Checkout-full-page.png", {
        fullPage: true
    } );
  });

