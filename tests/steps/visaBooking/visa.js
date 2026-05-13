const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const VisaHomePage = require("../../pages/visaBooking/VisaHomePage");
const VisaDurationSet = require("../../pages/visaBooking/VisaDurationSet");
const VisaDetailsPage = require("../../pages/visaBooking/VisaDetailsPage");
const visaTestData = require("../../../JSONFiles/visaTestData.json");

let visaHomePage;
let setDuration;
let visaDetailsPage;

Given("Navigate to HomePage {string}", async function(url) {
    visaHomePage = new VisaHomePage(this.page);
    await visaHomePage.navigate(url);
});

When("I open the visa booking page", async function() {
    this.page = await visaHomePage.openVisaPage();
});

When("I search for visa using data {string}", async function(testKey) {
    const data = visaTestData[testKey];
    if (data.errorType === 'invalid_country') {
        await visaHomePage.fillSearch(data.country);
        await visaHomePage.submitSearch();
    } else {
        this.page = await visaHomePage.search(data.country);
    }
});

When("I set visa duration using data {string}", async function(testKey) {
    const data = visaTestData[testKey];
    setDuration = new VisaDurationSet(this.page);
    await setDuration.setDuration(data.startDate, data.endDate);
    this.page = await setDuration.continueButtonClick();
});

When("I provide visa details using data {string}", async function(testKey) {
    const data = visaTestData[testKey];
    visaDetailsPage = new VisaDetailsPage(this.page);
    await visaDetailsPage.checkCheckbox();
    this.page = await visaDetailsPage.clickOnContinue();
    await this.page.waitForTimeout(1000);
    const uploadWasVisible = await visaDetailsPage.uploadPhotoGraph(data.photoPath);
    await visaDetailsPage.skipable();
    if (uploadWasVisible) {
        this.page = await visaDetailsPage.clickOnContinue();
    }
    await visaDetailsPage.checkCheckbox();
    await visaDetailsPage.makePayment();
});

Then("The visa booking flow completes for {string}", async function(testKey) {
    const data = visaTestData[testKey];
    visaDetailsPage = visaDetailsPage || new VisaDetailsPage(this.page);
    await visaDetailsPage.expectBookingComplete();
});

When("I go to my profile", async function() {
    this.page = await visaHomePage.page;
    await visaHomePage.clickProfileIcon();
    this.page = await visaHomePage.openMyProfile();
});

When("I edit my profile details with data {string}", async function (testKey) {
    const data = visaTestData[testKey];
    await visaHomePage.clickEditButton();
    await visaHomePage.fillVisitorDetails(data.profileData);
});

Then("The profile edit completes for {string}", async function(testKey) {
    const data = visaTestData[testKey];
    if (data.errorType) {
        await visaHomePage.expectProfileEditError();
    } else {
        await visaHomePage.expectProfileEditVisible();
    }
});

Then("It should show an error for {string}", async function(testKey) {
    const data = visaTestData[testKey];
    if (data.errorType === 'invalid_country') {
        await visaHomePage.expectNoResults();
    }
});