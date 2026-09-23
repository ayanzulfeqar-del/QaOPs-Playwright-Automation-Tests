class LoginPage{
constructor(page){
    this.page=page;
   this.username= page.locator("#userEmail");
   this.password= page.locator("#userPassword");
   this.signinbutn= page.locator("[value='Login']");
   
}

async goto(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(username,password){
  await this.username.fill(username)
  await this.password.fill(password)
  await this.signinbutn.click();

}
}
module.exports={LoginPage};