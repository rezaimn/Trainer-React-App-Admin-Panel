import React, {Component} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from "reactstrap";

import {AppNavbarBrand, AppSidebarToggler} from "@coreui/react";
import logo from "../../assets/img/logo.png";
import sygnet from "../../assets/img/logo.png";
import avatar from '../../assets/img/avatar.png'
import {clearToken} from "../../utilities";

interface IProps {
    onLogout: (e: any) => void;
    userName: string
} 


class Header extends Component<IProps> {

    signout = () => {
        clearToken();
        window.location.pathname = "/login";
    }
    render() {
        const {userName} = this.props;
        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{
                        src: logo,
                        width: 124,
                        height: 16,
                        alt: "logo"
                    }}
                    minimized={{
                        src: sygnet,
                        width: 30,
                        height: 30,
                        alt: "logo"
                    }}
                />
                <AppSidebarToggler className="d-md-down-none " display="lg" />

                <Nav className="ml-auto" navbar>
                    <NavItem className="d-md-down-none color-white">
                        {userName}
                    </NavItem>
                    <UncontrolledDropdown nav direction="down">
                        <DropdownToggle nav>
                            <img
                                src={avatar}
                                className="img-avatar"
                                alt="admin@smat.com"
                            />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem
                                header
                                tag="div"
                                className="text-center"
                            >
                                <strong>Account</strong>
                            </DropdownItem>
                            <DropdownItem onClick={this.signout}>
                                <i className="fa fa-sign-out" /> Sign out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}


export default Header;
