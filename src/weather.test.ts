import { expect, test } from "@jest/globals";
import { weather as getWeather, weatherAirQuality } from "./weather";

test("should have api available (NetworkTest)", async () => {
  const weather = await getWeather();
  expect(weather).toHaveProperty("currentDateTimeFormatted");
  expect(weather).toHaveProperty("currentCondition");
  expect(weather).toHaveProperty("currentTemp");
  expect(weather).toHaveProperty("currentWindChill");
  expect(weather).toHaveProperty("currentWindSpeed");
  expect(weather).toHaveProperty("currentWindDirection");
  expect(weather).toHaveProperty("forecastDaily");
  expect(weather).toHaveProperty("forecastHourly");
  expect(weather).toHaveProperty("sunrise");
  expect(weather).toHaveProperty("sunset");
});

test("should map response (MockTest)", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: () =>
      Promise.resolve(`
           
<?xml version="1.0" encoding="UTF-8"?>
<siteData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://dd.weather.gc.ca/citypage_weather/schema/site.xsd">
   <license>https://dd.weather.gc.ca/doc/LICENCE_GENERAL.txt</license>
   <dateTime name="xmlCreation" zone="UTC" UTCOffset="0">
      <year>2024</year>
      <month name="April">04</month>
      <day name="Sunday">28</day>
      <hour>03</hour>
      <minute>03</minute>
      <timeStamp>20240428030350</timeStamp>
      <textSummary>Sunday April 28, 2024 at 03:03 UTC</textSummary>
   </dateTime>
   <dateTime name="xmlCreation" zone="CST" UTCOffset="-6">
      <year>2024</year>
      <month name="April">04</month>
      <day name="Saturday">27</day>
      <hour>21</hour>
      <minute>03</minute>
      <timeStamp>20240427210350</timeStamp>
      <textSummary>Saturday April 27, 2024 at 21:03 CST</textSummary>
   </dateTime>
   <location>
      <continent>North America</continent>
      <country code="ca">Canada</country>
      <province code="sk">Saskatchewan</province>
      <name code="s0000797" lat="52.13N" lon="106.66W">Saskatoon</name>
      <region>City of Saskatoon</region>
   </location>
   <warnings/>
   <currentConditions>
      <station code="yxe" lat="52.17N" lon="106.70W">Saskatoon Diefenbaker Int&apos;l Airport</station>
      <dateTime name="observation" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Sunday">28</day>
         <hour>03</hour>
         <minute>00</minute>
         <timeStamp>20240428030000</timeStamp>
         <textSummary>Sunday April 28, 2024 at 03:00 UTC</textSummary>
      </dateTime>
      <dateTime name="observation" zone="CST" UTCOffset="-6">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>21</hour>
         <minute>00</minute>
         <timeStamp>20240427210000</timeStamp>
         <textSummary>Saturday April 27, 2024 at 21:00 CST</textSummary>
      </dateTime>
      <condition>Mostly Cloudy</condition>
      <iconCode format="gif">33</iconCode>
      <temperature unitType="metric" units="C">10.2</temperature>
      <dewpoint unitType="metric" units="C">-4.0</dewpoint>
      <pressure unitType="metric" units="kPa" change="0.06" tendency="falling">101.7</pressure>
      <visibility unitType="metric" units="km">24.1</visibility>
      <relativeHumidity units="%">37</relativeHumidity>
      <wind>
         <speed unitType="metric" units="km/h">23</speed>
         <gust unitType="metric" units="km/h"></gust>
         <direction>ESE</direction>
         <bearing units="degrees">106.0</bearing>
      </wind>
   </currentConditions>
   <forecastGroup>
      <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>22</hour>
         <minute>00</minute>
         <timeStamp>20240427220000</timeStamp>
         <textSummary>Saturday April 27, 2024 at 22:00 UTC</textSummary>
      </dateTime>
      <dateTime name="forecastIssue" zone="CST" UTCOffset="-6">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>16</hour>
         <minute>00</minute>
         <timeStamp>20240427160000</timeStamp>
         <textSummary>Saturday April 27, 2024 at 16:00 CST</textSummary>
      </dateTime>
      <regionalNormals>
         <textSummary>Low plus 3. High 15.</textSummary>
         <temperature unitType="metric" units="C" class="high">15</temperature>
         <temperature unitType="metric" units="C" class="low">3</temperature>
      </regionalNormals>
      <forecast>
         <period textForecastName="Tonight">Saturday night</period>
         <textSummary>Partly cloudy. 30 percent chance of showers overnight. Wind east 20 km/h becoming south 40 gusting to 60 overnight. Low 7.</textSummary>
         <cloudPrecip>
            <textSummary>Partly cloudy. 30 percent chance of showers overnight.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">36</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 7.</textSummary>
            <temperature unitType="metric" units="C" class="low">7</temperature>
         </temperatures>
         <winds>
            <textSummary>Wind east 20 km/h becoming south 40 gusting to 60 overnight.</textSummary>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">20</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>E</direction>
               <bearing units="degrees">09</bearing>
            </wind>
            <wind index="2" rank="major">
               <speed unitType="metric" units="km/h">40</speed>
               <gust unitType="metric" units="km/h">60</gust>
               <direction>S</direction>
               <bearing units="degrees">18</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="33" end="36">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">55</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Sunday">Sunday</period>
         <textSummary>Mainly cloudy with 30 percent chance of showers. Wind south 40 km/h gusting to 60. High 19. UV index 4 or moderate.</textSummary>
         <cloudPrecip>
            <textSummary>Mainly cloudy with 30 percent chance of showers.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">06</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 19.</textSummary>
            <temperature unitType="metric" units="C" class="high">19</temperature>
         </temperatures>
         <winds>
            <textSummary>Wind south 40 km/h gusting to 60.</textSummary>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">40</speed>
               <gust unitType="metric" units="km/h">60</gust>
               <direction>S</direction>
               <bearing units="degrees">18</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="36" end="48">rain</precipType>
         </precipitation>
         <windChill/>
         <uv category="moderate">
            <index>4</index>
            <textSummary>UV index 4 or moderate.</textSummary>
         </uv>
         <relativeHumidity units="%">30</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Sunday night">Sunday night</period>
         <textSummary>Partly cloudy. 30 percent chance of showers in the evening. Wind south 30 km/h gusting to 50 becoming light in the evening. Low plus 5.</textSummary>
         <cloudPrecip>
            <textSummary>Partly cloudy. 30 percent chance of showers in the evening.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">36</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low plus 5.</textSummary>
            <temperature unitType="metric" units="C" class="low">5</temperature>
         </temperatures>
         <winds>
            <textSummary>Wind south 30 km/h gusting to 50 becoming light in the evening.</textSummary>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">30</speed>
               <gust unitType="metric" units="km/h">50</gust>
               <direction>S</direction>
               <bearing units="degrees">18</bearing>
            </wind>
            <wind index="2" rank="minor">
               <speed unitType="metric" units="km/h">10</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>E</direction>
               <bearing units="degrees">09</bearing>
            </wind>
            <wind index="3" rank="major">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>S</direction>
               <bearing units="degrees">18</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="48" end="54">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">50</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Monday">Monday</period>
         <textSummary>Sunny. High 20.</textSummary>
         <cloudPrecip>
            <textSummary>Sunny.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">00</iconCode>
            <pop units="%"></pop>
            <textSummary>Sunny</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 20.</textSummary>
            <temperature unitType="metric" units="C" class="high">20</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">20</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Monday night">Monday night</period>
         <textSummary>Clear. Low plus 4.</textSummary>
         <cloudPrecip>
            <textSummary>Clear.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">30</iconCode>
            <pop units="%"></pop>
            <textSummary>Clear</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low plus 4.</textSummary>
            <temperature unitType="metric" units="C" class="low">4</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">100</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Tuesday">Tuesday</period>
         <textSummary>Showers. High 14.</textSummary>
         <cloudPrecip>
            <textSummary>Showers.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">12</iconCode>
            <pop units="%"></pop>
            <textSummary>Showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 14.</textSummary>
            <temperature unitType="metric" units="C" class="high">14</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="90" end="96">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">95</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Tuesday night">Tuesday night</period>
         <textSummary>Cloudy with 60 percent chance of showers. Low plus 3.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy with 60 percent chance of showers.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">12</iconCode>
            <pop units="%">60</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low plus 3.</textSummary>
            <temperature unitType="metric" units="C" class="low">3</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="96" end="102">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">80</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Wednesday">Wednesday</period>
         <textSummary>A mix of sun and cloud. High 13.</textSummary>
         <cloudPrecip>
            <textSummary>A mix of sun and cloud.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 13.</textSummary>
            <temperature unitType="metric" units="C" class="high">13</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">40</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Wednesday night">Wednesday night</period>
         <textSummary>Cloudy periods. Low minus 3.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy periods.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">32</iconCode>
            <pop units="%"></pop>
            <textSummary>Cloudy periods</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low minus 3.</textSummary>
            <temperature unitType="metric" units="C" class="low">-3</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">80</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Thursday">Thursday</period>
         <textSummary>A mix of sun and cloud. High 13.</textSummary>
         <cloudPrecip>
            <textSummary>A mix of sun and cloud.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 13.</textSummary>
            <temperature unitType="metric" units="C" class="high">13</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">30</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Thursday night">Thursday night</period>
         <textSummary>Cloudy periods. Low minus 2.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy periods.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">32</iconCode>
            <pop units="%"></pop>
            <textSummary>Cloudy periods</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low minus 2.</textSummary>
            <temperature unitType="metric" units="C" class="low">-2</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">75</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Friday">Friday</period>
         <textSummary>A mix of sun and cloud. High 13.</textSummary>
         <cloudPrecip>
            <textSummary>A mix of sun and cloud.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 13.</textSummary>
            <temperature unitType="metric" units="C" class="high">13</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">30</relativeHumidity>
         <humidex/>
      </forecast>
   </forecastGroup>
   <hourlyForecastGroup>
      <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>22</hour>
         <minute>00</minute>
         <timeStamp>20240427220000</timeStamp>
         <textSummary>Saturday April 27, 2024 at 22:00 UTC</textSummary>
      </dateTime>
      <dateTime name="forecastIssue" zone="CST" UTCOffset="-6">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>16</hour>
         <minute>00</minute>
         <timeStamp>20240427160000</timeStamp>
         <textSummary>Saturday April 27, 2024 at 16:00 CST</textSummary>
      </dateTime>
      <hourlyForecast dateTimeUTC="202404280400">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">10</temperature>
         <lop category="Nil" units="%">0</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404280500">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">9</temperature>
         <lop category="Nil" units="%">0</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404280600">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">9</temperature>
         <lop category="Nil" units="%">0</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404280700">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">9</temperature>
         <lop category="Nil" units="%">0</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404280800">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">8</temperature>
         <lop category="Nil" units="%">0</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404280900">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">8</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281000">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">8</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281100">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">7</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281200">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">7</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281300">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">8</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281400">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">8</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281500">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">9</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281600">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">10</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281700">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">10</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281800">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">11</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404281900">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">12</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404282000">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">14</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404282100">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">15</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404282200">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">16</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404282300">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">18</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">40</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">60</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404290000">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">19</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">30</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">50</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404290100">
         <condition>Chance of showers</condition>
         <iconCode format="png">06</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">30</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">50</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404290200">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">16</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">30</speed>
            <direction windDirFull="South">S</direction>
            <gust unitType="metric" units="km/h">50</gust>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202404290300">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">14</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">10</speed>
            <direction windDirFull="East">E</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
   </hourlyForecastGroup>
   <yesterdayConditions>
      <temperature unitType="metric" units="C" class="high">14.9</temperature>
      <temperature unitType="metric" units="C" class="low">2.9</temperature>
      <precip unitType="metric" units="mm">0.0</precip>
   </yesterdayConditions>
   <riseSet>
      <disclaimer>The information provided here, for the times of the rise and set of the sun, is an estimate included as a convenience to our clients. Values shown here may differ from the official sunrise/sunset data available from (http://hia-iha.nrc-cnrc.gc.ca/sunrise_e.html)</disclaimer>
      <dateTime name="sunrise" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Sunday">28</day>
         <hour>11</hour>
         <minute>41</minute>
         <timeStamp>20240428114100</timeStamp>
         <textSummary>Sunday April 28, 2024 at 11:41 UTC</textSummary>
      </dateTime>
      <dateTime name="sunrise" zone="CST" UTCOffset="-6">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>05</hour>
         <minute>43</minute>
         <timeStamp>20240427054300</timeStamp>
         <textSummary>Saturday April 27, 2024 at 05:43 CST</textSummary>
      </dateTime>
      <dateTime name="sunset" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Monday">29</day>
         <hour>02</hour>
         <minute>28</minute>
         <timeStamp>20240429022800</timeStamp>
         <textSummary>Monday April 29, 2024 at 02:28 UTC</textSummary>
      </dateTime>
      <dateTime name="sunset" zone="CST" UTCOffset="-6">
         <year>2024</year>
         <month name="April">04</month>
         <day name="Saturday">27</day>
         <hour>20</hour>
         <minute>27</minute>
         <timeStamp>20240427202700</timeStamp>
         <textSummary>Saturday April 27, 2024 at 20:27 CST</textSummary>
      </dateTime>
   </riseSet>
   <almanac>
      <temperature class="extremeMax" period="1892-2011" unitType="metric" units="C" year="1952">33.3</temperature>
      <temperature class="extremeMin" period="1892-2011" unitType="metric" units="C" year="1903">-13.3</temperature>
      <temperature class="normalMax" unitType="metric" units="C">14.7</temperature>
      <temperature class="normalMin" unitType="metric" units="C">1.2</temperature>
      <temperature class="normalMean" unitType="metric" units="C">8.0</temperature>
      <precipitation class="extremeRainfall" period="1892-2007" unitType="metric" units="mm" year="1973">13.0</precipitation>
      <precipitation class="extremeSnowfall" period="1892-2007" unitType="metric" units="cm" year="1990">4.2</precipitation>
      <precipitation class="extremePrecipitation" period="1892-2009" unitType="metric" units="mm" year="1973">13.0</precipitation>
      <precipitation class="extremeSnowOnGround" period="1955-2005" unitType="metric" units="cm" year="1958">3.0</precipitation>
      <pop units="%">28.0</pop>
   </almanac>
</siteData>
        `),
  });
  const weather = await getWeather();
  expect(weather.currentDateTimeFormatted).toBe("9:00 p.m.");
  expect(weather.currentCondition).toBe("Mostly Cloudy");
  expect(weather.currentTemp).toBe("10.2");
  expect(weather.currentWindChill).toBe(undefined);
  expect(weather.currentWindSpeed).toBe("23 km/h");
  expect(weather.currentWindDirection).toBe("ESE");
  expect(weather.forecastDaily[0].summary).toBe(
    "Partly cloudy. 30 percent chance of showers overnight. Wind east 20 km/h becoming south 40 gusting to 60 overnight. Low 7.",
  );
  expect(weather.forecastHourly[0].condition).toBe("Partly cloudy");
  expect(weather.sunrise).toBe("5:41 a.m.");
  expect(weather.sunset).toBe("8:28 p.m.");
});

