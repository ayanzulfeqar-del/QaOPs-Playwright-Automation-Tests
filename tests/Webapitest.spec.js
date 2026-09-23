const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

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

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const utils = new APIUtils(apiContext, loginPayload);

  response = await utils.createOrder(orderPayload);
});

test("web api testing", async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();

    if (response.orderId === rowOrderId.trim()) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();

  expect(orderIdDetails.includes(response.orderId)).toBeTruthy();
});