 const {test,expect} = require('@playwright/test');
const {POmanager}=  require('../PageObjectModel/POmanager');
const dataset= JSON.parse(JSON.stringify(require('../utils/PlaceorderTestData.json')));
// JSON > TO STRING > JS OBJECT
for(let data of dataset){
test(`@Webst Client page object test${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage

  const pomanager=  new POmanager(page);
   const loginPage= pomanager.getLogin();
   await loginPage.goto();
   await loginPage.validLogin(data.username,data.password);

   const dashboard= pomanager.dashBoardpage()
 await dashboard.addToCart(data.productName)
  
   const checkout= pomanager.checkoutpage();
await checkout.checkoutZara();

const orderhistory= pomanager.orderhistorypage();
 await  orderhistory.orderhistorydet();

});
}