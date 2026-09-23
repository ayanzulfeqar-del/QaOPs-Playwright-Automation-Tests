const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { POmanager } = require('../../../PageObjectModel/POmanager');

setDefaultTimeout(20 * 1000);


Before(async function () {
 const browser = await chromium.launch({
  channel: 'chrome',
  headless: false
});
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.pomanager = new POmanager(this.page);
});

After(async function () {
  console.log("iam the last to execute");
});

AfterStep(async function (result){
if(result.status === Status.FAILED){
  await this.page.screenshot({path: 'first ss in cucumber.png'});
}
});