test("should map air quality (MockTest)", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      text: () =>
        Promise.resolve(`
    <conditionAirQuality productHeader="AQ_OBS">
<region nameEn="Saskatoon" nameFr="Saskatoon">HAHJJ</region>
<dateStamp name="aqObserved" zoneEn="CST" zoneFr="HNC">
<year>2024</year>
<month nameEn="September" nameFr="septembre">9</month>
<day nameEn="Sunday" nameFr="dimanche"> 8</day>
<hour clock="12h" ampm="PM">12</hour>
<minute>00</minute>
<second/>
<UTCStamp>20240908180000</UTCStamp>
<textSummary lang="EN">12:00 PM CST Sunday 8 September 2024</textSummary>
<textSummary lang="FR">12h00 HNC dimanche 8 septembre 2024</textSummary>
</dateStamp>
<airQualityHealthIndex>5.0</airQualityHealthIndex>
<specialNotes/>
</conditionAirQuality>`),
    })
    .mockResolvedValueOnce({
      ok: true,
      text: () =>
        Promise.resolve(`<forecastAirQuality productHeader="AQ_FCST" status="issued">
<region nameEn="Saskatoon" nameFr="Saskatoon">HAHJJ</region>
<dateStamp name="aqForecastIssued" zoneEn="CST" zoneFr="HNC">
<year>2024</year>
<month nameEn="September" nameFr="septembre">9</month>
<day nameEn="Sunday" nameFr="dimanche">8</day>
<hour clock="12h" ampm="AM">6</hour>
<minute>0</minute>
<second/>
<UTCStamp>20240908120000</UTCStamp>
<textSummary lang="EN">6:00 AM CST Sunday 8 September 2024</textSummary>
<textSummary lang="FR">6h00 HNC dimanche 8 septembre 2024</textSummary>
</dateStamp>
<nextIssue>
<UTCStamp>202409082300</UTCStamp>
</nextIssue>
<warningGroup> </warningGroup>
<forecastGroup>
<forecast periodID="1">
<period forecastName="Today" lang="EN">Sunday</period>
<period forecastName="Aujourd'hui" lang="FR">dimanche</period>
<airQualityHealthIndex>4</airQualityHealthIndex>
</forecast>
<forecast periodID="2">
<period forecastName="Tonight" lang="EN">Sunday night</period>
<period forecastName="Ce soir et cette nuit" lang="FR">dimanche soir et nuit</period>
<airQualityHealthIndex>4</airQualityHealthIndex>
</forecast>
<forecast periodID="3">
<period forecastName="Tomorrow" lang="EN">Monday</period>
<period forecastName="Demain" lang="FR">lundi</period>
<airQualityHealthIndex>5</airQualityHealthIndex>
</forecast>
<forecast periodID="4">
<period forecastName="Tomorrow Night" lang="EN">Monday night</period>
<period forecastName="Demain soir et nuit" lang="FR">lundi soir et nuit</period>
<airQualityHealthIndex>5</airQualityHealthIndex>
</forecast>
</forecastGroup>
<hourlyForecastGroup>
<hourlyForecast UTCTime="20240908120000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908130000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908140000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908150000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908160000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908170000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908180000">2</hourlyForecast>
<hourlyForecast UTCTime="20240908190000">3</hourlyForecast>
<hourlyForecast UTCTime="20240908200000">3</hourlyForecast>
<hourlyForecast UTCTime="20240908210000">3</hourlyForecast>
<hourlyForecast UTCTime="20240908220000">3</hourlyForecast>
<hourlyForecast UTCTime="20240908230000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909000000">4</hourlyForecast>
<hourlyForecast UTCTime="20240909010000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909020000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909030000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909040000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909050000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909060000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909070000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909080000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909090000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909100000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909110000">2</hourlyForecast>
<hourlyForecast UTCTime="20240909120000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909130000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909140000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909150000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909160000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909170000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909180000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909190000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909200000">3</hourlyForecast>
<hourlyForecast UTCTime="20240909210000">4</hourlyForecast>
<hourlyForecast UTCTime="20240909220000">4</hourlyForecast>
<hourlyForecast UTCTime="20240909230000">4</hourlyForecast>
<hourlyForecast UTCTime="20240910000000">5</hourlyForecast>
</hourlyForecastGroup>
</forecastAirQuality>`),
    });

  const result = await weatherAirQuality();
  expect(result[0].healthIndex).toBe(5.0);
  expect(result[0].title).toBe("Current");
  expect(result[1].healthIndex).toBe(4.0);
  expect(result[1].title).toBe("Sunday");
});
