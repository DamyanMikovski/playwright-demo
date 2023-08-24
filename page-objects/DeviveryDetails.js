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
        this.saveAdressInfoButton = page.locator('[data-qa="save-address-button"]')
        this.savedAdressInfoContainer = page.locator('[data-qa="saved-address-container"]')

        this.savedAdressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAdressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAdressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAdressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAdressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAdressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async(userAdress) =>{
        //fill First Name
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAdress.firstName)
        //fill Last Name
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAdress.lastName)
        //fill street
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAdress.street)
        //fill Post code
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAdress.postCode)
        //fill Cyty
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAdress.city)
        //Select country from the dropdown
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAdress.country)
    }

    saveDetails = async () => {
        //Save count before adding new adress
        const addressCountBeforeSaving = await this.savedAdressInfoContainer.count()
        await this.saveAdressInfoButton.waitFor()
        await this.saveAdressInfoButton.click()
        await expect(this.savedAdressInfoContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedAdressFirstName.first().waitFor()
        expect(await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedAdressLastName.first().waitFor()
        expect(await this.savedAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAdressStreet.first().waitFor()
        expect(await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAdressPostCode.first().waitFor()
        expect(await this.savedAdressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.savedAdressCity.first().waitFor()
        expect(await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAdressCountry.first().waitFor()
        expect(await this.savedAdressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () =>{
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}