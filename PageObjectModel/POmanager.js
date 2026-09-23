const {LoginPage}= require('./loginPage');
const {DashBoard} = require('./DashBoard');
const {Checkout}= require('./Checkout');
const {OrderHistory}= require('./OrderHistory');

class POmanager{

constructor(page){
    this.page=page
this.loginpage= new LoginPage(this.page);
this.dashBoard= new DashBoard(this.page)
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