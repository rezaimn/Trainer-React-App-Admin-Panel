import React, {Component} from "react";
import {Card, Col, Row} from "reactstrap";
import {AvatarAndPersonalInfo} from '../../../../../components'
import {AccountState} from "logic/src/models";


interface IProps {
    userProfile: AccountState;
}


class OverviewFA extends Component<IProps> {
    state = {
        collapse: {
            other_info: false,
            general_states: false,
            earnings: false,
            client_list: false,

        }
    };
    toggle = (collapseItem) => {
        this.state.collapse[collapseItem] = !this.state.collapse[collapseItem];
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
        return (
            <div>
                <Card>
                    <Row>
                        <Col sm="12">
                            <AvatarAndPersonalInfo userProfile={userProfile}/>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default OverviewFA;
