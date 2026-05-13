/**
 * @file popularFlights.js
 * @description Step definitions for verifying airline navigation and results on ixigo flights page.
 */

const {Given , When , Then} = require("@cucumber/cucumber")
const popularFlight = require("../../pages/Flights/popularFlightsPage")

let pageObj;

/**
 * Initializes page object and launches ixigo flights page.
 */
Given("User navigated to ixigoFlights" , async function(){
    pageObj = new popularFlight(this.page)
    await this.page.goto("https://www.ixigo.com/flights")
})

/**
 * Clicks on selected airline option from popular flights section.
 */
When("User clicks on <anyAirline> button" , async() => {
    await pageObj.clickflightBTN()
})

/**
 * Verifies airline-specific search results are displayed correctly.
 */
Then("verify User gets the desired results and all results of <anyAirline>" , async()=>{
    await pageObj.verifySearch()
})