import { xmlUrlToJson, dateFormatTime } from "./index";

export type WeatherAirQuality = {
  title: string;
  healthIndex: number;
};

export const weather = async () => {
  const dateObjectToDateTime = (obj) => {
    return dateStringToDate(obj.find((x) => x.$.zone === "UTC").timeStamp[0]);
  };

  // 2022-12-04:10:10:10.000Z
  const dateStringToDate = (currentDateTimeString: string) => {
    const currentDateTimeStringParsed =
      [
        currentDateTimeString.slice(0, 4),
        currentDateTimeString.slice(4, 6),
        currentDateTimeString.slice(6, 8),
      ].join("-") +
      "T" +
      [
        currentDateTimeString.slice(8, 10),
        currentDateTimeString.slice(10, 12),
        currentDateTimeString.slice(12, 14),
      ].join(":") +
      ".000Z";
    return new Date(currentDateTimeStringParsed);
  };

  const result = await xmlUrlToJson(
    "https://dd.weather.gc.ca/citypage_weather/xml/SK/s0000797_e.xml",
  );

  const sunriseAndSunsetSrc = result.siteData.riseSet[0].dateTime;

  const sunriseSrcString = sunriseAndSunsetSrc.find(
    (x) => x.$.name == "sunrise" && x.$.zone === "UTC",
  ).timeStamp[0];
  const sunrise = dateFormatTime(dateStringToDate(sunriseSrcString));

  const sunsetSrcString = sunriseAndSunsetSrc.find(
    (x) => x.$.name == "sunset" && x.$.zone === "UTC",
  ).timeStamp[0];
  const sunset = dateFormatTime(dateStringToDate(sunsetSrcString));

  const current = result.siteData.currentConditions[0];
  const currentDateTimeFormatted = dateFormatTime(
    dateObjectToDateTime(current.dateTime),
  );

  const forecastHourlySrc = result.siteData.hourlyForecastGroup[0];
  const forecastHourly = forecastHourlySrc.hourlyForecast.map((x) => {
    return {
      date: dateFormatTime(dateStringToDate(x.$.dateTimeUTC + "00")),
      temperature: Number(x.temperature[0]._),
      condition: x.condition[0],
      windChill: Number(x.windChill[0]._),
    };
  });

  const forecastDaily = result.siteData.forecastGroup[0].forecast.map((x) => ({
    title: x.period[0].$.textForecastName ?? "",
    summary: x.textSummary[0] ?? "",
  }));

  return {
    currentDateTimeFormatted,
    currentCondition: current.condition[0],
    currentTemp: current.temperature[0]._,
    currentWindChill: current.windChill?.[0]._,
    currentWindSpeed: current.wind[0].speed[0]._ + " km/h",
    currentWindDirection: current.wind[0].direction[0],
    forecastDaily: forecastDaily,
    forecastHourly,
    sunrise,
    sunset,
  };
};

/**
 * Get air quality forecast
 * @see https://dd.weather.gc.ca/air_quality/doc/
 */
export const weatherAirQuality = async (): Promise<WeatherAirQuality[]> => {
  const observation = (await xmlUrlToJson(
    "http://dd.weather.gc.ca/air_quality/aqhi/pnr/observation/realtime/xml/AQ_OBS_HAHJJ_CURRENT.xml",
  )) as {
    conditionAirQuality: {
      airQualityHealthIndex: string[];
    };
  };
  const forecast = (await xmlUrlToJson(
    "http://dd.weather.gc.ca/air_quality/aqhi/pnr/forecast/realtime/xml/AQ_FCST_HAHJJ_CURRENT.xml",
  )) as {
    forecastAirQuality: {
      forecastGroup: {
        forecast: {
          period: { _: string }[];
          airQualityHealthIndex: string[];
        }[];
      }[];
    };
  };
  return [
    {
      title: "Current",
      healthIndex: parseFloat(
        observation.conditionAirQuality.airQualityHealthIndex[0],
      ),
    },
    ...forecast.forecastAirQuality.forecastGroup[0].forecast.map((x) => {
      return {
        title: x.period[0]._,
        healthIndex: parseFloat(x.airQualityHealthIndex[0]),
      };
    }),
  ];
};
