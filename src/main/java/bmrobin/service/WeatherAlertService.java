package bmrobin.service;

import bmrobin.web.error.NotFoundException;

import java.util.Map;

/**
 * @author brobinson
 */
public interface WeatherAlertService {

    Map<String, String> getCurrentWeatherForZipcode(String zip);

    Map<String, String> getWeatherForDate(String dateString, String city, String state) throws NotFoundException;
}
