import {expect, test} from "@playwright/test"
import { ScreenshotHelper } from "../../utils/screenshotsHelper"


test("Art page-visual", async({page}) => {
    const screenshotHelper = new ScreenshotHelper(page);

    await screenshotHelper.takePageScreenshot("testScreenshot");
    await page.goto("/")
    
    await expect(page).toHaveScreenshot("testScreenshot.png");
})

test("Art page-visual-Full-Page", async({page}) => {
    const screenshotHelper = new ScreenshotHelper(page);

    await screenshotHelper.takeFullScreenScreenshot("ArtPageFulPage")
    await page.goto("/")
    await expect(page).toHaveScreenshot("ArtPageFulPage.png", 
    {fullPage : true})
})

test.skip("Negative-Art page-visual", async({page}) => {
    await page.goto("/")
    await expect(page).toHaveScreenshot("ArtPageFulPage.png")
})
