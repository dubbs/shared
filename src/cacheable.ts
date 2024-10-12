import crypto from "crypto";
import fs from "fs";

/**
 * Returns cached data from a file if it exists, otherwise runs the function with the provided argument and caches output.
 *
 * @example
 * const data = await cacheable(fetchData, "arg");
 * // ./public/cache/fetchData-b25f03dedd69be07f356a06fe35c1b0ddc0de77dcd9066c4be0c6bbde14b23ff.json
 * @param fn
 * @param arg
 */
export const cacheable = async (fn: any, arg: string): Promise<any> => {
  const hash = crypto.createHash("sha256").update(arg).digest("hex");
  const fnName = fn.name;
  const filename = `./public/cache/${fnName}-${hash}.json`;
  let data: any = null;
  if (fs.existsSync(filename)) {
    data = JSON.parse(fs.readFileSync(filename, "utf8"));
  } else {
    data = await fn(arg);
    if (!fs.existsSync("./public/cache")) {
      fs.mkdirSync("./public/cache");
    }
    fs.writeFileSync(filename, JSON.stringify(data));
  }
  return data;
};

console.log(crypto.createHash("sha256").update("arg").digest("hex"));
