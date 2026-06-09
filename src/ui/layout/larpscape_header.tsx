import { Component } from "react";
import { CircleUser, LogOut, Menu, X } from "lucide-react";
import { Button, Dialog, Link, translate } from "@/core";
import { I18N, SigninDialog, Routes, AuthService, Role } from "@/src";
import { NAV_LINKS, USER_LINKS } from "./header_links";

interface State {
    isMenuOpen: boolean
    isUserMenuOpen: boolean
}

export class LarpscapeHeader extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { isMenuOpen: false, isUserMenuOpen: false };
    }

    render() {
        return <header id="main-nav">
            <div id="top-bar">
                <div>
                    <Button
                        className="btn-hidden"
                        onClick={(ev) => this.toggleMenu()}
                    >
                        {this.state.isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <div>
                    {AuthService.user.hasPermissions(Role.MEMBER) ? (
                        <Button
                            className="btn-hidden"
                            onClick={() => this.toggleUserMenu()}
                        >
                            {this.state.isUserMenuOpen ? <X /> : <CircleUser />}
                        </Button>
                    ) : (
                        <Button
                            className="btn blue-solid"
                            onClick={() => Dialog.open(<SigninDialog />)}
                        >
                            {translate(I18N.buttons.signin)}
                        </Button>
                    )}
                </div>
            </div>
            {this.state.isMenuOpen ? <NavMenu onNav={ev => this.closeMenus} /> : null}
            {this.state.isUserMenuOpen ? <UserMenu onNav={ev => this.closeMenus} /> : null}
        </header>
    }

    toggleMenu() {
        if (this.state.isMenuOpen) {
            document.body.classList.remove('open-menu');
        } else {
            document.body.classList.add('open-menu');
        }
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
            isUserMenuOpen: false
        });
    }
    
    toggleUserMenu() {
        if (this.state.isUserMenuOpen) {
            document.body.classList.remove('open-menu');
        } else {
            document.body.classList.add('open-menu');
        }
        this.setState({
            isMenuOpen: false,
            isUserMenuOpen: !this.state.isUserMenuOpen
        });
    }

    closeMenus(ev: any) {
        document.body.className = '';
        this.setState({
            isMenuOpen: false,
            isUserMenuOpen: false
        });
    }
}

interface MenuProps {
    onNav: ((ev: any) => void)
}

class NavMenu extends Component<MenuProps, {}> {
    render() {
        return <nav id="nav-menu">
            <ul>
                {
                    NAV_LINKS.map(x => {
                        if (!x.condition()) return null;
                        return <li key={x.route.path}>
                            <Link route={x.route} onClick={this.props.onNav}>
                                {x.icon()}
                                <span>{translate(x.name)}</span>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </nav>;
    }
}

class UserMenu extends Component<MenuProps, {}> {
    render() {
        return <nav id="user-menu">
            <ul>
                {
                    USER_LINKS.map(x => {
                        if (!x.condition()) return null;
                        return <li key={x.route.path}>
                            <Link route={x.route} onClick={this.props.onNav}>
                                <span>{translate(x.name)} </span>
                                {x.icon()}
                            </Link>
                        </li>
                    })
                }
                <li>
                    <Button className="btn-hidden" onClick={ev => AuthService.signout()}>
                        <span>{translate(I18N.buttons.signout)} </span>
                        <LogOut />
                    </Button>
                </li>
            </ul>
        </nav>;
    }
}