class LoginUTils {

constructor (myapicontext,logindata){
    this.myapicontext= myapicontext;
    this.logindata= logindata;
}

async getToken(){
     const loginresponce= await this.myapicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.logindata,
      }
      );
    if (!loginresponce.ok()) {
      throw new Error(`Login failed with status ${loginresponce.status()}`);
    }
    const responcejson= await loginresponce.json();
    console.log(responcejson);
     const token =responcejson.token;
    console.log(token);
   return token;
  
}
}
module.exports= {LoginUTils};