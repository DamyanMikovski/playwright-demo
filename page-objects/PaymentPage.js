import { expect } from "@playwright/test"
import { userPaymentDetails } from "../data/userPaymentDetails"
export class PaymentPage{
    constructor(page){
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')  
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]') 
        this.creditCardvalidDate = page.locator('[data-qa="valid-until"]') 
        this.creditCardCvc = page.locator('[data-qa="credit-card-cvc"]') 
        this.paymentButton = page.locator('[data-qa="pay-button"]')

    }

    activeDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        //Option 1 for laggy inputs: with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        //Option 2 for laggy input: slow typing
        //await this.discountInput.focus()
        //await this.page.keyboard.type(code, {delay: 1000})
        //expect(await this.discountInput.inputValue()).toBe(code)

        await (expect(this.discountActivatedMessage)).toBeHidden()
        await (expect(this.discountedValue)).toBeHidden()
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()

        await this.discountActivatedMessage.waitFor()
        expect(this.discountActivatedMessage).toBeVisible()

        await this.discountedValue.waitFor()
        const originalValueText = await this.totalValue.innerText()
        const originalPriceText = originalValueText.replace("$", "")
        const originalPrice = parseInt(originalPriceText, 10)

        const discountValueText = await this.discountedValue.innerText()
        const dicountPriceText = discountValueText.replace("$", "")
        const discountPrice = parseInt(dicountPriceText, 10)
        

        expect(discountPrice).toBeLessThan(originalPrice)
        
    }

    fillPaymentDetails = async (userPaymentDetails) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(userPaymentDetails.creditCardOwnerNames)

        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(userPaymentDetails.creditCardNumber)

        await this.creditCardvalidDate.waitFor()
        await this.creditCardvalidDate.fill(userPaymentDetails.validUntilDate)

        await this.creditCardCvc.waitFor()
        await this.creditCardCvc.fill(userPaymentDetails.creditCardCvc)
        //await this.page.pause()
    }

    completePayment = async () => {
        await this.paymentButton.waitFor()
        await this.paymentButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}