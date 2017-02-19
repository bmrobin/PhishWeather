package bmrobin;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * Spring Boot application entry point.
 *
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder()
                .sources(Application.class)
                .run(args);
    }

}
