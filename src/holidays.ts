import { JSDOM } from "jsdom";

export type Holiday = {
  date: string;
  holiday: string;
  type: string;
};

export const holidays = async () => {
  const html = await fetch("https://www.timeanddate.com/holidays/canada/");
  const text = await html.text();

  let data: Holiday[] = [];

  const dom = new JSDOM(text);
  const document = dom.window.document;
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const tbody = table.querySelector("tbody") as HTMLTableSectionElement;
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row) => {
      let item = {} as Holiday;
      const columns = row.querySelectorAll("th, td");
      columns.forEach((column, index) => {
        if (index === 0) {
          item.date = column.textContent?.trim() || "";
        } else if (index === 1) {
          // item.day = column.textContent.trim();
        } else if (index === 2) {
          item.holiday = column.textContent?.trim() || "";
        } else if (index === 3) {
          item.type = column.textContent?.trim() || "";
        } else if (index === 4) {
          // item.details = column.textContent.trim();
        }
      });

      if (item.date) {
        data.push(item);
      }
    });
  });

  data = data.filter((holiday) => {
    if (holiday.type.toLowerCase().includes("muslim")) {
      return false;
    }
    if (holiday.type.toLowerCase().includes("jewish")) {
      return false;
    }
    if (holiday.type.toLowerCase().includes("orthodox")) {
      return false;
    }
    return true;
  });

  return data;
};
