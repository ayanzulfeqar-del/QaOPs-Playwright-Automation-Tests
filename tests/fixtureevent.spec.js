const { test, expect } = require("../utils/eventFixture");


test(
  "practice fixture test",
  async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
  await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
  },
);
