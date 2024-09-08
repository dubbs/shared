import { expect, test, jest } from "@jest/globals";
import { recollect } from "./recollect";

test("should have api available (NetworkTest)", async () => {
  const data = await recollect(process.env.RECOLLECT_URL);
  expect(data[0]).toHaveProperty("type");
  expect(data[0]).toHaveProperty("date");
  expect(data[0].type.length).toBeGreaterThan(0);
});

test("should map response (MockTest)", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        parcel_opts: {},
        events: [
          {
            is_approved: 1,
            day: "2024-04-05",
            flags: [
              {
                subject: "Garbage",
              },
            ],
          },
          {
            day: "2024-04-11",
            is_approved: 1,

            flags: [
              {
                subject: "Recycling",
              },
            ],
          },
        ],
      }),
  });
  const data = await recollect(process.env.RECOLLECT_URL);
  expect(data[0].type).toBe("Garbage");
  expect(data[0].date).toBe("2024-04-05T06:00:00.000Z");
});
