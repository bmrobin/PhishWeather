package bmrobin.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.net.URL;
import java.util.logging.Logger;

@Service
public class WeatherAlertServiceImpl implements WeatherAlertService {

	private static final Logger LOG = Logger.getLogger(WeatherAlertServiceImpl.class.getName());
	private static final String CURRENT_ZIPCODE_URL = "http://api.wunderground.com/api/apiKey/conditions/q/zipCode.json";
	private static final String DATE_LOCATION_URL = "http://api.wunderground.com/api/apiKey/history_YYYYMMDD/q/state/city.json";

	@Override
	public Map<String, String> getCurrentWeatherForZipcode(String zip) {
		JSONObject jObj;
		JSONObject tempObj;
		JSONArray jArray;
		JSONArray tempArr;

		try {
			// request JSON of current conditions from api
			String weatherUrl = CURRENT_ZIPCODE_URL.replace("apiKey", "a165779ec885eb6c").replace("zipCode", zip);
			LOG.info("Getting weather from api: " + weatherUrl);
			URL addr = new URL(weatherUrl);
			Scanner scan = new Scanner(addr.openStream());
			StringBuilder sb = new StringBuilder();
			while (scan.hasNext()) {
				sb.append(scan.nextLine());
			}
			scan.close();
			tempObj = new JSONObject(sb.toString());

			// create an array of the 2nd grouping in the JSON object
			tempArr = tempObj.toJSONArray(tempObj.names());
			jArray = new JSONArray("[" + tempArr.get(1).toString() + "]");
			jObj = jArray.getJSONObject(0);
			// location is nested inside another JSON array
			JSONObject locationObj = jObj.getJSONObject("display_location");
			String location = locationObj.getString("full");

			Object fahrenheit;
			try {
				fahrenheit = (Integer) jObj.get("temp_f");
			} catch (ClassCastException e) {
				fahrenheit = (Double) jObj.get("temp_f");
			}
			String timestamp = jObj.getString("observation_time");
			String weather = jObj.getString("weather");
			String feelsLikeFahrenheit = jObj.getString("feelslike_f");

			Map<String, String> weatherInfo = new HashMap<>();
			weatherInfo.put("location", location);
			weatherInfo.put("currentTempFahrenheit", fahrenheit.toString());
			weatherInfo.put("time", timestamp);
			weatherInfo.put("conditions", weather);
			weatherInfo.put("feelsLikeFahrenheit", feelsLikeFahrenheit);

			return weatherInfo;
		} catch (JSONException j) {
			j.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	@Override
	public Map<String, String> getWeatherForDate(String dateString) {

		String[] dates = new String[] {
				dateString.substring(0, 4),
				dateString.substring(4, 6),
				dateString.substring(6, 8)
		};

		// TODO - currently using hardcoded location information

		String weatherUrl = DATE_LOCATION_URL.replace("apiKey", "a165779ec885eb6c")
				.replace("YYYY", dates[0])
				.replace("MM", dates[1])
				.replace("DD", dates[2])
				.replace("state", "SC")
				.replace("city", "Easley");

		LOG.info("Getting weather from api: " + weatherUrl);

		try {
			URL addr = new URL(weatherUrl);
			Scanner scan = new Scanner(addr.openStream());
			StringBuilder sb = new StringBuilder();
			while (scan.hasNext()) {
				sb.append(scan.nextLine());
			}
			scan.close();

			JSONObject jsonObject = new JSONObject(sb.toString());
			JSONObject historicalWeatherData = jsonObject
					.getJSONObject("history")
					.getJSONArray("dailysummary")
					.getJSONObject(0);


			// TODO - currently only retrieving `dailysummary`. need to also check for `observations` which has better info
			// TODO - the problem with `observations` is it has hourly data all day long


			Map<String, String> results = new HashMap<>();
			results.put("averageTempFahrenheit", historicalWeatherData.get("meantempi").toString());
			results.put("date", historicalWeatherData.getJSONObject("date").get("pretty").toString());

			return results;
		} catch (Exception e) {
			LOG.severe(e.getMessage());
		}

		return null;
	}
}
