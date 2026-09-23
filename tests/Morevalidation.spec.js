const { test, expect } = require("@playwright/test");
const { getAssetKeys } = require("node:sea");

test("more validation tst", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //  await page.goto ('https://google.com');
  // await page.goBack();

  await expect(page.locator("#displayed-text")).toBeVisible();
await expect(page).toHaveScreenshot('homepage.png');
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // page.on('dialog',dialog => dialog.dismiss)
  // this method we use to handle popups on the page
  page.on("dialog", (dialog) => dialog.accept);
  await page.locator("#mousehover").hover();

  // WE USE FRAMELOCATORS TO GET TO THE NEW WEBSITE WHITHIN THE WEBSITE
  // THAT IS ALREADY OPENED


});

// })
