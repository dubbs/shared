import { expect, test } from "@jest/globals";
import { getRattlers } from "./rattlers";

test("should have api available (NetworkTest)", async () => {
  const summary = await getRattlers();
});

test("should map response (MockTest)", async () => {});
