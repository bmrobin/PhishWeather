import { UI } from "./ui/ui";

class App {
    constructor() {
        let uiBootStrap = new UI();
    }
}

$(document).ready(() => {
    let app = new App();
});
