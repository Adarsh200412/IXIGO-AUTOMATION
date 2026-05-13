const { expect } = require('@playwright/test');

class BusFilters {
    constructor(page) {
        this.page = page;
        this.priceFilter = page.locator('(//*[@class="sort-item"]/div/a)[1]');
        this.seatsFilter = page.locator('(//*[@class="sort-item"]/div/a)[2]');
        this.ratingFilter = page.locator('(//*[@class="sort-item"]/div/a)[3]');
        this.arrivalTimeFilter = page.locator('(//*[@class="sort-item"]/div/a)[4]');
        this.departureTimeFilter = page.locator('(//*[@class="sort-item"]/div/a)[5]');
        this.selectSeat = page.locator('(//button[text()="Select Seats"])[1]');
        this.seatSelector = page.locator('//*[@id="seat-layout-details"]//*[local-name()="g"]/*[local-name()="path" and @fill="white"]').first();
        this.placeOptions = page.locator('//*[@id="place-container"]/div');
        this.proceedButton = page.locator('[class="btn  dark filled primary md rounded-md inactive button"]');
        this.busTypeFilter1 = page.locator('//*[@id="seat-filter-bus-type"]/a').first();
        this.busTypeFilter2 = page.locator('//*[@id="seat-filter-bus-type"]/a').last();
        this.busTypeFilter3 = page.locator('//*[@id="seat-filter-bus-type"]/a').nth(1);
        this.slider = page.locator('.horizontal-slider');
        this.minThumb = page.locator('.slider-thumb-0');
        this.maxThumb = page.locator('.slider-thumb-1');
        this.departureTimes = page.locator('//*[@id="seat-filter-departure-list"]/a');
        this.DepartureTime1 = this.departureTimes.nth(0);
        this.DepartureTime2 = this.departureTimes.nth(1);
        this.DepartureTime3 = this.departureTimes.nth(2);
        this.DepartureTime4 = this.departureTimes.nth(3);
    }

    async pause(duration = 500) {
        await this.page.waitForTimeout(duration);
    }

    async getBusCount() {
        const allSelectSeatsButtons = this.page.locator('//button[text()="Select Seats"]');
        const count = await allSelectSeatsButtons.count();
        let visibleCount = 0;

        for (let index = 0; index < count; index++) {
            if (await allSelectSeatsButtons.nth(index).isVisible().catch(() => false)) {
                visibleCount += 1;
            }
        }

        return visibleCount;
    }

    async selectPriceFilter() {
        await expect(this.priceFilter).toBeVisible();
        await expect(this.priceFilter).toBeEnabled();
        await this.priceFilter.click();
        await this.pause();
    }

    async selectSeatsFilter() {
        await expect(this.seatsFilter).toBeVisible();
        await expect(this.seatsFilter).toBeEnabled();
        await this.seatsFilter.click();
        await this.pause();
    }

    async selectRatingFilter() {
        await expect(this.ratingFilter).toBeVisible();
        await expect(this.ratingFilter).toBeEnabled();
        await this.ratingFilter.click();
        await this.pause();
    }

    async selectArrivalTimeFilter() {
        await expect(this.arrivalTimeFilter).toBeEnabled();
        await this.arrivalTimeFilter.click();
        await this.pause();
    }

    async selectDepartureTimeFilter() {
        await expect(this.departureTimeFilter).toBeVisible();
        await expect(this.departureTimeFilter).toBeEnabled();
        await this.departureTimeFilter.click();
        await this.pause();
    }

    async clickFilters() {
        await this.selectPriceFilter();
        await this.selectSeatsFilter();
        await this.selectRatingFilter();
        await this.selectArrivalTimeFilter();
        await this.selectDepartureTimeFilter();
    }

    async setPriceRange(minPrice, maxPrice) {
        await expect(this.slider).toBeVisible();
        const box = await this.slider.boundingBox();

        await expect(this.minThumb).toBeVisible();
        await this.minThumb.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + ((minPrice - 1200) / (5299 - 1200)) * box.width, box.y);
        await this.page.mouse.up();

