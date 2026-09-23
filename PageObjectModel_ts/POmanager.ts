import { Page } from '@playwright/test';

import { LoginPage } from './LoginPage';
import {DashBoard} from './DashBoard'
import {Checkout} from './Checkout'
import {OrderHistory} from './OrderHistory'
// import { Page } from '@playwright/test'
export class POmanager{
page:Page;
loginpage: LoginPage;
dashBoard: DashBoard;
checkout: Checkout;
orderhistory:OrderHistory;

constructor(page: Page){
    this.page=page
this.loginpage= new LoginPage(this.page);
this.dashBoard= new DashBoard(this.page);
this.checkout= new Checkout(this.page);
this.orderhistory= new OrderHistory(this.page);
}

getLogin(){

return this.loginpage

}

dashBoardpage(){

    return this.dashBoard;
}
checkoutpage(){

    return this.checkout;
}
orderhistorypage(){

    return this.orderhistory;
}


}
module.exports= {POmanager};