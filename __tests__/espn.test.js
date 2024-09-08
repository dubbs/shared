import { expect, test } from "@jest/globals";
import { espn } from "./espn";

test("should have api available (NetworkTest)", async () => {
  const games = await espn("hockey", "nhl");
  if (games.length) {
    expect(games[0].startDate).toHaveLength(20);
    expect(games[0].sport).toBe("NHL");
  }
});

test("should map response to SportEvent (MockTest)", async () => {
  const mockResponse = {
    sports: [
      {
        leagues: [
          {
            events: [
              {
                date: "2024-04-21T16:30:00Z",
                location: "Location",
                summary: "Final",
                competitors: [
                  {
                    displayName: "Washington Capitals",
                    score: "1",
                    logoDark:
                      "https://a.espncdn.com/i/teamlogos/nhl/500-dark/scoreboard/wsh.png",
                  },
                  {
                    displayName: "New York Rangers",
                    score: "4",
                    logoDark:
                      "https://a.espncdn.com/i/teamlogos/nhl/500-dark/scoreboard/nyr.png",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const mockGame = mockResponse.sports[0].leagues[0].events[0];

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });
  const games = await espn("hockey", "nhl");
  expect(games[0].location.description).toBe(mockGame.location);
  expect(games[0].startDate).toBe(mockGame.date);
  expect(games[0].awayTeam.name).toBe(mockGame.competitors[0].displayName);
  expect(games[0].awayTeam.logo).toBe(mockGame.competitors[0].logoDark);
  expect(games[0].awayScore).toBe(mockGame.competitors[0].score);
});
