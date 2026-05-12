const {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  Before,
  After,
} = require("@cucumber/cucumber");

const { chromium } = require("@playwright/test");
const path = require("path");

setDefaultTimeout(30000);

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  this.context = await browser.newContext({
    storageState: path.resolve(__dirname, "../../JSONFiles/state.json"),
  });
  await this.context.grantPermissions(['notifications'], { origin: "https://www.ixigo.com" });
  this.page = await this.context.newPage();
});

After(async function () {
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});