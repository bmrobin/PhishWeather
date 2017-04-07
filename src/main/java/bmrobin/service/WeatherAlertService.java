package bmrobin.service;

import java.util.Map;

/**
 * @author brobinson
 */
public interface WeatherAlertService {

    Map<String, String> getCurrentWeatherForZipcode(String zip);

    Map<String, String> getWeatherForDate(String dateString);
}
