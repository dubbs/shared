import type { SportsEvent } from "./schema";
import { getDocument } from "./jsdom.ts";

export const getIIHF = async () => {
  const document = await getDocument(
    "https://www.iihf.com/en/events/2024/wm/schedule",
  );
  const cards = [...document.querySelectorAll(".b-card-schedule")];

  let events = [];
  for (const card of cards) {
    const dateString = card.querySelector(".s-date")?.getAttribute("data-time");
    const startDate = dateString ? new Date(dateString).toISOString() : null;
    const teams = [...card.querySelectorAll(".s-team")];
    const homeScore =
      Number(teams[0].querySelector(".s-count")?.textContent?.trim()) ?? 0;
    const homeTeamName =
      teams[0].querySelector(".s-country")?.textContent?.trim() ?? "-";
    const homeTeamLogo =
      teams[0]
        .querySelector(".s-flag")
        ?.getAttribute("style")
        ?.replace("background-image:url(", "")
        .replace(")", "") ?? "";
    const awayScore =
      Number(teams[1].querySelector(".s-count")?.textContent?.trim()) ?? 0;
    const awayTeamName =
      teams[1].querySelector(".s-country")?.textContent?.trim() ?? "-";
    const awayTeamLogo =
      teams[1]
        .querySelector(".s-flag")
        ?.getAttribute("style")
        ?.replace("background-image:url(", "")
        .replace(")", "") ?? "";
    const description =
      card.querySelector(".s-text")?.textContent?.trim() ?? "-";
    const locationDescription =
      card.querySelector(".s-arena")?.textContent?.trim() ?? "-";
    events.push({
      audience: {
        audienceType: "",
      },
      startDate: startDate,
      sport: "IIHF",
      awayTeam: {
        name: awayTeamName,
        logo: awayTeamLogo,
      },
      homeTeam: {
        name: homeTeamName,
        logo: homeTeamLogo,
      },
      location: {
        description: locationDescription,
        addressLocality: "",
        addressRegion: "",
      },
      awayScore,
      homeScore,
      description,
    } as SportsEvent);
  }

  return events;
};
