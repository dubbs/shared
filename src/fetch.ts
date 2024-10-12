/**
 * Fetch request returning JSON
 * @param url
 */
export const fetchJson = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": process.env.USER_AGENT || "",
    },
  });
  return response.json();
};

/**
 * Fetch request returning text
 * @param url
 */
export const fetchText = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": process.env.USER_AGENT || "",
    },
  });
  return response.text();
};
