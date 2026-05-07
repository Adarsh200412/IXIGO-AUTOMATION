const { When } = require("@cucumber/cucumber");

When("navigate to ixigo", async function () {
    await this.page.goto("https://www.ixigo.com");
    await this.page.waitForTimeout(5000);
});