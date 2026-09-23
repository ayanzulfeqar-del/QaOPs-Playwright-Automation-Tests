import { Page ,type Locator} from "@playwright/test";
import { expect } from '@playwright/test'
export class Checkout {
    
 cartvisibility: Locator;
 checkoutbtn:Locator;
 selectcountry:Locator;
 dropdown: Locator;
 selectioncountry: Locator;
 orderbtn: Locator;
 thanksmsg: Locator;

constructor(page:Page){

this.cartvisibility= page.locator('.cartSection h3');
this.checkoutbtn= page.getByRole('button',{name: 'Checkout'});
this.selectcountry= page.getByPlaceholder('Select Country')
this.dropdown= page.locator(".ta-results");
this.selectioncountry=page.getByRole('button',{name: 'India'});
this.orderbtn=page.getByText('PLACE ORDER');
this.thanksmsg= page.getByText('THANKYOU FOR THE ORDER.');

};
async checkoutZara(){

await this.cartvisibility.waitFor();
await this.checkoutbtn.click();
await this.selectcountry.pressSequentially("ind", { delay: 150 });
await this.dropdown.waitFor();
await this.selectioncountry.nth(1).click();
await this.orderbtn.click();
await expect(this.thanksmsg).toBeVisible();
}
}
module.exports={Checkout};
