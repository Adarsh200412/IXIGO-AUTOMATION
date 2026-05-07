const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://www.ixigo.com");


  await page.waitForTimeout(30000);
  page.reload();


  await context.storageState({path: "JSONFiles/state.json"});

  console.log("Authenticated session saved successfully");

  await context.close();
  await browser.close();
})();