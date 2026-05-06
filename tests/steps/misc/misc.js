const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am logged in", async function () {
  // Session already loaded via auth.json in hooks
  await this.page.goto("https://www.ixigo.com/");
  await this.page.waitForTimeout(20000);
  // You're already authenticated
});