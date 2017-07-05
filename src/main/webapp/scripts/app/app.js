import { UIController } from "./ui/uiController";

class App {
    constructor() {
        let uiBootStrap = new UIController();
    }
}

$(document).ready(() => {
    let app = new App();
});
