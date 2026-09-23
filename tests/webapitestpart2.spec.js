const path = require("path");
const { test } = require("@playwright/test");
let webContext;

test.beforeAll(async ({browser})=>{

//1 test
 const context = await browser.newContext();
 const page = await context.newPage();

   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.locator(".card-body b").first().waitFor();
   await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

})
// test without login just call api  
// this will help you to excute your test serial and parallel

test.describe.configure({mode: 'parallel'}); 

test('@API this is test 2 for exam',async ()=>{
const page= await webContext.newPage('state.json');
 await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

})
// test with out login just call api
test('@API test no 3',async ()=>{
const page= await webContext.newPage('state.json');
const products = page.locator(".card-body");
 const productName = 'ZARA COAT 3';
 await page.goto("https://rahulshettyacademy.com/client");
 await page.locator(".card-body b").first().waitFor();
 const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 

})






