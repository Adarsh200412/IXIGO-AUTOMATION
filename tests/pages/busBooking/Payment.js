const { expect } = require('@playwright/test');

class Payment {
    constructor(page) {
        this.page = page;
        this.email = page.locator('input[placeholder="Email ID"]');
        this.name = page.locator('input[placeholder="Name"]');
        this.age = page.locator('input[placeholder="Age"]');
        this.gender = page.locator('.male').first();
        this.button = page.getByText('Continue to Pay');
    }   

    async fillPassengerDetails({ email, name, age } = {}) {
        await expect(this.email).toBeVisible();
        await expect(this.email).toBeEnabled();
        await this.email.fill(email || '');
        await expect(this.email).toHaveValue(email || '');

        await expect(this.name).toBeVisible();
        await expect(this.name).toBeEnabled();
        await this.name.fill(name || '');
        await expect(this.name).toHaveValue(name || '');

        await expect(this.age).toBeVisible();
        await expect(this.age).toBeEnabled();
        await this.age.fill(age || '');
        await expect(this.age).toHaveValue(age || '');
    }

    async selectGender() {
        const maleBtn = this.page.locator('.male').first();
        const femaleBtn = this.page.locator('.female').first();

        const isMaleClickable = (await maleBtn.isVisible()) && (await maleBtn.isEnabled());
        
        if (isMaleClickable) {
            await maleBtn.click();
        } else {
            await expect(femaleBtn).toBeVisible();
            await expect(femaleBtn).toBeEnabled();
            await femaleBtn.click();
        }
    }

    async continueToPay() {
        await expect(this.button).toBeVisible();
        await expect(this.button).toBeEnabled();
        await this.button.click();
    }

    async details(passengerData) {
        if (Array.isArray(passengerData)) {
            for (let i = 0; i < passengerData.length; i++) {
                const p = passengerData[i];
                if (p.email) {
                    await expect(this.email).toBeVisible();
                    await expect(this.email).toBeEnabled();
                    await this.email.fill(p.email);
                    await expect(this.email).toHaveValue(p.email);
                }
                const nameInput = this.name.nth(i);
                await expect(nameInput).toBeVisible();
                await expect(nameInput).toBeEnabled();
                await nameInput.fill(p.name || '');
                await expect(nameInput).toHaveValue(p.name || '');

                const ageInput = this.age.nth(i);
                await expect(ageInput).toBeVisible();
                await expect(ageInput).toBeEnabled();
                await ageInput.fill(p.age || '');
                await expect(ageInput).toHaveValue(p.age || '');

                await this.selectGenderForPassenger(i);
            }
        } else {
            await this.fillPassengerDetails(passengerData);
            await this.selectGender();
        }
        await this.continueToPay();
    }

    async selectGenderForPassenger(index) {
        const maleBtn = this.page.locator('.male').nth(index);
        const femaleBtn = this.page.locator('.female').nth(index);

        const isMaleClickable = (await maleBtn.isVisible()) && (await maleBtn.isEnabled());
        
        if (isMaleClickable) {
            await maleBtn.click();
        } else {
            await expect(femaleBtn).toBeVisible();
            await expect(femaleBtn).toBeEnabled();
            await femaleBtn.click();
        }
    }

    async expectValidationError() {
        await this.page.waitForTimeout(1000);
        await expect(this.button).toBeVisible();
    }
}

module.exports = Payment;