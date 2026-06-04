import { Route } from "@/core";
import { I18N, Routes } from "@/src";
import { JSX } from "react";
import { BookOpenText, Calendar, DollarSign, House, Settings, ShoppingCart, User, UserPen } from "lucide-react";

class HeaderLinkData {
    route: Route;
    params: object;
    name: Record<string, string>;
    icon: (() => JSX.Element);
    condition: (() => boolean);

    constructor(
        route: Route,
        params: object,
        name: Record<string, string>,
        icon: (() => JSX.Element),
        condition: (() => boolean)
    ) {
        this.route = route;
        this.params = params;
        this.name = name;
        this.icon = icon;
        this.condition = condition;
    }
}

export const NAV_LINKS = [
    new HeaderLinkData(
        Routes.app.home,
        {},
        I18N.menu.home,
        () => <House />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.game.list,
        {},
        I18N.menu.game,
        () => <BookOpenText />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.event.list,
        {},
        I18N.menu.events,
        () => <Calendar />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.product.list,
        {},
        I18N.menu.products,
        () => <ShoppingCart />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.user.list,
        {},
        I18N.menu.users,
        () => <User />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.config.list,
        {},
        I18N.menu.configs,
        () => <Settings />,
        () => true
    )
];

export const USER_LINKS = [
    new HeaderLinkData(
        Routes.app.self.user,
        {},
        I18N.menu.self.account,
        () => <UserPen />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.self.events,
        {},
        I18N.menu.self.events,
        () => <Calendar />,
        () => true
    ),
    new HeaderLinkData(
        Routes.app.self.purchases,
        {},
        I18N.menu.self.purchases,
        () => <DollarSign />,
        () => true
    )
]