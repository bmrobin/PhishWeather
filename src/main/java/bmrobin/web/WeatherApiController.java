package bmrobin.web;

import bmrobin.service.WeatherAlertService;
import bmrobin.web.error.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author brobinson
 */
@RestController
public class WeatherApiController {

    @Autowired
    private WeatherAlertService weatherAlertService;

    @RequestMapping(value = "/zip/{zipCode}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getWeatherByZip(@PathVariable("zipCode") String zipCode) {
        return weatherAlertService.getCurrentWeatherForZipcode(zipCode);
    }

    @RequestMapping(value = "/date",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getWeatherByDate(
        @RequestParam("date") String date,
        @RequestParam("city") String city,
        @RequestParam("state") String state) throws NotFoundException {
        return weatherAlertService.getWeatherForDate(date, city, state);
    }
}
