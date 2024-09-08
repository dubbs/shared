import { fetchJson } from "./fetch";

export type RecollectItem = {
  date: string;
  type: string;
};

/**
 * Recollect
 * @param RECOLLECT_URL
 */
export const recollect = async (
  RECOLLECT_URL: string | undefined,
): Promise<RecollectItem[]> => {
  const json = await fetchJson(RECOLLECT_URL || "");
  return json.events
    .map((x: any) => {
      if (x.is_approved) {
        const date = new Date(`${x.day}T06:00:00Z`).toISOString();
        return {
          type: x.flags[0].subject,
          date: date,
        };
      }
    })
    .filter((x: any) => x);
};
