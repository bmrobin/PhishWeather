package bmrobin;

import org.json.JSONObject;

public class WeatherAlert {

	public static void main(final String[] args) {
		final String zip = args[0];
		final String apiKey = args[1];

        if (zip.length() != 5) {
            throw new IllegalArgumentException("Invalid Zip Code provided: " + zip);
        }
		if (apiKey.equals("") || zip.equals("")) {
            throw new IllegalArgumentException("A valid zip code and API key are required");
        }

		WeatherAlertRetriever weather = new WeatherAlertRetriever(zip, apiKey);
		JSONObject jObj = weather.getJSONWeather();
		weather.format(jObj);
		System.out.println(weather.toString());
	}
}
