import { App } from "@/core"
import { Role, Routes, UserDto } from "@/src"

export class AuthService {
    static user: UserDto = UserDto.fromJson({ role: Role.GUEST })

    static signin(data: object) {
        return Routes.api.auth.signin.fetch(data).then(x => {
            if (x.response.ok) {
                AuthService.user = UserDto.fromJson(x.data)
                App.instance?.setState({})
            }
            return x
        });
    }

    static signout() {
        Routes.api.auth.signout.fetch().then(x => {
            if (x.response.ok) {
                AuthService.user = UserDto.fromJson({ role: Role.GUEST })
                App.instance?.setState({})
            }
        })
    }

    static refresh() {
        return Routes.api.auth.refresh.fetch()
    }

    static ping() {
        return Routes.api.auth.ping.fetch().then(x => {
            if (x.response.ok && x.data.role > Role.GUEST) AuthService.user = UserDto.fromJson(x.data)
            else AuthService.user = UserDto.fromJson({ role: Role.GUEST })
            return x
        })
    }
}