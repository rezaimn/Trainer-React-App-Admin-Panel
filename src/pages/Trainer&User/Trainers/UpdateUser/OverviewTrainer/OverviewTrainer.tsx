import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Collapse, Label, Row} from "reactstrap";
import {AvatarAndPersonalInfo, TextInput} from '../../../../../components'
import {AccountState} from "logic/src/models";
import ClientList from "./ClientList/ClientListContainer";
import SessionEarnings from "../../../../SessionEarnings/SessionEarningsContainer";

interface IProps {
    userProfile: AccountState;
    match: any;
}


class OverviewTrainer extends Component<IProps> {
    state = {
        collapse: {
            other_info: false,
            general_states: false,
            earnings: false,
            client_list: false,
        },
        activeTab: "1"
    };
    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    toggle = (collapseItem) => {

        this.setState({
            collapse: {
                ...this.state.collapse,
                [collapseItem]: !this.state.collapse[collapseItem]
            }
        })
    };
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        // this.setState({
        //     createForm: {
        //         ...this.state.createForm,
        //         [name]: value
        //     }
        // });
    };

    render() {
        const {
            userProfile
        } = this.props;
        const {collapse} = this.state;
        return (
            <div>
                <Card>
                    <Row>
                        <Col sm="12">
                            <AvatarAndPersonalInfo userProfile={userProfile}/>
                        </Col>
                    </Row>
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

                                <Collapse isOpen={collapse.general_states}>

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

                        <Col sm="6">
                            <Card>
                                <CardHeader onClick={() => {
                                    this.toggle('earnings')
                                }}>
                                    <CardTitle>
                                        <h5 className="font-weight-bold card-header-title">EARNINGS</h5>
                                    </CardTitle>
                                </CardHeader>

                                <Collapse isOpen={collapse.earnings}>

                                    <CardBody>
                                        <SessionEarnings trainerId={userProfile.id} match={this.props.match}/>
                                    </CardBody>

                                </Collapse>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card>
                                <CardHeader onClick={() => {
                                    this.toggle('client_list')
                                }}>
                                    <CardTitle>
                                        <h5 className="font-weight-bold card-header-title">CLIENT LIST</h5>
                                    </CardTitle>
                                </CardHeader>

                                <Collapse isOpen={collapse.client_list}>

                                    <CardBody>
                                        <ClientList trainerId={userProfile.id}/>
                                    </CardBody>

                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default OverviewTrainer;
