package bmrobin.web;

import bmrobin.service.WeatherAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author brobinson
 */
@RestController
public class WeatherApiController {

    @Autowired
    private WeatherAlertService weatherAlertService;

    @RequestMapping(value = "/{zipCode}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> getWeather(@PathVariable("zipCode") String zipCode) {
        return weatherAlertService.getCurrentWeather(zipCode);
    }
}
