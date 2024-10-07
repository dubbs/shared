import puppeteer, { Page } from "puppeteer";
import crypto from "crypto";
import fs from "fs";
import { mdFromHtml, mdToHtml } from "./markdown";

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const cacheable = async (fn: any, url: string): Promise<any> => {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  const fnName = fn.name;
  const filename = `./public/cache/${fnName}-${hash}.json`;
  let data: any = null;
  if (fs.existsSync(filename)) {
    data = JSON.parse(fs.readFileSync(filename, "utf8"));

    // const fileContents = fs.readFileSync(filename, "utf8");
    // if (fileContents.startsWith("{") || fileContents.startsWith("[")) {
    //   console.log("good");
    //   data = JSON.parse(fs.readFileSync(filename, "utf8"));
    // } else {
    //   console.log("bad", url);
    //   data = {
    //     html: fileContents,
    //   };
    //   fs.writeFileSync(filename, JSON.stringify(data));
    // }
  } else {
    // console.log("not found", url);
    data = await fn(url);
    if (!fs.existsSync("./public/cache")) {
      fs.mkdirSync("./public/cache");
    }
    fs.writeFileSync(filename, JSON.stringify(data));
  }
  return data;
};

export const puppeteerPageFromUrl = async (url: string): Promise<Page> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
  );

  await page.goto(url);
  return page;
};

export const saskatoonEngageProjects = async (url: string): Promise<any[]> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
  );

  await page.goto(url);

  let loadMoreButtonVisible = true;
  while (loadMoreButtonVisible) {
    try {
      await page.waitForSelector("a.button", { timeout: 15000 });
      await page.click("a.button");
      await waitFor(1000);
    } catch (error) {
      loadMoreButtonVisible = false;
    }
  }

  let projects: any[] = [];

  const elements = await page.$$(".views-element-container");
  for (const element of elements) {
    const h1 = await element.$("h1");
    const category = await page.evaluate((el) => el?.textContent, h1);
    const cols = await element.$$(".views-col");
    for (const col of cols) {
      const contentSection = await col.$(".content-section");
      const link = await contentSection?.$("a");
      const title = await page.evaluate((el) => el?.textContent, link);
      const href = await page.evaluate((el) => el?.href, link);
      const descElement = await contentSection?.$("p");
      const description = await page.evaluate(
        (el) => el?.textContent,
        descElement,
      );
      const project = {
        category,
        title,
        href,
        description,
      };
      projects.push(project);
    }
  }

  await browser.close();

  return projects;
};

export const saskatoonEngageProjectTimeline = async (url: string) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
  );

  await page.goto(url);
  const timeline = await page.evaluate(() => {
    return {
      html:
        document.querySelector("#engagement-timeline")?.innerHTML ||
        "No timeline found",
    };
  });
  await browser.close();
  return timeline;
};

const projects = await cacheable(
  saskatoonEngageProjects,
  "https://www.saskatoon.ca/engage/projects",
);
for (const project of projects) {
  const { html } = await cacheable(
    saskatoonEngageProjectTimeline,
    project.href,
  );
  project.timeline = mdToHtml(mdFromHtml(`<ul>${html}</ul>`));
  console.log(project);
}
// try {
//   const project = await saskatoonEngageProject(
//     "https://www.saskatoon.ca/AdilmanandGoerzen",
//   );
//   console.log(JSON.stringify(project, null, 2));
// } catch (e) {
//   console.log(e);
// }
