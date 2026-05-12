// const {
//   setDefaultTimeout,
//   BeforeAll,
//   AfterAll,
//   Before,
//   After,
// } = require("@cucumber/cucumber");

// const { chromium } = require("@playwright/test");
// const path = require("path");

// setDefaultTimeout(30000);

// let browser1;

// BeforeAll(async function 
  
//   () {
//   browser1 = await chromium.launch({ headless: false });
// });

// Before(async function () {
//   this.context = await browser.newContext({
//     storageState: path.resolve(__dirname, "../../JSONFiles/state.json"),
//   });

//   this.page = await this.context.newPage();
// });

// After(async function () {
//   await this.context.close();
// });

// AfterAll(async function () {
//   await browser.close();
// });

const {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  Before,
  After,
} = require("@cucumber/cucumber");

require('dotenv').config();

const { chromium, firefox, webkit } = require("@playwright/test");

const fs = require("fs");
const path = require("path");

setDefaultTimeout(30000);

let browser;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || "chromium";

  switch (browserType) {
    case "firefox":
      browser = await firefox.launch({
        headless: false,
      });
      break;

    case "webkit":
      browser = await webkit.launch({
        headless: false,
      });
      break;

    case "chromium":
    default:
      browser = await chromium.launch({
        headless: false,
      });
  }

  console.log(`✓ Running tests on ${browserType}`);
});

Before(async function () {
  const browserType = process.env.BROWSER || "chromium";


  const authFile = path.resolve(__dirname, `../../JSONFiles/${browserType}.json`);

  if (fs.existsSync(authFile)) {
    console.log(`Using saved session: ${authFile}`);
    this.context = await browser.newContext({ storageState: authFile });
  } else {
    console.log(`No saved session for ${browserType}. Run the login script to generate JSONFiles/${browserType}.json`);
    this.context = await browser.newContext();
  }

  this.page = await this.context.newPage();
});

After(async function () {
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});