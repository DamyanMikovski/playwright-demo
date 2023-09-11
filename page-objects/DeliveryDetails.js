import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressInfoButton = page.locator('[data-qa="save-address-button"]')
        this.savedAddressInfoContainer = page.locator('[data-qa="saved-address-container"]')

        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async(userAddress) =>{
        //fill First Name
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        //fill Last Name
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        //fill street
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        //fill Post code
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postCode)
        //fill City
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        //Select country from the dropdown
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        //Save count before adding new address
        const addressCountBeforeSaving = await this.savedAddressInfoContainer.count()
        await this.saveAddressInfoButton.waitFor()
        await this.saveAddressInfoButton.click()
        await expect(this.savedAddressInfoContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAddressPostCode.first().waitFor()
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () =>{
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}