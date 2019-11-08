import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {initialState, IProps, IState} from './TrainerOpportunitiesContainer'
import {Link} from 'react-router-dom';

class TrainerOpportunities extends Component<IProps, IState> {
    requestId = 0;
    currentPage = 1;
    state = {
        ...initialState
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            if (nextProps.userId > 0) {
                this.props.getUserOpportunitiesAction(nextProps.userId, 'TH');
            }
        }
    };
    componentDidMount = () => {

    };


    render() {
        const {userOpportunityList} = this.props;
        const {isShowModal, item} = this.state;
        return (
            <div className="animated fadeIn">

                <Row>
                    {userOpportunityList &&
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> TRAINER OPPORTUNITIES
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                >
                                    <thead>{<HeaderTable/>}</thead>
                                    <tbody>
                                    {userOpportunityList && userOpportunityList.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>{(item.trainerInfo.firstname || '') + ' ' + (item.trainerInfo.lastname || '')}</td>
                                            <td>{(item.customerInfo.firstname || '') + ' ' + (item.customerInfo.lastname || '')}</td>
                                            <td>{item.status || ''}</td>
                                            <td>{item.type || ''}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/sessions/list/trainer/${item.id}`}
                                                    className="fa fa-lg fa-edit text-primary pointer"
                                                ></Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    }

                </Row>
            </div>
        );
    }
}

export default TrainerOpportunities;
