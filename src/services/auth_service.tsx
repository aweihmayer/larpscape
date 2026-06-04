import { Role, Routes } from "@/src";

export class AuthService {
    static user: object | null = null;

    static signin(data: object) {
        return Routes.api.auth.signin.fetch(data).then(x => {
            if (x.response.ok) AuthService.user = x.data;
            return x;
        });
    }

    static refresh() {
        return Routes.api.auth.refresh.fetch()
    }

    static ping() {
        return Routes.api.auth.ping.fetch().then(x => {
            if (x.response.ok && x.data.role > Role.GUEST) AuthService.user = x.data;
            else AuthService.user = null;
            return x;
        }); 
    }
}