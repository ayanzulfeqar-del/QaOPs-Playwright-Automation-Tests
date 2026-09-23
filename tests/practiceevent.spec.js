const { test, expect, request } = require("@playwright/test");
const logindata = { email: "yaho@gmail.com", password: "Yaho12@?" };
const bookingdet = {
  customerName: "Ayan Jutt",
  customerEmail: "ayanj5777@gmail.com",
  customerPhone: "+912345656878",
  quantity: "2",
};
let token;
let yahobookingid;
test.beforeAll(async () => {
  const apicontext = await request.newContext();
  const loginres = await apicontext.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
      data: logindata,
    },
  );
  await expect(loginres.ok()).toBeTruthy();
  const jsonres = await loginres.json();
  token = jsonres.token;
  console.log(token);

  const idres = await apicontext.get(
    "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const datajson = await idres.json();
  const eventid = datajson.data[0].id;
  const bookingres = await apicontext.post(
    "https://api.eventhub.rahulshettyacademy.com/api/bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        eventId: eventid,
        customerName: "Ayan Jutt",
        customerEmail: "ayanj5777@gmail.com",
        customerPhone: "+912345656878",
        quantity: 2,
      },
    },
  );
  await expect(bookingres.ok()).toBeTruthy();
  const bookingjson = await bookingres.json();
  yahobookingid = bookingjson.data.id;
  console.log(yahobookingid);
});

test("practice test assignment no 14", async ({ page }) => {
  //    page.addInitScript((value)=>{
  //          window.localStorage.setItem('token',value);
  //    },token)
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByLabel("Email").fill("gmail@gmail.com");

  await page.getByLabel("Password").fill("User12@?");

  console.log("Password filled");

  await page.getByRole("button", { name: "Sign In" }).click();

  console.log("Sign in clicked");

  await page.waitForLoadState("networkidle");

  console.log("After login URL:", page.url());

  await page.goto(
    `https://eventhub.rahulshettyacademy.com/bookings/${yahobookingid}`,
    { waitUntil: "networkidle" },
  );

  console.log("Booking URL:", page.url());

  await expect(
    page.getByText("You are not authorized to view this booking"),
  ).toBeVisible();
  await expect(page.getByText("Access Denied")).toBeVisible();
});
