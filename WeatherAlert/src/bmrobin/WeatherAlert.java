package bmrobin;

import org.json.JSONObject;
import java.util.HashMap;

public class WeatherAlert {

	public static void main(String [] args) {
		
		WeatherAlertRetriever weather = new WeatherAlertRetriever("22180");
		JSONObject jObj = weather.getJSONWeather();
		HashMap<String,String> conditions = weather.formatJSONWeather(jObj);
		
		System.out.print(conditions);
//		for (int i=0; i < conditions.size(); i++) {
//			System.out.println(conditions.get(i));
//		}
	}
}
