import { expect, test } from "@jest/globals";
import { getTickets } from "./ticketmaster";

test("should have api available (NetworkTest)", async () => {
  const tickets = await getTickets();
  expect(tickets[0]).toHaveProperty("@context");
  expect(tickets[0]).toHaveProperty("@type");
});

test("should return array from application/ld+json scripts (MockTest)", async () => {
  const expected1 = { name: 1 };
  const expected2 = { name: 2 };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: () =>
      Promise.resolve(`
            <script type="application/ld+json">${JSON.stringify(expected1)}</script>
            <script type="application/ld+json">${JSON.stringify(expected2)}</script>
        `),
  });
  const tickets = await getTickets();
  expect(tickets).toHaveLength(2);
  expect(tickets[0]).toMatchObject(expected1);
  expect(tickets[1]).toMatchObject(expected2);
});
