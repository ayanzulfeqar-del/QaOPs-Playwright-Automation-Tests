
import Exceljs from "exceljs";
import { test, expect } from "@playwright/test";

type CellChange = {
  rowchange: number;
  columnchange: number;
};

async function writeExcel(
  selectText: string,
  change: CellChange,
  replaceText: string,
  filePath: string,
) {
  const workbook = new Exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("Sheet1");
  if (!worksheet) {
    throw new Error('Worksheet "Sheet1" was not found');
  }

  const output = await readExcel(worksheet, selectText);

  const cell = worksheet.getCell(
    output.row,
    output.column + change.columnchange,
  );

  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet:any, selectText:string) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row:any, rownumber:any) => {
    row.eachCell((cell:any, colnumber:any) => {
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