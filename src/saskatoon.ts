import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import { cacheable } from "./cacheable";

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Get the project listing from the Saskatoon Engage website
 * @param url
 */
export const saskatoonEngageProjectListing = async (
  url: string,
): Promise<any[]> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(process.env.USER_AGENT || "");

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

/**
 * Get the timeline data from the Saskatoon Engage project page
 * @param html
 */
export const saskatoonEngageProjectTimelineData = async (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  let data: any[] = [];

  const items = document.querySelectorAll(".timeline-wrap");

  for (const item of items) {
    let status = "inactive";
    if (item.classList.contains("completed")) {
      status = "completed";
    } else if (item.classList.contains("active")) {
      status = "active";
    }
    let title = item.querySelector("h4")?.textContent;
    let description = item.querySelector(
      ".field--name-field-engage-details",
    )?.textContent;
    data.push({
      status,
      title,
      description,
    });
  }

  return data;
};

/**
 * Get the project timeline from the Saskatoon Engage website
 * @param url
 */
export const saskatoonEngageProjectTimeline = async (url: string) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(process.env.USER_AGENT || "");

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

/**
 * Get the project listing with timeline data from the Saskatoon Engage website
 * @param url
 */
export const saskatoonEngageProjects = async (url: string) => {
  const projects = await cacheable(saskatoonEngageProjectListing, url);

  for (const project of projects) {
    const { html } = await cacheable(
      saskatoonEngageProjectTimeline,
      project.href,
    );

    const timelineData = await saskatoonEngageProjectTimelineData(html);
    project.timelineData = timelineData;
  }
  return projects;
};
