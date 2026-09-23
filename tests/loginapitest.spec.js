const { test, request } = require("@playwright/test");
const { LoginUTils } = require('../utils/loginUTils');
const logindata={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
let token;


test.beforeAll(async ()=>{
const myapicontext =await request.newContext();
//  const loginresponce= await myapicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
//   {
//     data: logindata,
//   }
//   );
// expect(loginresponce.ok()).toBeTruthy();
// const responcejson= await loginresponce.json();
// console.log(responcejson);
//   token =responcejson.token;
// console.log(token);

const utils =  new LoginUTils(myapicontext,logindata)
token = await utils.getToken();
})

test('event api login test',async ({page})=>{
await page.addInitScript((value)=>{
window.localStorage.setItem('token',value);
},token )
await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash')
 const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
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
  })