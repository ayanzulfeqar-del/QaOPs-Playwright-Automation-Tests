import { Page ,type Locator} from "@playwright/test";

export class DashBoard {
page:Page
products: Locator;
waitfor:Locator;
cartlaod: Locator;
clickcart: Locator;
verifycart: Locator;

constructor(page:Page){
this.page=page;
this.products = page.locator(".card-body");
this.waitfor=page.locator(".card-body b");
this.cartlaod= page.locator('.cartSection h3');
this.products=page.locator(".card-body");
this.clickcart= page.locator("[routerlink*='cart']");
this.verifycart= page.locator('div li');
};
async addToCart(productName:string){
await this.waitfor.first().waitFor()
const count= await this.products.count();
for (let i = 0; i < count; ++i) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
      //add to cart
       await this.products.nth(i).locator("text= Add To Cart").click();
       break;
      }
    };
   
       await this.clickcart.click();
     await this.cartlaod.waitFor();
    
}
}
module.exports={DashBoard};