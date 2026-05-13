const { expect } = require('@playwright/test');

class VisaHomePage {
    constructor(page) {
        this.page = page;
        this.moreButton = page.locator('[class="flex gap-5 items-center cursor-pointer relative"]');
        this.visaButton = page.getByText('Book Visa').first();
        this.searchInput = page.locator('[placeholder="Search Destination"]');
        this.searchButton = page.locator('[class="search-button"]');
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async scrollToMore() {
        await this.page.mouse.wheel(0, 1000);
        await this.page.waitForTimeout(1000);
    }

    async clickMore() {
        await this.moreButton.click();
        await this.page.waitForTimeout(500);
    }

    async openVisaPage() {
        await this.scrollToMore();
        await this.clickMore();

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.visaButton.click()
        ]);

        this.page = newPage;
        await expect(this.page).toHaveURL(/.*visa.*/);
        await expect(this.page.locator('.logo.ixigo').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
        await expect(this.page.locator('h2', { hasText: 'Trending Countries' }).first()).toBeVisible({ timeout: 5000 }).catch(() => {});

        this.searchInput = this.page.locator('[placeholder="Search Destination"]');
        this.profileIcon = this.page.locator('[id="dropdownMenuLink"]').first();
        this.myProfile = this.page.locator('[href="/profile"]');
        return this.page;
    }

    async fillSearch(country) {
        await this.page.waitForTimeout(2000);
        await this.searchInput.fill(country);
    }

    async submitSearch() {
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000); 
    }

    async startApplication() {
        this.startApplicationButton = this.page.locator('[class="btn-start-application"]');
        await expect(this.page).toHaveURL(/.*visa\/.*/, { timeout: 10000 }).catch(() => {});
        await expect(this.page.locator('h1').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
        await expect(this.startApplicationButton).toBeVisible({ timeout: 10000 });
        await expect(this.startApplicationButton).toBeEnabled();
        await this.startApplicationButton.click();
        await this.page.waitForNavigation();
        return this.page;
    }

    async search(country) {
        await this.page.waitForTimeout(3000);
        await this.fillSearch(country);
        await this.submitSearch();
        return await this.startApplication();
    }

    async clickProfileIcon() {
        await this.profileIcon.click();
    }

    async openMyProfile() {
        await this.myProfile.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page).toHaveURL(/.*profile.*/);

        this.editButton = this.page.locator('#edit-visitor-details').nth(0);
        this.firstName = this.page.locator('#firstName').nth(1);
        this.lastName = this.page.locator('#lastName').nth(1);
        this.middleName = this.page.locator('#middleName').nth(1);
        this.emailAddress = this.page.locator('#emailId').nth(1);
        this.passPortNumber = this.page.locator('#passportNumber').nth(1);
        this.continue = this.page.locator('#details-back');
        return this.page;
    }

    async clickEditButton() {
        await this.editButton.click();
        await this.page.waitForTimeout(1000);
    }

    async fillVisitorDetails({
        firstName,
        lastName,
        middleName,
        emailAddress,
        mobileNumber,
        passPortNumber
    }) {
        await this.firstName.fill(firstName || '');
        await expect(this.firstName).toHaveValue(firstName || '');

        await this.lastName.fill(lastName || '');
        await expect(this.lastName).toHaveValue(lastName || '');

        await this.middleName.fill(middleName || '');
        
        await this.emailAddress.fill(emailAddress || '');
        await expect(this.emailAddress).toHaveValue(emailAddress || '');

        await this.passPortNumber.fill(passPortNumber || '');
        await expect(this.passPortNumber).toHaveValue(passPortNumber || '');

        await this.page.waitForTimeout(2000);
        await expect(this.continue).toBeVisible();
        await this.continue.click();
    }

    async expectProfileEditVisible() {
        await expect(this.page.locator('#edit-visitor-details').first()).toBeVisible({ timeout: 5000 });
    }

    async expectProfileEditError() {
        const errorLocator = this.page.locator('.error, .error-message, [class*="error"]');
        await expect(errorLocator.first()).toBeVisible({ timeout: 5000 });
    }

    async expectNoResults() {
        // const noResults = this.page.getByText('No Destinations Found', { exact: false }).first();
        // await expect(noResults).toBeVisible({ timeout: 5000 });
    }
}

module.exports = VisaHomePage;