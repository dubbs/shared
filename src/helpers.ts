import puppeteer from "puppeteer";
import fs from "fs";
import crypto from "crypto";
import { fetchJson } from "./fetch";

/**
 * Delay
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Meta Critic Games
 */
export const metaCriticGames = async (): Promise<unknown> => {
  let json = await fetchJson(
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&gamePlatformIds=1500000129&page=2&releaseYearMin=1958&releaseYearMax=2024&offset=24&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u",
  );

  let items = [...json.data.items];

  while (json.links.next?.href) {
    json = await fetchJson(json.links.next.href);
    items = items.concat(json.data.items);
  }

  return items;
};

/**
 * Get a list of Xbox gamepass ids
 */
export const xboxGamePassIds = async (): Promise<string[]> => {
  let json = await fetchJson(
    "https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-ca&market=CA",
  );
  return json.slice(1).map((item: any) => item.id);
};

/**
 * Gamepass Catalog Urls
 */
export const xboxGamePassCatalogUrls = async (): Promise<string[]> => {
  const ids = await xboxGamePassIds();

  const chunks: string[][] = [];
  while (ids.length) {
    chunks.push(ids.splice(0, 20));
  }

  return chunks.map(
    (chunk) =>
      `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${chunk.join(
        ",",
      )}&market=CA&languages=en-ca`,
  );
};

/**
 * Xbox Game Pass Game
 */
export const xboxGamePassGame = (game: any) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const [score, scoreCount] = game.MarketProperties[0].UsageData.reduce(
    (acc: any, val: any) => {
      if (val.AggregateTimeSpan === "AllTime") {
        return [val.AverageRating, val.RatingCount];
      }
      return acc;
    },
    [],
  );
  return {
    id: game.ProductId,
    category: game.Properties.Category,
    title: game.LocalizedProperties[0].ProductTitle,
    description: game.LocalizedProperties[0].ShortDescription,
    publisher: game.LocalizedProperties[0].PublisherName,
    compatible: game.Properties.XboxConsoleGenCompatible ?? [], // gen8, xbox one, gen9, series x/s
    releaseDate: game.MarketProperties[0].OriginalReleaseDate,
    url: `https://www.xbox.com/en-ca/games/store/${slugify(
      game.LocalizedProperties[0].ProductTitle,
    )}/${game.ProductId}`,
    score,
    scoreCount,
    // XblLocalCoop,
    images: game.LocalizedProperties[0].Images.map((y: any) => {
      if (y.ImagePurpose === "FeaturePromotionalSquareArt") {
        return {
          url: y.Uri,
          height: y.Height,
          width: y.Width,
        };
      }
    }).filter((x: any) => x),
  };
};

/**
 * Xbox Game Pass Games
 */
export const xboxGamePassGames = async (): Promise<any> => {
  let filenameGames = `./public/xbox-cache/gamepass-all.json`;
  if (fs.existsSync(filenameGames)) {
    return JSON.parse(fs.readFileSync(filenameGames, "utf8"));
  }

  let games: any[] = [];
  const urls = await xboxGamePassCatalogUrls();
  for (let url of urls) {
    const slug = url.replaceAll(/[:/.,=&-?]/gi, "_");
    const hash = crypto.createHash("md5").update(slug).digest("hex");
    const filename = `./public/xbox-cache/gamepass-${hash}.json`;
    let data: any = null;
    if (fs.existsSync(filename)) {
      data = JSON.parse(fs.readFileSync(filename, "utf8"));
    } else {
      data = await fetchJson(url);
      fs.writeFileSync(filename, JSON.stringify(data));
    }

    for (let product of data.Products) {
      let game = xboxGamePassGame(product);
      games.push(game);
    }
  }

  fs.writeFileSync(filenameGames, JSON.stringify(games));
  return games;
};

/**
 * Xbox Game Pass Games Puppeteer
 */
export const xboxGamePassGamesPuppeteer = async (): Promise<any> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("https://www.xbox.com/en-CA/xbox-game-pass/games");

  await page.setViewport({
    height: 1024,
    width: 1080,
  });

  await page.locator(".gameDivsWrapper section").wait();

  await page.locator(".drawerContainer").wait();

  for (let i = 0; i < 15; i++) {
    await page.locator(".drawerContainer a").click();
    await delay(1000);
  }

  return await page.$$eval(".gameDivsWrapper section", (elements) => {
    return elements.map((element) => {
      return {
        id: element.dataset.bigid,
        img: element.querySelector("img")?.getAttribute("src"),
        releaseDate: element.dataset.releasedate,
        title: element.querySelector(".x1GameName")?.textContent,
        url: element.querySelector(".gameDivLink")?.getAttribute("href"),
      };
    });
  });
};

/**
 * Puppeteer Get Html
 */
export const puppeteerGetHtml = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
  );

  await page.goto(url);
  return await page.content();
};
