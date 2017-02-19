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

	// Vienna ZIP code URL example using bmrobin's API key
	// http://api.wunderground.com/api/a165779ec885eb6c/conditions/q/22180.json

	@Override
	public Map<String, String> getCurrentWeather(String zip) {
		JSONObject jObj;
		JSONObject tempObj;
		JSONArray jArray;
		JSONArray tempArr;
		String weatherURL = "http://api.wunderground.com/api/apiKey/conditions/q/zipCode.json";

		try {
			// request JSON of current conditions from api
			LOG.info("Getting weather from api: " + weatherURL.replace("apiKey", "a165779ec885eb6c").replace("zipCode", zip));
			URL addr = new URL(weatherURL.replace("apiKey", "a165779ec885eb6c").replace("zipCode", zip));
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

			Double fahrenheit = (Double) jObj.get("temp_f");
			String timestamp = jObj.getString("observation_time");
			String weather = jObj.getString("weather");
			String feelsLikeFahrenheit = jObj.getString("feelslike_f");

			Map<String, String> weatherInfo = new HashMap<>();
			weatherInfo.put("Location", location);
			weatherInfo.put("Current Temp (F)", fahrenheit.toString());
			weatherInfo.put("Time", timestamp);
			weatherInfo.put("Conditions", weather);
			weatherInfo.put("Feels Like (F)", feelsLikeFahrenheit);

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
}
