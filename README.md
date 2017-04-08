## Retrieve weather info from wunderground.com for a given zip code

#### Requirements
* java 1.8
* npm
* Optional: docker and docker-compose

#### Installation
    $ npm install -g grunt-cli bower
    $ gradlew clean build

#### Usage
Start the Java app in one terminal

    $ gradlew bootRun

Or to start the Java app in a Docker container

    $ docker-compose up -d

Build and start the web app in another terminal

    $ grunt

Access the web app at http://localhost:9000

#### Notes
The [phish.net](https://api.phish.net/) and [wunderground](https://www.wunderground.com/weather/api/) API keys used here are registered to `bmrobin`. This is not yet intended to be used outside of development and learning purposes. These API keys have restrictions on the usage frequency per minute, so please don't overuse the requests.
