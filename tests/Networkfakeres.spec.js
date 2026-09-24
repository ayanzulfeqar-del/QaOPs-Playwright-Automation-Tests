const { test, expect, request } = require("@playwright/test");
const noordermsg = { data: [], message: "No Orders" };
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

const orderPayload = {
  orders: [
    {
      country: "Pakistan",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload },
  );
  const loginResult = await loginResponse.json();
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: { Authorization: `Bearer ${loginResult.token}` },
    },
  );

  response = {
    token: loginResult.token,
    orderId: (await orderResponse.json()).orders?.[0],
  };
  await apiContext.dispose();
});

test("fake responce test 1", async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca",
    async (route) => {
      const responce = await page.request.fetch(route.request());
      let body = JSON.stringify(noordermsg);
      await route.fulfill({
        responce,
        body,
      });
    },
  );
  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();
  // await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca')
  //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
}); //  THERE IS TWO METHODS OF INTERCEPTING THE NETWORK CALL YOU CAN SEE IT HERE

test("2nd netwrok intercept test", async ({ page }) => {
  await page.route("**/*.{jpg,png}", (route) => route.abort());
  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.getByRole("button", { name: "Orders" }).click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/244v4vh3v5bjb35j3k",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
});

// route abort method is very useful
test("3rd netwrok intercept test", async ({ page }) => {
  await page.route("**/*.{jpeg}", (route) => route.abort());
  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  page.on("request", (request) => console.log(request.url()));
  page.on("responce", (response) =>
    console.log(response.url(), response.status()),
  );
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.pause();
});
