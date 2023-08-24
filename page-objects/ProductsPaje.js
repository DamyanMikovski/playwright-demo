import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "../utils/isDesktopViewport"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {  
        const specificAddButton = this.addButtons.nth(index)  

        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        //only work Desktop viewport
        let basketCountBeforAdding
        if(isDesktopViewport(this.page)){
            basketCountBeforAdding = await navigation.getBasketCount()
            
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        //only work on Descktop viewport
        if (isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforAdding)
        }

    }

    sortByCheapest = async () => {
        await this.sortDropDown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforerSorting = await this.productTitle.allInnerTexts()     
        await this.sortDropDown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforerSorting)  
    }
}