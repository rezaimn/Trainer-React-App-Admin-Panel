import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Collapse, Label, Row} from "reactstrap";
import {AvatarAndPersonalInfo, TextInput} from '../../../../../components'
import {AccountState} from "logic/src/models";


interface IProps {
    userProfile: AccountState;
}

class OverviewUser extends Component<IProps> {
    state = {
        collapse: {
            request_trainer: false,
            general_states: false,
            users_package_info: false,
            sessions: false,
            payment_list: false,
        }
    };
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
    };
    toggle = (collapseItem) => {
        this.setState({
            collapse: {
                ...this.state.collapse,
                [collapseItem]: !this.state.collapse[collapseItem]
            }
        })
    };
    render() {
        const {
            userProfile
        } = this.props;
        return (
            <div>
                <Card>
                    <Row>
                        <Col sm={12}>
                            <AvatarAndPersonalInfo userProfile={userProfile}/>
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Col sm="6">
                        <Card>
                            <CardHeader onClick={() => {
                                this.toggle('general_states')
                            }}>
                                <CardTitle>
                                    <h5 className="font-weight-bold card-header-title">GENERAL STATES</h5>
                                </CardTitle>
                            </CardHeader>

                            <Collapse isOpen={this.state.collapse.general_states}>

                                <CardBody>
                                    <form>
                                        {/* dob */}
                                        <Label for="exampleDate" className="mt-4">
                                            Start Date
                                        </Label>
                                        <TextInput
                                            icon={"icon-user"}
                                            placeholder="Start Date"
                                            name="start_date"
                                            required
                                            type={"date"}
                                            value={null}
                                            textInvalid={
                                                "Start is required"
                                            }
                                            // invalid={
                                            //     createForm.dob === "" && formInvalid
                                            // }
                                            onChange={this.onChangeTextInput}
                                        />
                                        {/* dob */}
                                        <Label for="exampleDate" className="mt-4">
                                            End Date
                                        </Label>
                                        <TextInput
                                            icon={"icon-user"}
                                            placeholder="End Date"
                                            name="end_date"
                                            required
                                            type={"date"}
                                            value={null}
                                            textInvalid={
                                                "End Date is required"
                                            }
                                            // invalid={
                                            //     createForm.dob === "" && formInvalid
                                            // }
                                            onChange={this.onChangeTextInput}
                                        />
                                    </form>
                                </CardBody>

                            </Collapse>
                        </Card>
                    </Col>
                    {/*<Col sm="6">*/}
                    {/*    <Card>*/}
                    {/*        <CardHeader onClick={() => {*/}
                    {/*            this.toggle('users_package_info')*/}
                    {/*        }}>*/}

                    {/*            <span className="float-left">*/}
                    {/*                <CardTitle>*/}
                    {/*                    <h5 className="font-weight-bold card-header-title">USER’S PACKAGE INFORMATION</h5>*/}
                    {/*                </CardTitle>*/}
                    {/*            </span>*/}
                    {/*        </CardHeader>*/}

                    {/*        <Collapse isOpen={this.state.collapse.users_package_info}>*/}

                    {/*            <CardBody>*/}
                    {/*                <Row>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Auto Renew</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">ACTIVATE</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Number Of Months</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p><strong>12</strong> months</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">How Times</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p><strong>3</strong>sessions per week</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Additional Person</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p></p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Price Per Session</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">14850.00$</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Payment Periodicity</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p>One</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <p className="font-weight-bold">Total Price</p>*/}
                    {/*                        <p className="font-weight-bold">Paid Sessions</p>*/}
                    {/*                        <p className="font-weight-bold">Completed Sessions</p>*/}
                    {/*                        <p className="font-weight-bold">Remaining Sessions</p>*/}
                    {/*                        <p className="font-weight-bold">Total Committed Session</p>*/}
                    {/*                        <p className="font-weight-bold">Free Sessions</p>*/}
                    {/*                        <p className="font-weight-bold">Expiration Date of Package</p>*/}
                    {/*                        <p className="font-weight-bold">Promo Code</p>*/}
                    {/*                    </Col>*/}
                    {/*                    <Col className="col-6">*/}
                    {/*                        <h5 className="font-weight-bold">14850.00$</h5>*/}
                    {/*                        <h5 className="font-weight-bold">234</h5>*/}
                    {/*                        <h5 className="font-weight-bold">0</h5>*/}
                    {/*                        <h5 className="font-weight-bold">148</h5>*/}
                    {/*                        <h5 className="font-weight-bold">148</h5>*/}
                    {/*                        <h5 className="font-weight-bold">10</h5>*/}
                    {/*                        <h5 className="font-weight-bold">2020-06-20</h5>*/}
                    {/*                        <h5 className="font-weight-bold">324325365346</h5>*/}
                    {/*                    </Col>*/}
                    {/*                    <hr/>*/}
                    {/*                    <Col className="col-12">*/}
                    {/*                        <span className="float-left">*/}
                    {/*                          <Button className="btn btn-outline-light bg-primary rounded-btn">*/}
                    {/*                             <i className="fa fa-envelope-o btn-icon"></i>*/}
                    {/*                            Purchased Package*/}
                    {/*                          </Button>*/}
                    {/*                        </span>*/}
                    {/*                        <span className="float-left">*/}
                    {/*                          <Button className="btn btn-outline-light bg-primary rounded-btn">*/}
                    {/*                             <i className="fa fa-envelope-o btn-icon"></i>*/}
                    {/*                            Edit User Package*/}
                    {/*                          </Button>*/}
                    {/*                        </span>*/}
                    {/*                        <span className="float-left">*/}
                    {/*                          <Button className="btn btn-outline-light bg-primary rounded-btn">*/}
                    {/*                             <i className="fa fa-envelope-o btn-icon"></i>*/}
                    {/*                            Suspend User Package*/}
                    {/*                          </Button>*/}
                    {/*                        </span>*/}
                    {/*                        <span className="float-left">*/}
                    {/*                          <Button className="btn btn-outline-light bg-primary rounded-btn">*/}
                    {/*                             <i className="fa fa-envelope-o btn-icon"></i>*/}
                    {/*                            New User Package*/}
                    {/*                          </Button>*/}
                    {/*                        </span>*/}
                    {/*                    </Col>*/}
                    {/*                </Row>*/}
                    {/*            </CardBody>*/}

                    {/*        </Collapse>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}
                    <Col sm="6">
                        <Card>
                            <CardHeader onClick={() => {
                                this.toggle('payment_list')
                            }}>
                                <CardTitle>
                                    <h5 className="font-weight-bold card-header-title">Payment List</h5>
                                </CardTitle>
                            </CardHeader>

                            <Collapse isOpen={this.state.collapse.payment_list}>

                                <CardBody>
                                    {/*<form>*/}
                                    {/*    /!* dob *!/*/}
                                    {/*    <Label for="exampleDate" className="mt-4">*/}
                                    {/*        Start Date*/}
                                    {/*    </Label>*/}
                                    {/*    <TextInput*/}
                                    {/*        icon={"icon-user"}*/}
                                    {/*        placeholder="Start Date"*/}
                                    {/*        name="start_date"*/}
                                    {/*        required*/}
                                    {/*        type={"date"}*/}
                                    {/*        value={null}*/}
                                    {/*        textInvalid={*/}
                                    {/*            "Start is required"*/}
                                    {/*        }*/}
                                    {/*        // invalid={*/}
                                    {/*        //     createForm.dob === "" && formInvalid*/}
                                    {/*        // }*/}
                                    {/*        // onChange={this.onChangeTextInput}*/}
                                    {/*    />*/}
                                    {/*    /!* dob *!/*/}
                                    {/*    <Label for="exampleDate" className="mt-4">*/}
                                    {/*        End Date*/}
                                    {/*    </Label>*/}
                                    {/*    <TextInput*/}
                                    {/*        icon={"icon-user"}*/}
                                    {/*        placeholder="End Date"*/}
                                    {/*        name="end_date"*/}
                                    {/*        required*/}
                                    {/*        type={"date"}*/}
                                    {/*        value={null}*/}
                                    {/*        textInvalid={*/}
                                    {/*            "End Date is required"*/}
                                    {/*        }*/}
                                    {/*        // invalid={*/}
                                    {/*        //     createForm.dob === "" && formInvalid*/}
                                    {/*        // }*/}
                                    {/*        // onChange={this.onChangeTextInput}*/}
                                    {/*    />*/}
                                    {/*</form>*/}
                                </CardBody>

                            </Collapse>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card>
                            <CardHeader onClick={() => {
                                this.toggle('sessions')
                            }}>
                                <CardTitle>
                                    <h5 className="font-weight-bold card-header-title">Sessions</h5>
                                </CardTitle>
                            </CardHeader>

                            <Collapse isOpen={this.state.collapse.sessions}>

                                <CardBody>
                                    {/*<form>*/}
                                    {/*    /!* dob *!/*/}
                                    {/*    <Label for="exampleDate" className="mt-4">*/}
                                    {/*        Start Date*/}
                                    {/*    </Label>*/}
                                    {/*    <TextInput*/}
                                    {/*        icon={"icon-user"}*/}
                                    {/*        placeholder="Start Date"*/}
                                    {/*        name="start_date"*/}
                                    {/*        required*/}
                                    {/*        type={"date"}*/}
                                    {/*        value={createForm.dob}*/}
                                    {/*        textInvalid={*/}
                                    {/*            "Start is required"*/}
                                    {/*        }*/}
                                    {/*        invalid={*/}
                                    {/*            createForm.dob === "" && formInvalid*/}
                                    {/*        }*/}
                                    {/*        onChange={this.onChangeTextInput}*/}
                                    {/*    />*/}
                                    {/*    /!* dob *!/*/}
                                    {/*    <Label for="exampleDate" className="mt-4">*/}
                                    {/*        End Date*/}
                                    {/*    </Label>*/}
                                    {/*    <TextInput*/}
                                    {/*        icon={"icon-user"}*/}
                                    {/*        placeholder="End Date"*/}
                                    {/*        name="end_date"*/}
                                    {/*        required*/}
                                    {/*        type={"date"}*/}
                                    {/*        value={createForm.dob}*/}
                                    {/*        textInvalid={*/}
                                    {/*            "End Date is required"*/}
                                    {/*        }*/}
                                    {/*        invalid={*/}
                                    {/*            createForm.dob === "" && formInvalid*/}
                                    {/*        }*/}
                                    {/*        onChange={this.onChangeTextInput}*/}
                                    {/*    />*/}
                                    {/*</form>*/}
                                </CardBody>

                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OverviewUser;
