const { expect } = require("@playwright/test");

class OrderHistory{
constructor(page){

this.orderId= page.locator(".em-spacer-1 .ng-star-inserted");
this.orderhisButton=page.getByText('Orders History Page')
this.waitforpro= page.locator("tr[class*='ng-star-inserted']");
this.ordertextcon=  page.getByText('ORDER SUMMARY');
this.orderview= page.locator("button[class*='btn-primary']");
}
async orderhistorydet(){
console.log(this.orderId);
const clickhistory= await this.orderhisButton.click();
await this.waitforpro.nth(0).waitFor();
await this.orderview.first().click();
await expect(this.ordertextcon).toBeVisible();
}
}
module.exports={OrderHistory};