/**
 * @file flightBookingSteps.js
 * @description Step definitions for complete flight booking workflow on ixigo flights application.
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const FlightBookingPage = require('../../pages/Flights/RoundTripBookingPage');
const Data = require('../../../JSONFiles/flightData.json');

let flightPage;

/**
 * Launches ixigo website and initializes flight booking page object.
 */
Given('user opens ixigo flights application', async function () {

    // Initializes page object using Playwright page from Cucumber world context
    flightPage = new FlightBookingPage(this.page)

    await flightPage.openFlightBookingWebsite();
});

When('user chooses flight type', async function () {
    await flightPage.chooseJourneyType();
});

/**
 * Selects origin city for flight search.
 */
When('user enters departure city', async function () {
    await flightPage.enterDepartureCity();
});

/**
 * Selects destination city for flight search.
 */
When('user enters arrival city', async function () {
    await flightPage.enterArrivalCity();
});

/**
 * Selects departure date for flight booking.
 */
When('user chooses onward journey date', async function () {
    await flightPage.chooseDepartureDate();
});

When('user chooses return journey date when required', async function () {
    await flightPage.chooseReturnDate(this.tripType);
});

/**
 * Clicks search button to fetch available flights.
 */
When('user starts flight search', async function () {
    await flightPage.startFlightSearch();
});

/**
 * Applies required flight filters on search results page.
 */
When('user applies preferred flight filters' , async function () {
    await flightPage.applyFlightFilters();
})

/**
 * Selects and books first available flight from results.
 */
When('user selects available flight option', async function () {
    await flightPage.chooseAvailableFlight();
});

/**
 * Fills passenger information required for booking.
 */
Then('user enters traveller information', async function () {
    await flightPage.enterTravellerInformation();
});

/**
 * Verifies and confirms booking details before proceeding.
 */
Then('user verifies booking information', async function () {
    await flightPage.verifyBookingInformation();
});

/**
 * Selects seats for passenger booking.
 */
Then('user chooses preferred seats', async function () {
    await flightPage.choosePreferredSeats();
});

/**
 * Selects meals for passenger booking.
 */
Then('user adds meal preferences', async function () {
    await flightPage.addMealPreferences();
});

/**
 * Continues workflow to payment page.
 */
Then('user proceeds towards payment section', async function () {
    await flightPage.proceedToPaymentSection();
});

// Booking flow intentionally stops before payment to avoid actual transaction or ticket confirmation.