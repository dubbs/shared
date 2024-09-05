import { expect, test, jest } from "@jest/globals";
import { xboxGamePassCatalogUrls } from "./helpers";

test("should have api available (NetworkTest)", async () => {
  const data = await xboxGamePassCatalogUrls();
  expect(data.length).toBeGreaterThan(0);
  expect(data[0].length).toBeGreaterThan(0);
});
