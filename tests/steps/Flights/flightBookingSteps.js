/**
 * @file flightBookingSteps.js
 * @description Step definitions for complete flight booking workflow on ixigo flights application.
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const FlightBookingPage = require('../../pages/Flights/flightBookingPage');

let flightPage;

/**
 * Launches ixigo website and initializes flight booking page object.
 */
Given('user launches ixigo website', async function () {

    // Initializes page object using Playwright page from Cucumber world context
    flightPage = new FlightBookingPage(this.page)

    await flightPage.launchWebsite();
});

/**
 * Selects origin city for flight search.
 * @param {string} origin - Departure city selected by user.
 */
When('user selects {string} as origin city', async function (origin) {
    await flightPage.selectOrigin(origin);
});

/**
 * Selects destination city for flight search.
 * @param {string} destination - Arrival city selected by user.
 */
When('user selects {string} as destination city', async function (destination) {
    await flightPage.selectDestination(destination);
});

/**
 * Selects departure date for flight booking.
 */
When('user selects departure date', async function () {
    await flightPage.selectDate();
});

/**
 * Clicks search button to fetch available flights.
 */
When('user clicks search button', async function () {
    await flightPage.clickSearch();
});

/**
 * Applies required flight filters on search results page.
 */
When('user applies filters' , async function () {
    await flightPage.clickFilter1();
})

/**
 * Selects and books first available flight from results.
 */
When('user books first available flight', async function () {
    await flightPage.bookFlight();
});

/**
 * Fills passenger information required for booking.
 */
Then('user fills passenger details', async function () {
    await flightPage.fillPassengerDetails();
});

/**
 * Verifies and confirms booking details before proceeding.
 */
Then('user confirms booking details', async function () {
    await flightPage.confirmBookingDetails();
});

/**
 * Selects seats for passenger booking.
 */
Then('user selects seats', async function () {
    await flightPage.selectSeats();
});

/**
 * Selects meals for passenger booking.
 */
Then('user selects meals', async function () {
    await flightPage.selectMeals();
});

/**
 * Continues workflow to payment page.
 */
Then('user continues to payment page', async function () {
    await flightPage.continueToPayment();
});