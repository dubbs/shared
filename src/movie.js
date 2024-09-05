import { dateFormatIsoShort, dateFormatLong } from "./date.js";
// import * as fs from "node:fs";
//
// export type Movie = {
//   url: string;
//   name: string;
//   duration: number; // mins
//   contentRating: string;
//   genre: string; // comma separated
//   thumbnailUrl: string;
// };
//
// export type Place = {
//   identifier: number;
//   name: string;
// };
//
// export type ScreeningEvent = {
//   videoFormat: string;
//   subEvent: Event[];
// };
//
// export type Event = {
//   startDate: string;
// };
//
// export type ScreeningSummary = {
//   location: Place;
//   movies: [
//     {
//       movie: Movie;
//       screeningEvents: ScreeningEvent[];
//     },
//   ];
// };

/**
 * @typedef {Object} ScreeningSummary
 * @property {Object} location - The location.
 * @property {Array.<{movie, screeningEvents}>} movies - The movies.
 */

/**
 * Get the screening summary for today by location
 * @async
 * @function
 * @param {boolean} keepAll - Whether to keep all movies.
 * @return {Promise<ScreeningSummary>}
 */
export const getLandmark = async (keepAll = false) => {
  const response = await fetch(
    "https://www.landmarkcinemas.com/showtimes/saskatoon",
  );
  let responseText = await response.text();

  let matches = responseText.matchAll(/pc.showtimes(data = {[\S\s]+?});/gm);

  let text = [...matches][0][1];
  let json = eval(`let data; ${text}`);

  const showing = {
    location: {
      identifier: 0,
      name: "Landmark Cinemas",
    },
    movies: json.nowbooking[0]
      .map((movie) => {
        const sessionsToday = movie.Sessions.filter((session) => {
          const date = new Date(session.Date);
          const today = new Date();
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });
        let screeningEvents = [];
        if (sessionsToday.length > 0) {
          const dateStr = sessionsToday[0].NewDate;
          screeningEvents = sessionsToday[0].ExperienceTypes.map(
            (experienceType) => {
              return {
                videoFormat: experienceType.ExperienceAttributes.map(
                  (experience) => {
                    return experience.Name;
                  },
                )
                  .filter((x) => {
                    return (
                      x !== "Reserved Seating" &&
                      x !== "Shout Out" &&
                      x !== "Premiere Seats" &&
                      x !== "Descriptive Video Service" &&
                      x !== "Closed Caption" &&
                      x !== "Recliner Seating"
                    );
                  })
                  .join(", "),
                subEvent: experienceType.Times.map((event) => {
                  const parts = event.StartTime.split(" ");
                  let hoursNum = parseInt(parts[0].split(":")[0], 10);
                  if (parts[1] === "PM" && hoursNum < 12) {
                    hoursNum += 12;
                  }
                  let hours = "";
                  if (hoursNum < 10) {
                    hours = "0" + hoursNum;
                  } else {
                    hours = "" + hoursNum;
                  }

                  let minutes = parts[0].split(":")[1];
                  let startDate =
                    dateStr + "T" + hours + ":" + minutes + ":00-06:00";

                  return {
                    startDate: startDate,
                  };
                }),
              };
            },
          );
        }
        return {
          movie: {
            url: `https://www.landmarkcinemas.com/film-info/${movie.FriendlyName}`,
            name: movie.Title,
            duration: parseInt(movie.RunTime, 10),
            contentRating: movie.Cert,
            genre: "",
            thumbnailUrl: movie.Img,
          },
          screeningEvents: screeningEvents,
        };
      })
      .filter((movie) => {
        return keepAll || movie.screeningEvents.length > 0;
      }),
  };
  return showing;
};

/**
 * Get the screening summary for today by location
 * @param {number} locationId
 * @return {Promise<ScreeningSummary>}>}
 */
export const screeningSummaryForTodayByLocation = async (locationId) => {
  const date = dateFormatIsoShort(new Date());
  const response = await fetch(
    `https://apis.cineplex.com/prod/cpx/theatrical/api/v1/showtimes?language=en&locationId=${locationId}&date=${date}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "ocp-apim-subscription-key": "dcdac5601d864addbc2675a2e96cb1f8",
        "sec-ch-ua":
          '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://www.cineplex.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    },
  );

  try {
    const json = await response.json();
    const movies = json[0].dates[0].movies.map((movie) => {
      return {
        movie: {
          url: "https://www.cineplex.com/movie/" + movie.filmUrl,
          name: movie.name,
          duration: movie.runtimeInMinutes,
          contentRating: movie.localRating,
          genre: movie.genres.join(", "),
          thumbnailUrl: movie.smallPosterImageUrl,
        },
        screeningEvents: movie.experiences.map((experience) => {
          return {
            videoFormat: experience.experienceTypes[0],
            subEvent: experience.sessions.map((session) => {
              return {
                startDate: session.showStartDateTimeUtc + "Z",
              };
            }),
          };
        }),
      };
    });
    const showing = {
      location: {
        identifier: json[0].theatreId,
        name: json[0].theatre,
      },
      movies: movies,
    };
    return showing;
  } catch (e) {
    return {
      location: {
        identifier: locationId,
        name: "Cineplex",
      },
      movies: [],
    };
  }
};
