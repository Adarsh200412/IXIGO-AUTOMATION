const { expect } = require('@playwright/test'); //
const Data = require('../../../JSONFiles/flightData.json');//importing data from the file
const testData = Data[0]
// Have made different test data some for student some for Senior citizen

class FlightBookingPage {

    constructor(page) {
        this.page = page;
        this.fromBlock = page.locator('//span[text() = "From"]');
        this.fromInput = page.locator('//label[text() = "From"]/following-sibling::input');
        this.toInput = page.locator('//label[text() = "To"]/following-sibling::input');
        this.departureDate = page.locator(`//abbr[@aria-label="${testData.date}"]`);
        this.studentBTN = page.locator('//span[text()="Student"]')
        this.seniorCitizenBTN = page.locator('//span[text()="Senior Citizen"]')
        this.businessClassBTN = page.locator('//span[text()="Business"]')
        this.searchButton = page.locator('//button[text()="Search"]');
        this.filter1 = page.locator('//input[@value="cheapest"]');
        this.filter2 = page.locator('//input[@type="checkbox"]').nth(1);
        this.bookButton = page.locator('//button[text()="Book"]').nth(0);
        this.titleInput = page.locator('//label[text()="Title"]/following-sibling::input');
        this.mrOption = page.locator('//p[text()="Mr"]');
        this.firstNameInput = page.locator('//label[text()="First & Middle Name"]/following-sibling::input');
        this.lastNameInput = page.locator('//label[text()="Last Name"]/following-sibling::input');
        this.emailInput = page.locator('//label[text()="Email"]/following-sibling::input');
        this.DOBInput = page.locator('//label[text()="Date of Birth"]/following-sibling::input');
        this.addressInput = page.locator('//label[text()="Address"]/following-sibling::input');
        this.freeCancellation = page.locator("#standalone-none-fareType");
        this.confirmBTN = page.locator('//button[text() = "Confirm"]');
        this.BTN = page.locator('//button[text() = "No, Thanks"]');
        this.continueBTN = page.locator('//button[contains(text(),"Continue")]');
        this.seatBTN = page.locator('(//img[@alt="w-auto seat-icon"])').nth(10)
        this.mealBTN = page.locator('//button[text() = "Meal Selection"]')
        this.addMealBTN = page.locator('(//button[text() = "Add"])').nth(2)
        this.skipBTN = page.locator('//button[text() = "Continue To Pay"]');
        this.delhiOption = page.locator('(//span[@class="text-primary text-sm"])').nth(0)
        this.firstSuggestion = page.locator('(//div[@role="listitem"]/descendant::span[@class="text-primary text-sm"])[11]').nth(0);
        this.toBlockText = page.locator('//span[text() = "To"]/following-sibling::p');
    }

    async launchWebsite() {
        await this.page.goto('https://www.ixigo.com/flights');
        await expect(this.page).toHaveURL(/ixigo/);
    }

    async selectOrigin() {
        await this.fromBlock.click();
        await this.fromInput.fill(testData.origin);
        await this.page.waitForTimeout(2000);
        await this.delhiOption.click();
    }

    async selectDestination() {
        // After entering Origin destination automatically opens so no need to click
        await this.toInput.fill(testData.destination);
        await this.page.waitForTimeout(2000);
        await this.firstSuggestion.click();
    }

    async selectDate() {
        // After entering Origin destination automatically opens so no need to click
        await this.departureDate.click();
    }

    async clickSearch() {

        if(testData.typeOfFlight == "Economy"){
            await this.searchButton.click();
        }

        else{
            await this.businessClassBTN.click()
            await this.searchButton.click();
        }

        await expect(this.page).toHaveURL(/search\/result/);
    }

    async clickFilter1(){
        if(testData.student){
            await this.studentBTN.click()
        }

        if(testData['Senior Citizen']){

            const dob = new Date(testData.dob)
            const today = new Date()
            let age = today.getFullYear() - dob.getFullYear()

            if(age > 60){
                await this.seniorCitizenBTN.click()
            }
        }

        await this.filter1.click();
        await expect(this.filter1).toBeChecked();

        await this.filter2.click();
        await expect(this.filter2).toBeChecked();
    }

    async bookFlight() {
        await this.bookButton.click();
    }

    async fillPassengerDetails() {

        await this.freeCancellation.click();
        await expect(this.freeCancellation).toBeChecked();

        await this.titleInput.click();
        await this.mrOption.click();

        await this.firstNameInput.fill(testData.firstName);
        await expect(this.firstNameInput).toHaveValue(testData.firstName);

        await this.lastNameInput.fill(testData.lastName);
        await expect(this.lastNameInput).toHaveValue(testData.lastName);

        await this.emailInput.fill(testData.email);
        await expect(this.emailInput).toHaveValue(testData.email);

        if(await this.DOBInput.isVisible()){
            await this.DOBInput.fill(testData.dob);
            await expect(this.DOBInput).toHaveValue(testData.dob);
        }

        await this.addressInput.fill(testData.address);
        await expect(this.addressInput).toHaveValue(testData.address);

        await this.continueBTN.click();
    }

    async confirmBookingDetails() {
        await this.confirmBTN.click();
        await this.BTN.click();
    }

    async selectSeats() {
        await this.seatBTN.click();
        await this.mealBTN.click();
    }

    async selectMeals() {
        await this.addMealBTN.click();
        await this.continueBTN.click();
        await this.continueBTN.click();
    }

    async continueToPayment() {
        await this.skipBTN.click();
        await expect(this.page.locator('//p[text()="Scan & Pay with UPI"]')).toBeVisible({timeout:12000});
        await this.page.screenshot({path: 'screenshot/screenshot.png'});
    }
}

module.exports = FlightBookingPage;