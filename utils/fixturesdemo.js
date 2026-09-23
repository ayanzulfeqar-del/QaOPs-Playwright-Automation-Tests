const { test } = require('@playwright/test');
const { request } = require("@playwright/test");
const { APIUtils } = require('./APIUtils.js');

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000"
};

const orderPayload = {
  orders: [
    {
      country: "Pakistan",
      productOrderedId: "6960eac0c941646b7a8b3e68"
    }
  ]
};
// UI BASE 
exports.customtest = test.extend({
  authenticatepage: async ({ page }, use) => {
    const email = 'anshika@gmail.com';

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
      page.on('request',request=> console.log(request.url()));
    await page.locator('.card-body b').first().waitFor();
    await use(page);
    // tear down
  },
  // API CALLS 
  createOrder: async ({}, use) => {

    const apiContext = await request.newContext();
    const utils = new APIUtils(apiContext, loginPayload);

    const response = await utils.createOrder(orderPayload);
    await use(response);
  },
// you can also create an java script object where you can save or print your data//
getData: {
    product: 'zara coat 3'

}

});