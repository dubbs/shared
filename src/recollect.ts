export const recollect = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
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
