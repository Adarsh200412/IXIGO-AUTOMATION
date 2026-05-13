/**
 * @file popularFlightsPage.js
 * @description Page Object Model for validating navigation through popular airline links on ixigo flights page.
 */
const {expect} = require("@playwright/test")
const data = require("../../../JSONFiles/airlineData.json")

class popularFlights{

    /**
     * Initializes reusable locators for popular flights workflow.
     * @param {Page} page - Playwright browser page instance.
     */
    constructor(page){
        this.page = page
        this.flightBTN = page.locator(`//p[text()="${data.airline1}"]/parent::a`).first()
        this.heading = page.locator('h1')
    }

    /**
     * Launches ixigo flights website.
     */
    async goTo() {
        await this.page.goto("https://www.ixigo.com/flights")
    }

    /**
     * Clicks selected airline from popular airlines section.
     */
    async clickflightBTN(){
        await this.flightBTN.click()
    }

    /**
     * Verifies airline-specific search page is displayed successfully.
     */
    async verifySearch(){
        await expect(this.heading)
        .toContainText(`${data.airline1}`)
    }
}

module.exports = popularFlights