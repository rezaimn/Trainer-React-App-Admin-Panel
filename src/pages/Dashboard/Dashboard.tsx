import React, {Component} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from "reactstrap";
import Select from 'react-select';
import {IProps, IState} from "./DashboardContainer";

class Dashboard extends Component<IProps, IState> {
    state = {
        appSettingsFormData: {
            require_admin_approval: "",
            request_distance: "",
            show_trainer: 0,
            package_messaging: "",
            review_session: 0,
            minimum_payout: 0
        },
        showTrainerToggle: false,
        distanceToggle: false,
        allowMessageToggle: false,
        sessionCountToggle: false,
        isError: false,
        formInvalid: false
    };

    distances = Array.from(Array(10).keys()).map(i => {
        return {name: ++i * 5, id: i * 5}
    });

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({
            appSettingsFormData: {
                ...this.state.appSettingsFormData,
                [name]: value
            }
        });
    };

    componentDidMount() {
        this.props.getSettingsAction(1);
        this.props.getDashboardDataAction();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.appSetting) {
            this.setState({
                appSettingsFormData: {
                    show_trainer: nextProps.appSetting.show_trainer,
                    package_messaging: nextProps.appSetting.package_messaging,
                    request_distance: nextProps.appSetting.request_distance,
                    require_admin_approval: nextProps.appSetting.require_admin_approval,
                    review_session: nextProps.appSetting.review_session
                }
            });
        }
    }


    onSubmitAppSettings = evt => {
        evt.preventDefault();
        if (evt.target.checkValidity()) {
            this.props.updateSettingsAction(1, this.state.appSettingsFormData);
            return;
        } else {
            this.setState({formInvalid: true});
            return;
        }
    };

    dropDownItemChange = (item, value) => {
        console.log(item, value);
        this.setState({
            appSettingsFormData: {
                ...this.state.appSettingsFormData,
                [value.name]: item["id"]
            }
        });
    }

    render() {
        const {
            appSettingsFormData,
            formInvalid
        } = this.state;
        const {dashboardData} = this.props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-info">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.usersCount}</div>
                                <div>Users</div>
                                <div>{dashboardData.usersInWeekCount} New users in this week</div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards  bg-danger">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.trainersCount}</div>
                                <div>Trainers</div>
                                <div>{dashboardData.trainersInWeekCount} New trainers in this week</div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-warning">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.sessionsCount}</div>
                                <div>Sessions</div>
                                <div>{dashboardData.sessionsInWeekCount} New sessions in this week</div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-primary">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.buyPackagesCount}</div>
                                <div>Buy Packages</div>
                                <div>{dashboardData.buyPackagesInWeekCount} New buy in this week</div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-spotify">
                            <CardBody className="pb-0">
                                <div className="active-inactive-text">
                                    Active Users
                                </div>
                                <div>{dashboardData.activeUsersCount}</div>
                                <div className="active-inactive-text">
                                    Inactive Users
                                </div>
                                <div>{dashboardData.inActiveUsersCount}</div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-success">
                            <CardBody className="pb-0">
                                <div className="active-inactive-text">
                                    Active Trainers
                                </div>
                                <div>{dashboardData.activeTrainersCount}</div>
                                <div className="active-inactive-text">
                                    Inactive Trainers
                                </div>
                                <div>{dashboardData.inActiveTrainersCount}</div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-flickr">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.openRequestsCount}</div>
                                <div>Open Requests</div>
                                <div>{dashboardData.newClientRequestsCount} New client requests</div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white dash-cards bg-purple">
                            <CardBody className="pb-0">
                                <div className="text-value">{dashboardData.franchiseAdminsCount}</div>
                                <div>Franchise Admins</div>
                                <div>{dashboardData.franchiseAdminsInWeekCount} New Franchise admin this week</div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Card className="app-settings-card">
                        <CardHeader>App Settings</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={this.onSubmitAppSettings}
                                noValidate
                            >
                                <Row className="row drop-down-row">
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2 truncate"}>
                                            Show automatically or require admin approval to show trainer on the client
                                            app
                                        </Label>
                                        <Select
                                            className={"w-100"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={[{name: 'Automatically', id: true}, {
                                                name: 'Require Admin',
                                                id: false
                                            }]}
                                            name={"require_admin_approval"}
                                            placeholder="Show Trainer"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItemChange}
                                            menuShouldBlockScroll
                                            value={appSettingsFormData.require_admin_approval ?
                                                [{name: 'Automatically', id: true}] : [{
                                                    name: 'Require Admin',
                                                    id: false
                                                }]}
                                        />
                                    </Col>
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2"}>
                                            Request Distance in miles
                                        </Label>
                                        <Select
                                            className={"w-100"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={this.distances}
                                            name={"request_distance"}
                                            placeholder="Distance Per Mile"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItemChange}
                                            menuShouldBlockScroll
                                            value={appSettingsFormData.request_distance && this.distances.filter(i => i.id + "" == appSettingsFormData.request_distance)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="row drop-down-row">
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2"}>
                                            How many available trainers will show on the clients apps
                                        </Label>
                                        <InputGroup>

                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            {
                                                appSettingsFormData &&
                                                <Input
                                                    required
                                                    type="number"
                                                    placeholder="How many available trainers will show on the clients apps"
                                                    autoComplete="current-password"
                                                    name="show_trainer"
                                                    value={
                                                        appSettingsFormData.show_trainer
                                                    }
                                                    invalid={
                                                        appSettingsFormData.show_trainer ===
                                                        0 && formInvalid
                                                    }
                                                    onChange={this.onChangeTextInput}
                                                />
                                            }

                                            <FormFeedback>
                                                {"Trainer Count is required"}
                                            </FormFeedback>
                                        </InputGroup>
                                    </Col>
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2"}>
                                            Minimum Payout
                                        </Label>
                                        <InputGroup>

                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            {
                                                appSettingsFormData &&
                                                <Input
                                                    required
                                                    type="number"
                                                    placeholder="Minimum Payout"
                                                    autoComplete="current-password"
                                                    name="minimum_payout"
                                                    value={
                                                        appSettingsFormData.minimum_payout
                                                    }
                                                    invalid={
                                                        appSettingsFormData.minimum_payout ===
                                                        0 && formInvalid
                                                    }
                                                    onChange={this.onChangeTextInput}
                                                />
                                            }

                                            <FormFeedback>
                                                {"Minimum Payout is required"}
                                            </FormFeedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="row drop-down-row">
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2"}>
                                            Messaging if user does has not purchased package
                                        </Label>
                                        <Select
                                            className={"w-100"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={[{name: 'Allow', id: true}, {name: 'DisAllow', id: false}]}
                                            name={"package_messaging"}
                                            placeholder="Allow Message"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItemChange}
                                            menuShouldBlockScroll
                                            value={appSettingsFormData.package_messaging ? [{
                                                name: 'Allow',
                                                id: true
                                            }] : [{name: 'DisAllow', id: false}]}
                                        />
                                    </Col>
                                    <Col md="6" className="margin-top-10">
                                        <Label className={"mt-2"}>
                                            After how many sessions can you give a review
                                        </Label>
                                        <Input
                                            required
                                            type="number"
                                            placeholder="After how many sessions can you give a review"
                                            name="review_session"
                                            value={
                                                appSettingsFormData.review_session
                                            }
                                            invalid={
                                                appSettingsFormData.review_session ===
                                                0 && formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" sm="4" xs="6">
                                        <Button
                                            type="submit"
                                            className="px-4 primary-btn width_100P"
                                        >

                                            Save

                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
