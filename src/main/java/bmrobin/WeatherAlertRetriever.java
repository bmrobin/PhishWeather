package bmrobin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.Scanner;
import java.net.URL;
import java.util.HashMap;

public class WeatherAlertRetriever {

	// Vienna ZIP code URL example using bmrobin's API key
	// http://api.wunderground.com/api/a165779ec885eb6c/conditions/q/22180.json

	private final String apiKey;
	private final String zipCode;
	private String weatherURL;
	private Map<String, String> weatherInfo;

	public WeatherAlertRetriever(String zip, String apiKey) {
		this.zipCode = zip;
        this.apiKey = apiKey;
		this.weatherURL = "http://api.wunderground.com/api/" + this.apiKey + "/conditions/q/" + this.zipCode + ".json";
		weatherInfo = new HashMap<String, String>();
		System.out.println("Using zip code: " + this.zipCode);
	}

	public JSONObject getJSONWeather() {
		JSONObject jObj = null;
		JSONObject tempObj = null;
		JSONArray jArray;
		JSONArray tempArr;
		
		try {
			// request JSON of current conditions from api
			System.out.println("Getting weather from api: " + this.weatherURL);
			URL addr = new URL(this.weatherURL);
			Scanner scan = new Scanner(addr.openStream());
			String str = "";
			while (scan.hasNext()) {
				str += scan.nextLine();
			}
			scan.close();
			tempObj = new JSONObject(str);
		} catch (JSONException j) {
			j.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			// create an array of the 2nd grouping in the JSON object
			if (tempObj != null) {
				tempArr = tempObj.toJSONArray(tempObj.names());
				jArray = new JSONArray("[" + tempArr.get(1).toString() + "]");
				jObj = jArray.getJSONObject(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return jObj;
	}

    public void format(JSONObject obj) {
		try {
			// location is nested inside another JSON array
			JSONObject locationObj = obj.getJSONObject("display_location");
			String location = locationObj.getString("full");
			
			Double farenheit = (Double) obj.get("temp_f");
			String timestamp = obj.getString("observation_time");
			String weather = obj.getString("weather");
			String feelsLikeFarenheit = obj.getString("feelslike_f");
			
			this.weatherInfo.put("Location", location);
			this.weatherInfo.put("Current Temp (F)", farenheit.toString());
			this.weatherInfo.put("Time", timestamp);
			this.weatherInfo.put("Conditions", weather);
			this.weatherInfo.put("Feels Like (F)", feelsLikeFarenheit);
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append("----------\n");
		for (Map.Entry<String,String> entry : this.weatherInfo.entrySet()) {
			str.append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
		}
		str.append("----------");
		return str.toString();
	}
}
