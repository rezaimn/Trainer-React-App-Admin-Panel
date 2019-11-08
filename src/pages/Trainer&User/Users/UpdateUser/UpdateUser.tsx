import React, {Component} from "react";
import {Card, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {IProps, IState} from "./UpdateUserContainer";
import classnames from "classnames";
import CreateUpdateUT from "../../Shared/CreateUpdateUsers&Trainer/CreateUpdateUTContainer";
import OverviewUser from "./OverviewUser/OverviewUser";
import ResetPassword from "../../Shared/ResetPassword/ResetPassword";
import ChangeAvatar from "../../Shared/ChangeAvatar/ChangeAvatar";
import Requests from "../../../Requests/RequestsContainer";
import UserPackageList from "./UserPackageList/UserPackageListContainer";
import {Link} from 'react-router-dom';

class UpdateUser extends Component<IProps, IState> {
    userId = 0;
    state = {
        activeTab: "1"
    };

    constructor(props) {
        super(props);

        // const  path = this.props.history.location.pathname;
        this.userId = this.props.match.params.id;
    }

    componentDidMount = () => {
        this.props.getUserProfileAction(this.userId);
    };

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        const {
            userResetPassAction,
            setAvatarAction,
            userProfile
        } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <span className="float-left">
                                <h4>
                                    User Details -{" "}
                                    {userProfile.firstname ||
                                        "" + " " + userProfile.lastname ||
                                        ""}
                                </h4>
                            </span>
                            <span className="float-right">
                                <Link className="btn btn-outline-primary bg-white rounded-btn"
                                      to={`/admin/chat/${userProfile.id}`}>
                                    <i className="fa fa-envelope-o btn-icon"></i>
                                    Messages
                                </Link>
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "1"
                                })}
                                onClick={() => {
                                    this.toggle("1");
                                }}
                            >
                                Overview
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "2"
                                })}
                                onClick={() => {
                                    this.toggle("2");
                                }}
                            >
                                Edit Basic Information
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "3"
                                })}
                                onClick={() => {
                                    this.toggle("3");
                                }}
                            >
                                User Requests
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "4"
                                })}
                                onClick={() => {
                                    this.toggle("4");
                                }}
                            >
                                User Packages
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "5"
                                })}
                                onClick={() => {
                                    this.toggle("5");
                                }}
                            >
                                Edit password
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: this.state.activeTab === "6"
                                })}
                                onClick={() => {
                                    this.toggle("6");
                                }}
                            >
                                Edit Avatar
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <OverviewUser userProfile={userProfile} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <CreateUpdateUT
                                userProfile={userProfile}
                                role={"CU"}
                            />
                        </TabPane>
                        <TabPane tabId="3">
                            <Requests
                                type={'user'}
                                userId={userProfile.id}
                            />
                        </TabPane>
                        <TabPane tabId="4">
                            <UserPackageList
                                userId={userProfile.id}
                            />
                        </TabPane>
                        <TabPane tabId="5">
                            <Row>
                                <Col sm="12">
                                    <ResetPassword
                                        email={userProfile.email}
                                        userResetPassAction={
                                            userResetPassAction
                                        }
                                    />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="6">
                            <ChangeAvatar
                                setAvatarAction={setAvatarAction}
                                userId={this.userId}
                                currentAvatar={userProfile.avatar}
                            />
                        </TabPane>
                    </TabContent>
                </Card>
            </div>
        );
    }
}

export default UpdateUser
