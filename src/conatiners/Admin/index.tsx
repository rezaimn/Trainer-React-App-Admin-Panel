import React, {Component, Suspense} from "react";
import * as router from "react-router-dom";
import {Redirect, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import className from 'classnames';
import {accountState, initialAccountState} from 'logic';
import {
    AppBreadcrumb2 as AppBreadcrumb,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import {LazyLoading, PrivateRoute} from '../../components'
// routes config
import {navigation, routes} from "../../constants";
import {IProps} from "./indexContainer";
import {connectToSocket} from "../../socket/initialSocket";
import {toast} from "react-toastify";

const Header = React.lazy(() => import("./Header"));



class Admin extends Component<IProps> {
    userData: accountState = initialAccountState;

    constructor(props) {
        super(props);

        this.userData = JSON.parse(localStorage.getItem('userData') || initialAccountState);

    }
    componentDidMount(): void {
        connectToSocket((newMessage) => {
            if (newMessage && newMessage.data) {
                console.log(newMessage, "new msg in listen in component did mount")
                if (newMessage.data.room_id !== this.props.currenrRoomId) {
                    // ToastAndroid.show('You have new Message', ToastAndroid.LONG)
                    this.props.toggleNewMessage(true)
                    toast.info('You have new message!!!');
                }
            }

        })
    }


    getNavigations = () => {
        const navigations = {
            items: []
        }
        navigations.items = navigation.items.map(item => {
            if (item.name === 'Chat') {
                if (this.props.newMessage) {
                    item.badge = {
                        variant: "danger",
                        text: "New"
                    }
                } else {
                    if (item.badge) {
                        delete item.badge;
                    }
                }

            }
            return item;
        }).filter(item => {
            if (item.name === 'Franchise Admins' || item.name === 'Franchise') {
                if (!this.userData.roles[0].name.includes('FA')) {
                    return item;
                }
            } else {
                return item;
            }
        });
        return navigations;
    }
    signOut = (e) => {
        e.preventDefault();
        this.props.history && this.props.history.push("/login");
    }

    render() {
        const classesMain = className('main');
        const classesApp = className('app')
        const classesAppBody = className('app-body')
        const classesHeader = className('container-header')
        const classesSideBar = className('container-sideBar')
        const {newMessage} = this.props;
        this.getNavigations();
        return (
            <div className={classesApp}>
                <AppHeader fixed className={classesHeader}>
                    <Suspense fallback={<LazyLoading/>}>
                        <Header userName={this.userData ? (this.userData.firstname) : 'SMAT User'}
                                onLogout={e => this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className={classesAppBody}>
                    <AppSidebar fixed display="lg" className={classesSideBar}>
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <Suspense fallback={<LazyLoading/>}>
                            <AppSidebarNav
                                navConfig={this.getNavigations()}
                                {...this.props}
                                router={router}
                            />
                        </Suspense>
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className={classesMain}>
                        <AppBreadcrumb appRoutes={routes} router={router}/>
                        <Container fluid>
                            <Suspense fallback={<LazyLoading/>}>
                                <Switch>
                                    {routes.filter(item => {
                                        if (item.name === 'Franchise Admins' || item.name === 'Franchise') {
                                            if (!this.userData.roles[0].name.includes('FA')) {
                                                return item;
                                            }
                                        } else {
                                            return item;
                                        }
                                    }).map((route, idx) => {
                                        return route.component
                                            ? (
                                            <PrivateRoute
                                                key={idx}
                                                path={route.path}
                                                // exact={route.exact}
                                                name={route.name}
                                                component={route.component}
                                            />
                                        ) : null;
                                    })}
                                    <Redirect from="/" to="/admin/dashboard"/>
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>

            </div>
        );
    }
}

export default Admin;
