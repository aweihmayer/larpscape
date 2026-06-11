import { App, flattenObject, Route } from "@/core";
import { AuthService, ConfigService, Routes } from "@/src";
import { createRoot } from "react-dom/client";

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app')!
    createRoot(container).render(
        <App
            routes={Object.values(flattenObject(Routes.app, Route))}
            isUserAuthenticated={() => !AuthService.user.isGuest()}
            loading={true}
        />
    )

    AuthService.ping()
        .then(x => ConfigService.fetchAll())
        .then(x => {
            App.instance!.setState({
                lang: 'en',
                isLoading: false
            })
        })
})