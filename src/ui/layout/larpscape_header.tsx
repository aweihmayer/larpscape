import { Component } from "react";
import { CircleUser, LogIn, LogOut, Menu, X } from "lucide-react";
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
        let userMenuButton
        if (this.state.isMenuOpen) {
            userMenuButton = null
        } else if (AuthService.user.hasPermissions(Role.MEMBER)) {
            userMenuButton = <Button
                className="btn"
                onClick={() => this.toggleUserMenu()}
            >
                {this.state.isUserMenuOpen ? <X /> : <CircleUser />}
            </Button>
        } else {
            userMenuButton = <Button
                className="btn blue-solid"
                onClick={() => Dialog.open(<SigninDialog />)}
            >
                <span>{translate(I18N.buttons.signin)} </span>
                <LogIn />
            </Button>
        }

        return <header id="main-nav">
            <div id="top-bar">
                <div>
                    <Button
                        className="btn"
                        onClick={(ev) => this.toggleMenu()}
                    >
                        {this.state.isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <div>
                    {userMenuButton}
                </div>
            </div>
            {this.state.isMenuOpen ? <NavMenu onNav={ev => this.closeMenus()} /> : null}
            {this.state.isUserMenuOpen ? <UserMenu onNav={ev => this.closeMenus()} /> : null}
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

    closeMenus() {
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
                            <Link
                                route={x.route}
                                onClick={this.props.onNav}
                                className="btn"
                            >
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
                        if (!x.condition()) return null
                        return <li key={x.route.path}>
                            <Link
                                route={x.route}
                                onClick={this.props.onNav}
                                className="btn"
                            >
                                <span>{translate(x.name)}</span>
                                {x.icon()}
                            </Link>
                        </li>
                    })
                }
                <li>
                    <Button className="btn" onClick={ev => this.signout(ev)}>
                        <span>{translate(I18N.buttons.signout)}</span>
                        <LogOut className="small" />
                    </Button>
                </li>
            </ul>
        </nav>;
    }

    signout(ev: any) {
        this.props.onNav(ev)
        AuthService.signout()
    }
}