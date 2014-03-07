package bmrobin;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class WeatherAlert {

	public static void main(String [] args) {
		
		WeatherAlertRetriever weather = new WeatherAlertRetriever("22180");
		JSONObject jObj = weather.getJSONWeather();
		HashMap<String,String> conditions = weather.formatJSONWeather(jObj);
		
		System.out.println("");
		System.out.println("----------");
		for (Map.Entry<String,String> entry : conditions.entrySet()) {
			System.out.println(entry.getKey() + ": " + entry.getValue());
		}
		System.out.println("----------");
	}
}
