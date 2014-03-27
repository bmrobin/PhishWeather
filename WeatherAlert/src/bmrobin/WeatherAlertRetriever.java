package bmrobin;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.Scanner;
import java.net.URL;
import java.util.HashMap;
import java.lang.StringBuilder;

public class WeatherAlertRetriever {
	
	// Vienna ZIP code URL example
	// http://api.wunderground.com/api/a165779ec885eb6c/conditions/q/22180.json
	
	private final String apiKey = "a165779ec885eb6c";
	private final String zipCode;
	private String weatherURL = "http://api.wunderground.com/api/" + apiKey + "/conditions/q/";
	private HashMap<String, String> weatherInfo;
	
	public WeatherAlertRetriever(String zip) {
		this.zipCode = zip;
		this.weatherURL = weatherURL + zipCode + ".json";
		weatherInfo = new HashMap<String, String>();
//		System.out.println("Using zip code: " + this.zipCode);
	}
	
	public JSONObject getJSONWeather() {
		JSONObject jObj = null;
		JSONObject tempObj = null;
		JSONArray jArray = null;
		JSONArray tempArr = null;
		
		try {
			// request JSON of current conditions from api
//			System.out.println("Getting weather from api: " + this.weatherURL);
			URL addr = new URL(this.weatherURL);
			Scanner scan = new Scanner(addr.openStream());
			String str = new String();
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
			tempArr = tempObj.toJSONArray(tempObj.names());
			jArray = new JSONArray("[" + tempArr.get(1).toString() + "]");
			jObj = jArray.getJSONObject(0);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return jObj;
	}
	
	public void storeJSONWeather(JSONObject obj) {
		try {
			// location is nested inside another JSON array
			JSONObject locationObj = obj.getJSONObject("display_location");
			String location = locationObj.getString("full");
			
			String farenheit = obj.getString("temp_f");
			String timestamp = obj.getString("observation_time");
			String weather = obj.getString("weather");
			String feelsLikeFarenheit = obj.getString("feelslike_f");
			
			this.weatherInfo.put("Location", location);
			this.weatherInfo.put("Current Temp (F)", farenheit);
			this.weatherInfo.put("Time", timestamp);
			this.weatherInfo.put("Conditions", weather);
			this.weatherInfo.put("Feels Like (F)", feelsLikeFarenheit);
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append("\n");
		str.append("----------\n");
		for (Map.Entry<String,String> entry : this.weatherInfo.entrySet()) {
			str.append(entry.getKey() + ": " + entry.getValue() + "\n");
		}
		str.append("----------\n");
		return str.toString();
	}
}
