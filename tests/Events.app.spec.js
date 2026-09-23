const { test, expect } = require("@playwright/test");

test('Event client website test',async ({page})=>{
   await page.goto("https://eventhub.rahulshettyacademy.com/login");

await page.getByPlaceholder('you@email.com').fill('user12@gmail.com');
await page.getByLabel('password').fill('User123?');
await page.getByRole('button',{name: 'Sign in'}).click();
const welcomepage = page.getByText('From tech');
await expect(welcomepage).toBeVisible();
await page.getByRole('button',{name: 'Admin'}).click();
await page.locator("[class*='absolute'] a").nth(0).click();
await page.getByLabel('Title').type('Laptop Booking Event');
await page.getByPlaceholder('Describe the event…').fill('This is a professional event made by ayan and where you can buy laptop');
await page.getByLabel('category').selectOption('Workshop');
await page.getByLabel('city').fill('pakistan');
await page.getByLabel('venue').fill('My address is sialkot');
await page.getByLabel('Event Date & Time').fill("2026-09-16T10:04");
await page.getByLabel('Price ($)').fill('25');
await page.getByLabel('Total Seats').fill('1');
await page.getByRole('button',{name: 'Add Event'}).click();
const confmsg= page.getByText('Event Created');
await expect(confmsg).toBeVisible();
await page.getByTestId('nav-events').click();

const booknowvisible= page.getByRole('heading',{name: 'Upcoming Events'});

await expect(booknowvisible).toBeVisible();
await page.getByRole('link',{name: 'ayan'}).click();


const waitfpage= page.locator("h2[class*='text-lg']")
await expect(waitfpage).toBeVisible();
await page.getByLabel('Full Name').fill('User');
await page.getByLabel('Email').fill('user12@gmail.com');
await page.getByLabel('Phone Number').fill("+92466681322");
await page.getByRole('button',{name: 'Confirm Booking'}).click();
const wait= page.locator("span[class*='booking-ref']")
await expect(wait).toBeVisible();
 // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator("h1[class*='mb-4']").innerText();
  const uppercase= eventTitle.trim()[0].toUpperCase();
  expect(bookingRef.charAt(0)).toBe(uppercase.charAt(0));
 await page.getByRole('button',{name: 'View My Bookings',exact: true}).click();  
await expect(page.getByText('View and manage all your ticket bookings')).toBeVisible();
await page.locator('#booking-card').nth(0).getByRole('button',{name: 'View Details',exact: true}).click();
await expect(page.getByRole('heading',{name: 'Refund'})).toBeVisible();
const finalmsg= await page.getByRole('button',{name: 'Check eligibility for refund'}).click();
await expect(page.getByText('Eligible for refund.')).toBeVisible();
 
})

// source code

// import { test, expect } from '@playwright/test';

// const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';

// // Change these to match a registered account in your local sandbox
// const GMAIL_USER = { email: 'rahulshetty1@gmail.com', password: 'Magiclife1!' };

// async function loginAndGoToBooking(page) {
//   await page.goto(`${BASE_URL}/login`);
//   await page.getByLabel('Email').fill(GMAIL_USER.email);
//   await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
//   await page.locator('#login-btn').click();
//   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
// }

// // ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
// test('refund eligible for single ticket booking', async ({ page }) => {
//   await loginAndGoToBooking(page);

//   // Book event with 1 ticket via UI
//   await page.goto(`${BASE_URL}/events`);
//   await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();


//   await page.getByLabel('Full Name').fill('Test User');
//   await page.locator('#customer-email').fill(GMAIL_USER.email);
//   await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
//   await page.locator('.confirm-booking-btn').click();

//   // Navigate to booking detail
//   await page.getByRole('link', { name: 'View My Bookings' }).click();
//   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
//   await page.getByRole('link', { name: 'View Details' }).first().click();
//   await expect(page.getByText('Booking Information')).toBeVisible();

//   // Validate booking ref first letter matches event name first letter
//   const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
//   const eventTitle = await page.locator('h1').innerText();
//   expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

//   await page.locator('#check-refund-btn').click();

//   // Spinner must appear immediately
//   await expect(page.locator('#refund-spinner')).toBeVisible();

//   // Wait for spinner to disappear after 4s
//   await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

//   // Validate eligible message
//   const result = page.locator('#refund-result');
//   await expect(result).toBeVisible();
//   await expect(result).toContainText('Eligible for refund');
//   await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
// });

// // ── Test 2: 3 tickets → not eligible ─────────────────────────────────────────
// test('refund not eligible for group ticket booking', async ({ page }) => {
//   await loginAndGoToBooking(page);

//   // Book event with 3 tickets via UI
//   await page.goto(`${BASE_URL}/events`);
//   await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();


//   // Increase quantity to 3
//   await page.locator('button:has-text("+")').click();
//   await page.locator('button:has-text("+")').click();

//   await page.getByLabel('Full Name').fill('Test User');
//   await page.locator('#customer-email').fill(GMAIL_USER.email);
//   await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
//   await page.locator('.confirm-booking-btn').click();

//   // Navigate to booking detail
//   await page.getByRole('link', { name: 'View My Bookings' }).click();
//   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
//   await page.getByRole('link', { name: 'View Details' }).first().click();
//   await expect(page.getByText('Booking Information')).toBeVisible();

//   // Validate booking ref first letter matches event name first letter
//   const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
//   const eventTitle = await page.locator('h1').innerText();
//   expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

//   await page.locator('#check-refund-btn').click();

//   // Spinner must appear immediately
//   await expect(page.locator('#refund-spinner')).toBeVisible();

//   // Wait for spinner to disappear after 4s
//   await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

//   // Validate ineligible message
//   const result = page.locator('#refund-result');
//   await expect(result).toBeVisible();
//   await expect(result).toContainText('Not eligible for refund');
//   await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
// });