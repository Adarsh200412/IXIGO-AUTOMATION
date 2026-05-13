/**
 * @file flightTrackerSteps.js
 * @description Step definitions for flight tracking functionality on ixigo flights page.
 */

const {Given , When , Then} = require('@cucumber/cucumber');
const FlightBookingPage = require('../../pages/Flights/flightTrackerPage');
const { expect } = require('@playwright/test')

let pageObj;

/**
 * Launches ixigo flights page and initializes flight tracker page object.
 */
Given("user gets to flight page" ,async function () {
    pageObj = new FlightBookingPage(this.page)
    await this.page.goto('https://www.ixigo.com/flights')
})

/**
 * Navigates user to flight tracking page and verifies URL.
 */
When("user clicks on flight tracker" , async function () {
    await pageObj.clickTrackerButton()
    await expect(this.page).toHaveURL(/flight-status/)
})

/**
 * Selects airline for flight tracking.
 */
When("user enters airline",async function () {
    await pageObj.fillAirline()
})

/**
 * Enters flight number for tracking.
 */
When("user enters flight Number" , async function () {
    await pageObj.fillFlightNumber()
})

/**
 * Clicks search button and captures screenshot of tracking details.
 */
Then("user click search and Screenshot" , async function () {
    await pageObj.clickSubmitBtn()
})