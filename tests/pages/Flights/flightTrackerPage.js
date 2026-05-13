/**
 * @file flightTrackerPage.js
 * @description Page Object Model for ixigo flight tracking functionality.
 * Handles airline selection, flight number entry and tracking result validation.
 */

const { expect } = require('@playwright/test')
const flightData = require('../../../JSONFiles/TrackingData.json')

class flightTracker{
    /**
     * Initializes reusable locators for flight tracking workflow.
     * @param {Page} page - Playwright browser page instance.
     */
    constructor(page){
        this.page = page
        this.FlightTrackerBTN = page.locator('//a[@href="/flight-status"]')
        this.AirlineDropBTN = page.getByTestId("ChevronRightIcon").first()
        this.AirlineTextField = page.locator('//label[text()="Airline"]/following-sibling::input')
        this.AirlineOption = page.locator(`//p[contains(text(),"${flightData.airlineCode}")]`)
        this.FlightNumberTextField = page.locator('//input[@data-testid="autocompleter-input"]')
        this.submitBTN = page.locator('//button[@data-testid="submit-btn"]')
        this.detailsPage = page.locator('//div[@data-testid="airline-details"]')
    }

    /**
     * Navigates user to flight tracking section.
     */
    async clickTrackerButton() {
        await this.FlightTrackerBTN.click()
    }

    /**
     * Selects airline using airline code from test data.
     */
    async fillAirline(){
        await this.AirlineDropBTN.click()
        await expect(this.AirlineTextField).toBeVisible()
        await this.AirlineTextField.fill(flightData.airlineCode)
        await expect(this.AirlineTextField).toHaveValue(flightData.airlineCode)
        await expect(this.AirlineOption).toBeVisible()
        await this.AirlineOption.click()
    }

    /**
     * Enters flight number for tracking.
     */
    async fillFlightNumber(){
        await expect(this.FlightNumberTextField).toBeVisible()
        await this.FlightNumberTextField.fill(flightData.flightNumber)
        await expect(this.FlightNumberTextField).toHaveValue(flightData.flightNumber)
    }

    /**
     * Submits flight tracking request and validates tracking details page.
     */
    async clickSubmitBtn(){

        await expect(this.submitBTN).toBeEnabled()

        await this.submitBTN.click()

        await this.detailsPage.waitFor()

        await expect(this.detailsPage)
            .toBeVisible()

        await expect(this.page)
            .toHaveURL(/flight-status/)

        await this.page.screenshot({
            path:"screenshot/screenshot1.png"
        })
    }
}

module.exports = flightTracker