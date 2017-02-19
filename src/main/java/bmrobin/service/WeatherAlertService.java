package bmrobin.service;

import java.util.Map;

/**
 * @author brobinson
 */
public interface WeatherAlertService {

    Map<String, String> getCurrentWeather(String zip);
}
