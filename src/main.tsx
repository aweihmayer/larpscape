import { App } from "@/core";
import { AuthService, ConfigService, Routes } from "@/src";

document.addEventListener('DOMContentLoaded', () => {
    AuthService.ping()
        .then(x => ConfigService.fetchAll())
        .then(x => {
            App.main(
                Routes,
                'en'
            )
        });
});