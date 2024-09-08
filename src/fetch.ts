/**
 * Fetch request returning json
 */
export const fetchJson = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
    },
  });
  return response.json();
};

/**
 * Fetch request returning text
 */
export const fetchText = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
    },
  });
  return response.text();
};

// /**
//  * Fetch Request
//  * @async
//  * @function
//  * @param {string} url
//  * @param {string} referrer
//  * @return {Promise<Response>}
//  */
// const fetchRequest = async (
//   url: string,
//   referrer: string,
// ): Promise<Response> => {
//   return await fetch(url, {
//     headers: {
//       accept: "application/json, text/plain, */*",
//       "accept-language": "en-US,en;q=0.9",
//       priority: "u=1, i",
//       "sec-ch-ua":
//         '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"macOS"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "cross-site",
//       "user-agent":
//         "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
//     },
//     referrer: referrer,
//     referrerPolicy: "strict-origin-when-cross-origin",
//     body: null,
//     method: "GET",
//     mode: "cors",
//     credentials: "same-origin",
//   });
// };
