const { test, expect } = require('@playwright/test');
const testData = require('../utils/eventHubTestData.json');
const { EventHubLoginPage } = require('../PageObjectModel/EventHubLoginPage');
const { EventHubAdminEventsPage } = require('../PageObjectModel/EventHubAdminEventsPage');
const { EventHubEventDetailsPage } = require('../PageObjectModel/EventHubEventDetailsPage');
const { EventHubBookingsPage } = require('../PageObjectModel/EventHubBookingsPage');

test.describe('EventHub event and booking workflows', () => {
  test('creates an event and books tickets', async ({ page }) => {
    const loginPage = new EventHubLoginPage(page, testData.baseUrl);
    const adminEventsPage = new EventHubAdminEventsPage(page, testData.baseUrl);
    const eventDetailsPage = new EventHubEventDetailsPage(page, testData.baseUrl);
    const bookingsPage = new EventHubBookingsPage(page, testData.baseUrl);
    const event = {
      ...testData.event,
      title: `${testData.event.title} ${Date.now()}`
    };

    await loginPage.goto();
    await loginPage.loginWithAccount(testData.accounts.eventOwner);
    await expect(page).toHaveURL(`${testData.baseUrl}/`);

    await adminEventsPage.goto();
    await adminEventsPage.addEvent(event);
    await expect(adminEventsPage.successAlert).toContainText('Event created');
    await expect(adminEventsPage.eventRow(event.title)).toContainText(event.city);

    const eventUrl = await adminEventsPage.getEventUrl(event.title);
    await eventDetailsPage.goto(eventUrl);
    await eventDetailsPage.bookTickets(testData.booking);
    await expect(eventDetailsPage.bookingConfirmation).toBeVisible();

    const bookingReference = await eventDetailsPage.getBookingReference();
    expect(bookingReference).toMatch(/^[A-Z0-9-]+$/);

    await bookingsPage.goto();
    await expect(bookingsPage.bookingForEvent(event.title)).toBeVisible();
    await expect(bookingsPage.bookingReference(bookingReference)).toBeVisible();
  });

  test('rejects the secondary account when its supplied password is invalid', async ({ page }) => {
    const loginPage = new EventHubLoginPage(page, testData.baseUrl);

    await loginPage.goto();
    await loginPage.loginWithAccount(testData.accounts.secondary);
    await expect(loginPage.alert).toContainText('Invalid email or password');
  });
});
