const { expect } = require('@playwright/test');
const { customtest } = require('../utils/fixturesdemo.js');


customtest('authenticated page is visible', async ({ authenticatepage,createOrder,getData}) => {
    
	await expect(authenticatepage.locator('.card-body b').first()).toBeVisible();
  await authenticatepage.locator("button[routerlink*='myorders']").click();
  await expect(authenticatepage.getByText(createOrder.orderId)).toBeVisible();
  console.log(getData.productname);
});


