/**
 * @file groupBookingPage.js
 * @description Page Object Model for ixigo Group Booking functionality.
 * Handles group booking navigation, passenger details and booking submission workflow.
 */
const { expect } = require('@playwright/test')
const testData = require('../../../JSONFiles/groupBookingData.json')
const data = testData[0]

class GroupBookingPage{
    /**
     * Initializes reusable locators for group booking workflow.
     * @param {Page} page - Playwright browser page instance.
     */
    constructor(page){
        this.page = page
        this.groupBookingBTN = page.locator('//p[text()="Group Booking"]/ancestor::a[@data-testid="submenu-item"]')
    }

    /**
     * Launches ixigo flights website and validates URL.
     */
    async launchURL(){
        await this.page.goto('https://www.ixigo.com/flights')
        await expect(this.page).toHaveURL(/flights/)
    }

    /**
     * Opens Group Booking page in new tab and initializes locators for new page.
     */
    async clickGroupButton(){
        await expect(this.groupBookingBTN).toBeVisible()

        // Waits for newly opened browser tab after clicking Group Booking
        const newPagePromise = this.page.context().waitForEvent('page')

        await this.groupBookingBTN.click()
        this.newPage = await newPagePromise
        await this.newPage.waitForLoadState()

        await expect(this.newPage).toHaveURL(/group/)

        this.originBTN = this.newPage.locator('//input[@id="origin"]/parent::div')
        this.originField = this.newPage.locator('#origin')
        this.originOption = this.newPage.locator(`text=${data.origin}, India`)
        this.destinationField = this.newPage.locator('#destination')
        this.destinationBTN = this.newPage.locator(`text=${data.destination}, India`)
        this.departureBTN = this.newPage.locator('//input[@placeholder="Departure"]')
        this.dateOption = this.newPage.locator(`//abbr[@aria-label="${data.departureDate}"]`)
        this.passengersTF = this.newPage.locator('//input[@placeholder="Number of passengers"]')
        this.submitBTN = this.newPage.locator('//button[text()="Submit"]')
    }

    /**
     * Fills all required group booking details.
     */
    async fillGroupBookingDetails(){
        await expect(this.originBTN).toBeVisible()
        await this.originBTN.click()

        await this.originField.fill(data.origin)
        await expect(this.originField).toHaveValue(data.origin)

        await expect(this.originOption).toBeVisible()
        await this.originOption.click()

        await this.destinationField.fill(data.destination)
        await expect(this.destinationField).toHaveValue(data.destination)

        await expect(this.destinationBTN).toBeVisible()
        await this.destinationBTN.click()

        await this.departureBTN.click()

        await expect(this.dateOption).toBeVisible()
        await this.dateOption.click()

        await this.passengersTF.fill(data.passengers)
        await expect(this.passengersTF).toHaveValue(data.passengers)
    }

    /**
     * Submits group booking request and captures screenshot.
     */
    async submitBooking(){
        await expect(this.submitBTN).toBeEnabled()
        await this.submitBTN.click()
        await this.newPage.screenshot({path:'screenshot/screenshot2.png'})
    }
}

module.exports = GroupBookingPage