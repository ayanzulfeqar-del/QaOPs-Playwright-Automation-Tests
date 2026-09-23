const {When,Then,Given}= require('@cucumber/cucumber');



Given('i want to login on my website using this username {string} and password  {string}', async function (username, password) {
    
 const loginPage= this.pomanager.getLogin();
   await loginPage.goto();
   await loginPage.validLogin(username,password);
});

Then('any product name that is matching with this name {string} click the add to cart button',async function (productName) {
   const dashboard= this.pomanager.dashBoardpage()
 await dashboard.addToCart(productName)

});

Then('after landing into cart section click on it user should see the thankyou message',async  function () {
      const checkout= this.pomanager.checkoutpage();
await checkout.checkoutZara();
});

When('click on the orderhistory button to see the order summary', async function () {
  const orderhistory= this.pomanager.orderhistorypage();
 await orderhistory.orderhistorydet();
});

