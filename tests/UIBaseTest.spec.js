const {test,expect} = require('@playwright/test');
const { promises } = require('fs');
const { title } = require('process');


// WE USE BROWSER TO ADD A FRESH PAGE WITH SPECIFIC CONDITIONS LIKE PLUUGGINS 0R COCKIES 

// test('browser context playwright test',async ({browser})=>{
// const context =await browser.newContext();
// const page=await context.newPage();
// await page.goto('https://www.google.com/');
// console.log(await page.title());
// await expect(page).toHaveTitle('Google');
// })

// let prodcut= await page.locator(".col").nth(0).textContent();
// console.log(prodcut);
// })


test('page fixture playwright test',async ({page})=>{
await page.goto('https://www.qapractice.com/practice-login-form');


// // locators
const username= page.locator("#login-email");
const password=page.locator("#login-password");
const loginbtn= page.locator("#login-submit");
const msg = page.locator("#login-success")
const errormsg= page.locator("#login-error");
// false condition 

          await username.fill('user@premiumbank.com');
          await password.fill('Bank@1234');
          await loginbtn.click();
          console.log(await errormsg.textContent());
          await expect(errormsg).toContainText("Invalid");
// true condition 

await username.fill('user@premiumbank.com');
await password.fill('');
await password.fill('Bank@123');
await loginbtn.click();
let finalmsg= await expect(msg).toContainText("Successful!");
console.log(finalmsg);

});
//   QA DEMO LOGIN WEBSITE 

test('practice test num two',async ({page})=>{
await page.goto('https://qademo.com/login');

await page.locator("#username").fill('ayanj5777');
await page.locator('#password').fill("User123?");
await page.locator('[type="submit"]').click();
await page.locator(".p-5 h3").first().waitFor();
const final= await page.locator(".p-5 h3").allTextContents();
console.log(final);

})

test("ui form base test",async ({page})=>{
await page.goto('https://www.qapractice.com/practice-forms');

const emailcheck =page.locator('#forms-comm-email');
const phonechec= page.locator('#forms-comm-phone');
// FROM SELECTION 
await page.locator('select#forms-country').click();
await page.locator('select#forms-country').selectOption("United States");
// await page.pause();
// RADIO BUTTON CHECKED OR NOT 
await emailcheck.check();
console.log(await emailcheck.isChecked());
await expect(emailcheck).toBeChecked();
// await page.pause();
await phonechec.check();
await expect(phonechec).toBeChecked();
})

// ONE PAGE TO ANOTHER 
test("child winddow handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://qapracticehub.com/?utm_');

  const learn = page.getByTestId('nav-languages-top');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    learn.nth(0).click()
  ]);

  const text = await newPage.locator('.section-desc').textContent();
  console.log(text);
const arraytext = text.split('Pick')[0].trim();

console.log(arraytext);

});
test('e-commerce end to end test', async({ page}) =>{
    await page.goto('https://qademo.com/login');
    const products= page.locator('.p-5');
    const productname= 'Bluetooth Speaker';
    await page.locator('#username').fill('ayanj5777@gmail.com');
    await page.locator('#password').fill('User123?');
    await page.getByTestId('login-submit-button').click();
await page.locator('.p-5 h3').first().waitFor();
const titles =await page.locator('.p-5 h3').allTextContents();
console.log(titles);
const count = await products.count();

for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator('h3').textContent() === productname)
   { 
        await products.nth(i).locator('text=Add').click();
        await page.pause();
        break;
    }
}


})

 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const password= "Iamking@000";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
      //add to cart
       await products.nth(i).locator("text= Add To Cart").click();
       break;
      }
    }
    await page.locator("[routerlink*='cart']").click();
   
    await page.locator('.cartSection h3').waitFor();
await expect(page.locator('.cartSection h3')).toBeVisible();
    await page.locator(".totalRow button").click();
    await page.getByPlaceholder('Select Country').pressSequentially('pak',{delay:150})
    await page.locator('.ta-results').click();
   await page.locator('input.input.txt.text-validated').first().waitFor()
   await page.locator('input.input.txt.text-validated').first().fill('4542 9931 9292 2293');
  //  await page.pause();
  await page.locator('select.input.ddl').first().click();
await page.locator('select.input.ddl').nth('0').selectOption('04');
    await page.pause();

  })