const { chromium } = require("playwright");

(async () => {
  const context = await chromium.launchPersistentContext("./ixigo-user-data", {
    headless: false,
  });

  const page = await context.newPage();

  await page.goto("https://www.ixigo.com");


  await page.waitForTimeout(30000);
  page.reload();


  await context.storageState({
    path: "JSONFiles/state.json",
  });

  console.log("Authenticated session saved successfully");

  await context.close();
})();