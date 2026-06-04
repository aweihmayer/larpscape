import { App } from "@/core";
import { AuthService, ConfigService, Routes } from "@/src";

document.addEventListener('DOMContentLoaded', () => {
    App.setRoutes(Routes);
    AuthService.ping()
        .then(x => ConfigService.fetchAll())
        .then(x => {
            App.main()
        });
});