class App {
    greeting : string = "learning typescript :)";

    constructor() {
        this.setGreeting(this.greeting);
    }

    setGreeting(greeting : string) {
        $('#test').text(greeting);
    }
}

$(document).ready(function() {
    var app = new App();
});
