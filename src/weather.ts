import { xmlUrlToJson, dateFormatTime, dateFromPlainString } from "./index";

export type WeatherAirQuality = {
  title: string;
  healthIndex: number;
};

export type WeatherRemoteCityPage = {
  siteData: {
    riseSet: {
      dateTime: {
        $: {
          name: string;
          zone: string;
        };
        year: string[];
        month: {
          _: string;
          $: {
            name: string;
          };
        }[];
        day: {}[];
        hour: string[];
        minute: string[];
        timeStamp: string[];
      }[];
    }[];
    forecastGroup: {};
    hourlyForecastGroup: {
      dateTime: {}[];
      hourlyForecast: {
        $: {
          dateTimeUTC: string;
        };
        temperature: {
          _: string;
        }[];
        condition: {
          _: string;
        }[];
        windChill: {
          _: string;
        }[];
      }[];
    }[];
    currentConditions: {
      dateTime: {
        timeStamp: string;
        $: {
          zone: string;
        };
      }[];
      condition: {}[];
      temperature: {
        _: string;
      }[];
      windChill: {
        _: string;
      }[];
      wind: {
        speed: {
          _: string;
        }[];
        direction: {}[];
      }[];
    }[];
  };
};

export const weather = async () => {
  const result = (await xmlUrlToJson(
    "https://dd.weather.gc.ca/citypage_weather/xml/SK/s0000797_e.xml",
  )) as WeatherRemoteCityPage;

  const sunriseSrcString =
    result.siteData.riseSet[0].dateTime.find(
      (x) => x.$.name == "sunrise" && x.$.zone === "UTC",
    )?.timeStamp[0] || "";

  const sunsetSrcString =
    result.siteData.riseSet[0].dateTime.find(
      (x) => x.$.name == "sunset" && x.$.zone === "UTC",
    )?.timeStamp[0] || "";

  const current = result.siteData.currentConditions[0];
  const currentTimestamp =
    current.dateTime.find((x) => x.$.zone === "UTC")?.timeStamp[0] || "";

  const forecastHourlySrc = result.siteData.hourlyForecastGroup[0];
  const forecastHourly = forecastHourlySrc.hourlyForecast.map((x) => {
    return {
      date: dateFormatTime(dateFromPlainString(x.$.dateTimeUTC + "00")),
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
    currentDateTimeFormatted: dateFormatTime(
      dateFromPlainString(currentTimestamp),
    ),
    currentCondition: current.condition[0],
    currentTemp: current.temperature[0]._,
    currentWindChill: current.windChill?.[0]._,
    currentWindSpeed: current.wind[0].speed[0]._ + " km/h",
    currentWindDirection: current.wind[0].direction[0],
    forecastDaily,
    forecastHourly,
    sunrise: dateFormatTime(dateFromPlainString(sunriseSrcString)),
    sunset: dateFormatTime(dateFromPlainString(sunsetSrcString)),
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
