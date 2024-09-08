import type { SportsEvent } from "./schema";
import { xmlStrToJson } from "./xml.ts";

export const esportsdeskjson = async (
  domain: string,
  clientId: string,
  leagueId: string,
  selectedTeamId?: string,
): Promise<SportsEvent[]> => {
  let formData = new FormData();
  formData.append("monthId", "0");
  formData.append("gameType", "Regular Season");
  if (selectedTeamId) {
    formData.append("selectedTeamID", selectedTeamId);
  }
  const result = await fetch(
    `${domain}/leagues/schedules.cfm?clientid=${clientId}&leagueID=${leagueId}&schedType=main&printPage=1`,
    {
      method: "POST",
      body: formData,
    },
  );
  const html = await result.text();

  // find the table
  const regex = /<table[^>]*>([\s\S]*?)<\/table>/g;
  const table = html.match(regex)?.[0] ?? "";
  // remove attributes
  const regex2 =
    /(class|href|target|data-toggle|data-placement|title|align)="[^"]*"/g;
  const table2 = table.replace(regex2, "");
  const table3 = table2.replace(" & ", " and ");

  return xmlStrToJson(table3);
};
