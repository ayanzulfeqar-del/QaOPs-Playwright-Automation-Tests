import { type Locator, type Page } from '@playwright/test';
let a:number = 3;
a= 2;
console.log(a);

let arr:number[]= [2,32,3,4,4,5]

function add (a:number ,b:number){
return a*b;
}
add(2,4);


let object:{name:string, age: number}={name: 'ayan', age:17} 
console.log(object);

// class LoginPage{
//     page:Page;
//     username:Locator;
//     password:Locator;
//     signinbutn: Locator;
// constructor(page:any){
//     this.page=page;
//    this.username= page.locator("#userEmail");
//    this.password= page.locator("#userPassword");
//    this.signinbutn= page.locator("[value='Login']");
   
// }
// }

