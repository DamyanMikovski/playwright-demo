import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/get_login_token";
import { adminDetails } from "../data/userDetails.js";

test("My Account using cookie injection and mocking network request", async({page}) => {
    const loginToken = await getLoginToken(adminDetails.usermame,adminDetails.password)

    await page.route("**/api/user**", async (route, request) =>{
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "Playwright error from moking"}),
        })
    })
    //Inject the token into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    //await page.pause()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})
