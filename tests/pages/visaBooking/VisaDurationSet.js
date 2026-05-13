const { expect } = require('@playwright/test');

class VisaDurationSet {
    constructor(page) {
        this.page = page;
        this.checkbox = page.locator('#checkbox_input_traveler_0');
        this.continueBtn = page.locator('.btn.btn-continue');
    }

    async clickNextMonth() {
        await this.page.locator('button[aria-label="Next Month"]:visible').last().click();
    }

    async monthVisible(month) {
        const months = await this.page.locator('.p-datepicker-month').allInnerTexts();
        return months.includes(month);
    }

    async goToMonth(month) {
        while (!(await this.monthVisible(month))) {
            await this.clickNextMonth();
        }
    }

    async selectDate(date) {
        const formattedDate = new Date(date);
        const dataDate = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`;
        await this.page.locator(`span[data-date="${dataDate}"]:not(.p-disabled)`).first().click();
    }

    async setDuration(startDate, endDate) {
        const startMonth = startDate.split(" ")[1];
        const endMonth = endDate.split(" ")[1];

        await this.goToMonth(startMonth);
        await this.selectDate(startDate);

        await this.goToMonth(endMonth);
        await this.selectDate(endDate);
    }

    async checkCheckbox() {
        await this.checkbox.click();
    }

    async continueButtonClick() {
        await expect(this.continueBtn).toBeVisible();
        await this.continueBtn.click();
        return this.page;
    }
}

module.exports = VisaDurationSet;