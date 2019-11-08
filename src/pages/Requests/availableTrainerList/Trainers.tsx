import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {Thumbnail} from "../../../components";
import {IProps, IState} from './TrainersContainer'
import Avatar from "../../../assets/img/avatar.png";
import {AccountState} from "logic/src/models/app/account";

class Trainers extends Component<IProps, IState> {
    users: AccountState[] = [];
    componentDidMount = () => {

    };
    componentWillReceiveProps = nextProps => {
        if (nextProps.opportunitiesList) {

        }
    };
    assignTrainerToARequest = (trainerId) => {
        let body = {
            client_id: this.props.opportunitiesList.RequestData.user_id,
            trainer_id: trainerId,
            request_id: this.props.opportunitiesList.RequestData.id
        };
        this.props.AssignTrainerToARequest(body);
        /////////////////assign trainer should add here
    };

    render() {
        const {availableTrainerList} = this.props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> ALL TRAINERS
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<HeaderTable/>}</thead>
                                    <tbody>
                                    {availableTrainerList && availableTrainerList.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Thumbnail
                                                    src={item.avatar || Avatar}
                                                    circle
                                                />
                                            </td>
                                            <td>{item.firstname || '' + item.lastname || ''}</td>
                                            <td>{item.zipcode || ''}</td>
                                            <td/>
                                            <td>{item.status === false ? 'No' : 'Yes'}</td>
                                            <td>{item.created_at || ''}</td>
                                            <td>
                                                <a className="fa fa-lg fa-plus primary-color pointer"
                                                   onClick={() => {
                                                          this.assignTrainerToARequest(item.id)
                                                   }}></a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Trainers;
