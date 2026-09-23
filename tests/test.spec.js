const { test, expect } = require('@playwright/test');


// test('new locators test',async ({page})=>{
// // Another Way of timout is for only this test 
// const slowtest= expect.configure({timeout: '10000'});
// await page.goto('https://rahulshettyacademy.com/angularpractice/');
// await page.getByLabel('Gender').click();
// await page.getByLabel('Student').click();
// await page.getByLabel('Gender').selectOption('Female');
// await page.getByPlaceholder('Password').fill('user123');
// await page.getByRole('Button',{name:'Submit'}).click();
// await page.getByText('Success! The Form has been submitted successfully!').isVisible();
// // THIS TIMEOUT(FOR EXPECT ASSERTIONS) IS ON STEP LEVEL AND YOU CAN
// //  USE IT WHEN YOU THINK THIS PARTICULAR FEATURE IS TAKING MORE TIME TO LOAD
// await expect(page.getByText('Success! The Form has been submitted successfully!').toBeVisible({setTimeout: '10_000'}));
// await page.getByRole('link',{name: "Shop"}).click();
// await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click({timeout: '60000'});// this is action timout set on step level 

// page.setDefaultTimeout('10000') ///     this timout for actions button only and on test level 
// test.timeout('600000')  // THIS TIMEOUT IS FOR ONLY ONE WHOLE TEST, AND CAN NOT BE USE ON STEP LEVEL 
// // This is one single cumulative clock — it does NOT reset between steps.
// // test.slow() triples the default (30s → 90s) without typing a number.
// })

// const [newpage] = await Promise.all([
// context.waitForEvent('page')
// learn

// ])


test('new locators playwright test',async ({page})=>{
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("passsword").fill("Iamking@000");
   await page.getByRole('button',{name:'Login'}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'}).getByRole('button',{name: 'Add To Cart'}).click();
   await page.getByRole('listitem').getByRole('button',{name: 'Cart'}).click();

   await page.locator("div li").first().waitFor();

   await page.getByRole('button',{name: 'Checkout'}).click();
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   await page.getByRole('button',{name: 'India'}).nth(1).click();
   await page.getByText('PLACE ORDER').click();

   await page.locator(".box").first().waitFor();
   await expect(page.getByText('THANKYOU FOR THE ORDER.')).toBeVisible();


});















