package bmrobin;

import org.json.JSONObject;

public class WeatherAlert {

	public static void main(String [] args) {
		
		final String zip = new String(args[0]);
		if (zip.length() != 5) throw new IllegalArgumentException("Invalid Zip Code provided: " + zip);
		
		WeatherAlertRetriever weather = new WeatherAlertRetriever(zip);
		JSONObject jObj = weather.getJSONWeather();
		weather.storeJSONWeather(jObj);
		System.out.println(weather.toString());	
		
	}
}
