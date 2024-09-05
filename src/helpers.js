import puppeteer from "puppeteer";
import fs from "fs";
import crypto from "crypto";

/**
 * XboxGameLocal
 * @typedef {Object} XboxGameLocal
 * @property {string} id - The ID.
 * @property {string} img - The image URL.
 * @property {string} releaseDate - The release date.
 * @property {string} title - The title.
 * @property {string} url - The URL.
 */

/**
 * XboxGameRemote
 * @typedef {Object} XboxGameRemote
 * @property {Array.<{UsageData, OriginalReleaseDate}>} MarketProperties - The market properties.
 * @property {Array.<{ProductTitle, ShortDescription, PublisherName}>} LocalizedProperties - The properties.
 * @property {Array.<{ImagePurpose, Uri, Height, Width}>} Images - The images.
 * @property {{Category, XboxConsoleGenCompatible}} Properties - The properties.
 * @property {string} ProductId - The product ID.
 */

/**
 * Delay
 * @function
 * @param {function} ms - The time to wait
 * @return {Promise<unknown>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch Request
 * @async
 * @function
 * @param {string} url
 * @param {string} referrer
 * @return {Promise<Response>}
 */
const fetchRequest = async (url, referrer) => {
  return await fetch(url, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
    },
    referrer: referrer,
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
  });
};

/**
 * Meta Critic Games
 * @async
 * @function
 * @return {Promise<unknown>}
 */
export const metaCriticGames = async () => {
  const response = await fetchRequest(
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&gamePlatformIds=1500000129&page=2&releaseYearMin=1958&releaseYearMax=2024&offset=24&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u",
    "https://www.metacritic.com/",
  );

  let json = await response.json();

  let items = [...json.data.items];

  while (json.links.next?.href) {
    const response = await fetchRequest(
      json.links.next.href,
      "https://www.metacritic.com/",
    );
    json = await response.json();
    items = items.concat(json.data.items);
  }

  return items;
};

/**
 * Get a list of Xbox gamepass ids
 * @async
 * @function
 * @return {Promise<string[]>}
 */
export const xboxGamePassIds = async () => {
  const response = await fetchRequest(
    "https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-ca&market=CA",
    "https://www.xbox.com/",
  );
  let json = await response.json();
  return json.slice(1).map((item) => item.id);
};

/**
 * Gamepass Catalog Urls
 * @async
 * @function
 * @return {Promise<string[]>}
 */
export const xboxGamePassCatalogUrls = async () => {
  const ids = await xboxGamePassIds();

  const chunks = [];
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
 * @function
 * @param {XboxGameRemote} game
 * @return {XboxGameLocal}
 */
export const xboxGamePassGame = (game) => {
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const [score, scoreCount] = game.MarketProperties[0].UsageData.reduce(
    (acc, val) => {
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
    images: game.LocalizedProperties[0].Images.map((y) => {
      if (y.ImagePurpose === "FeaturePromotionalSquareArt") {
        return {
          url: y.Uri,
          height: y.Height,
          width: y.Width,
        };
      }
    }).filter((x) => x),
  };
};

/**
 * Xbox Game Pass Games
 * @async
 * @function
 * @return {Promise<XboxGameLocal[]>}
 */
export const xboxGamePassGames = async () => {
  let filenameGames = `./public/xbox-cache/gamepass-all.json`;
  if (fs.existsSync(filenameGames)) {
    return JSON.parse(fs.readFileSync(filenameGames, "utf8"));
  }

  let games = [];
  const urls = await xboxGamePassCatalogUrls();
  for (let url of urls) {
    const slug = url.replaceAll(/[:/.,=&-?]/gi, "_");
    const hash = crypto.createHash("md5").update(slug).digest("hex");
    const filename = `./public/xbox-cache/gamepass-${hash}.json`;
    let data = null;
    if (fs.existsSync(filename)) {
      data = JSON.parse(fs.readFileSync(filename, "utf8"));
    } else {
      const response = await fetchRequest(url, "https://www.xbox.com/");
      data = await response.json();
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
 * @async
 * @function
 * @return {Promise<XboxGameLocal[]>}
 */
export const xboxGamePassGamesPuppeteer = async () => {
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
 *
 * @param {string} url - The URL to fetch
 * @return {Promise<string>}
 */
export const puppeteerGetHtml = async (url) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
  );

  await page.goto(url);
  return await page.content();
};
