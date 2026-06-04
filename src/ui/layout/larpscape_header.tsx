import { Component } from "react";
import { CircleUser, LogOut, Menu, X } from "lucide-react";
import { Button, Dialog, Link, translate } from "@/core";
import { I18N, SigninDialog, Routes, AuthService } from "@/src";
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
        let auth;
        if (AuthService.user) {
            auth = <Button type="hidden" onClick={(ev) => this.toggleUserMenu()}>
                {this.state.isUserMenuOpen ? <X /> : <CircleUser />}
            </Button>
        } else {
            auth = <Button className="btn blue solid" onClick={(ev) => { Dialog.open(<SigninDialog />); }}>
                {translate(I18N.buttons.signin)}
            </Button>
        }

        return <header id="main-nav">
            <div id="top-bar">
                <Button type="hidden" onClick={(ev) => this.toggleMenu()}>
                    {this.state.isMenuOpen ? <X /> : <Menu />}
                </Button>
                {auth}
            </div>
            {this.state.isMenuOpen ? <NavMenu /> : null}
            {this.state.isUserMenuOpen ? <UserMenu /> : null}
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
}

class NavMenu extends Component {
    render() {
        return <nav id="nav-menu">
            <ul>
                {
                    NAV_LINKS.map(x => {
                        if (!x.condition()) return null;
                        return <li>
                            <Link route={Routes.app.game.list}>
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

class UserMenu extends Component {
    render() {
        return <nav id="user-menu">
            <ul>
                {
                    USER_LINKS.map(x => {
                        if (!x.condition()) return null;
                        return <li>
                            <Link route={Routes.app.game.list}>
                                {x.icon()}
                                <span>{translate(x.name)}</span>
                            </Link>
                        </li>
                    })
                }
                <li>
                    <Link route={null} onClick={ev => {}}>
                        <LogOut />
                        <span>{translate(I18N.buttons.signout)}</span>
                    </Link>
                </li>
            </ul>
        </nav>;
    }
}