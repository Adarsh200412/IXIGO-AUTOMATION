/**
 * @file groupBookingSteps.js
 * @description Step definitions for Group Booking functionality in ixigo flights application.
 */
const { Given, When, Then } = require('@cucumber/cucumber')
const GroupBookingPage = require('../../pages/Flights/groupBookingPage')

let pageObj

/**
 * Launches ixigo flights page and initializes Group Booking page object.
 */
Given("User is on ixigo-flights page",async function () {
        pageObj = new GroupBookingPage(this.page)
        await pageObj.launchURL()
    }
)

/**
 * Clicks on Group Booking option and switches control to newly opened tab.
 */
When("User clicks on Group Booking and navigates to new tab",async function () {
        await pageObj.clickGroupButton()
    }
)

/**
 * Fills all required booking details like origin, destination, date and passengers.
 */
When("Fill details about the group",async function () {
        await pageObj.fillGroupBookingDetails()
    }
)

/**
 * Submits the group booking request form.
 */
Then("Click on Submit",async function () {
        await pageObj.submitBooking()
    }
)