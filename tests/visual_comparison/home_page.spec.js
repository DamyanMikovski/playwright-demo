import {expect, test} from "@playwright/test"
import { screenshotHelper } from "../../utils/screenshotsHelper"

test.only("Art page-visual", async({page}) => {
    await page.goto("/")
    
    await screenshotHelper(page, "testScreenshot");
    await expect(page).toHaveScreenshot("testScreenshot.png");
})

test("Art page-visual-Full-Page", async({page}) => {
    await page.goto("/")
    await expect(page).toHaveScreenshot("ArtPageFulPage.png", 
    {fullPage : true})
})

test("Negative-Art page-visual", async({page}) => {
    await page.goto("/")
    await expect(page).toHaveScreenshot("ArtPageFulPage.png")
})
// playwright-demo\tests\visual_comparison\home_page.spec.js-snapshots
// playwright-demo\home_page.spec.js-snapshots