        await expect(this.maxThumb).toBeVisible();
        await this.maxThumb.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + ((maxPrice - 1200) / (5299 - 1200)) * box.width, box.y);
        await this.page.mouse.up();
        await this.pause();
    }

    async applyBusTypeFilters() {
        await expect(this.busTypeFilter1).toBeVisible();
        await expect(this.busTypeFilter1).toBeEnabled();
        await this.busTypeFilter1.click();
        
        await expect(this.busTypeFilter2).toBeVisible();
        await expect(this.busTypeFilter2).toBeEnabled();
        await this.busTypeFilter2.click();
        
        await expect(this.busTypeFilter3).toBeVisible();
        await expect(this.busTypeFilter3).toBeEnabled();
        await this.busTypeFilter3.click();
    }

    async selectDepartureTimeByIndex(index) {
        await expect(this.departureTimes.nth(index)).toBeVisible();
        await expect(this.departureTimes.nth(index)).toBeEnabled();
        await this.departureTimes.nth(index).click();
        await this.pause();
    }

    async selectDepartureTime1() {
        await expect(this.DepartureTime1).toBeVisible();
        await expect(this.DepartureTime1).toBeEnabled();
        await this.DepartureTime1.click();
        await this.pause();
    }

    async selectDepartureTime2() {
        await expect(this.DepartureTime2).toBeVisible();
        await expect(this.DepartureTime2).toBeEnabled();
        await this.DepartureTime2.click();
        await this.pause();
    }

    async selectDepartureTime3() {
        await expect(this.DepartureTime3).toBeVisible();
        await expect(this.DepartureTime3).toBeEnabled();
        await this.DepartureTime3.click();
        await this.pause();
    }

    async selectDepartureTime4() {
        await expect(this.DepartureTime4).toBeVisible();
        await expect(this.DepartureTime4).toBeEnabled();
        await this.DepartureTime4.click();
        await this.pause();
    }

    async selectAllDepartureTimes() {
        const count = await this.departureTimes.count().catch(() => 0);
        const max = Math.min(4, count);
        for (let i = 0; i < max; i++) {
            await expect(this.departureTimes.nth(i)).toBeVisible();
            await expect(this.departureTimes.nth(i)).toBeEnabled();
            await this.departureTimes.nth(i).click();
            await this.pause(250);
        }
    }

    async selectSeats() {
        await expect(this.selectSeat).toBeVisible();
        await expect(this.selectSeat).toBeEnabled();
        await this.selectSeat.click();
        await this.pause();
    }
    
    async selectFirstAvailableSeat() {
        await expect(this.seatSelector).toBeVisible();
        await this.seatSelector.click();
        await this.pause(); 
    }

    async selectTwoAvailableSeats() {
        await expect(this.seatSelector.nth(0)).toBeVisible();
        await this.seatSelector.nth(0).click();
        await this.pause(1000);
        await expect(this.seatSelector.nth(0)).toBeVisible();
        await this.seatSelector.nth(0).click();
        await this.pause(1000);
    }

    async selectBoardingPoint() {
        await expect(this.placeOptions.first()).toBeVisible();
        await this.placeOptions.first().click();
        await this.pause();
    }

    async selectDroppingPoint() {
        await expect(this.placeOptions.nth(1)).toBeVisible();
        await this.placeOptions.nth(1).click();
        await this.pause();
    }

    async selectSource() {
        await this.selectBoardingPoint();
    }

    async selectDestination() {
        await this.selectDroppingPoint();
    }

    async clickProceed() {
        await expect(this.proceedButton).toBeVisible();
        await expect(this.proceedButton).toBeEnabled();
        await this.proceedButton.click();
        await this.pause(2000);
    }

    async expectLessBusesFound() {
        const count = await this.getBusCount();
        expect(count).toBeGreaterThan(0);
    }
}

module.exports = BusFilters