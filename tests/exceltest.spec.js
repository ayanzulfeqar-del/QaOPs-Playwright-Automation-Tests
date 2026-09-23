const Exceljs = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeExcel(selectText, change, replaceText, filePath) {
  const workbook = new Exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, selectText);

  const cell = worksheet.getCell(
    output.row,
    output.column + change.columnchange,
  );

  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, selectText) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rownumber) => {
    row.eachCell((cell, colnumber) => {
      if (cell.value === selectText) {
        output.row = rownumber;
        output.column = colnumber;
      }
    });
  });

  return output;
}

test("exceljs practice test", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );

  const filePath = "C:\\Users\\Ayan\\Downloads\\exceltest1.xlsx";
  const priceafter = '350';
  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("button", { name: "download" }).click();

  const download = await downloadPromise;
  await download.saveAs(filePath);

  await writeExcel(
    "Mango",
    { rowchange: 0, columnchange: 2 },
    priceafter,
    filePath,
  );

  await page.locator("#fileinput").setInputFiles(filePath);

  const textlocator = page.getByText("Mango");
  const desiredrow = page.getByRole("row").filter({ has: textlocator });
  await expect(desiredrow).toContainText(priceafter);
});