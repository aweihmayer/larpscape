import { ReactElement } from "react";
import { Route } from "@/core";
import { ConfigListView, EventListView, GameObjectListView, HomeView, ProductListView, UserListView, UserSignupView } from "@/src";

function app(
    path: string,
    view:  (params: object) => ReactElement
): Route {
    return new Route(path, 'GET', view)
}

function api(
    path: string,
    method: string = 'GET'
): Route {
    return new Route(path, method)
}

export const Routes = {
    app: {
        home: app('/', (params) => { return <HomeView />; }),
        game: {
            list: app('/objects', (params) => { return <GameObjectListView />; })
        },
        event: {
            list: app('/events', (params) => { return <EventListView />; })
        },
        product: {
            list: app('/products', (params) => { return <ProductListView />; })
        },
        user: {
            list: app('/users', (params) => { return <UserListView />; }),
        },
        config: {
            list: app('/configs', (params) => { return <ConfigListView />; })
        },
        self: {
            user: app('/self', (params) => { return <UserListView />; }),
            events: app('/self/events', (params) => { return <UserListView />; }),
            purchases: app('/self/purchases', (params) => { return <UserListView />; }),
        },
        auth: {
            signup: app('/auth/signup', (params) => { return <UserSignupView />; })
        }
    },
    api: {
        auth: {
            ping: api('/api/auth/ping', 'GET'),
            refresh: api('/api/auth/refresh', 'POST'),
            signin: api('/api/auth/signin', 'POST')
        },
        config: {
            list: api('/api/configs'),
            read: api('/api/configs/{id}')
        }
    }
};