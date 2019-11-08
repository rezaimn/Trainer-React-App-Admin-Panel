import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import AssignedHeaderTable from "./AssignedHeaderTable";
import {Thumbnail} from "../../../components";
import {IProps, IState} from './RequestOpportunitiesContainer'
import Avatar from "../../../assets/img/avatar.png";
import Trainers from "../availableTrainerList/TrainersContainer";
import {initialState} from "../../Packages/CategoryPackage/CategoryPackageContainer";
import EditOpportunityModal from "./EditOpportunitiyModal/EditOpportunityModal";

class RequestOpportunities extends Component<IProps, IState> {
    requestId = 0;
    currentPage = 1;
    state = {
        ...initialState
    };

    constructor(props) {
        super(props);
        this.requestId = this.props.match.params.requestId;
    }

    componentDidMount = () => {
        this.props.getAllOpportunitiesAction(this.requestId, this.currentPage);
    };

    deleteTrainerFromRequest = (opportunityId) => {

        this.props.deleteTrainerFromRequest(opportunityId, this.requestId);
        /////////////////assign trainer should add here
    };
    onEditOpportunity = item => {
        this.setState({item: item});
        this.setState({isShowModal: true})
    };

    onToggleModal = () =>
        this.setState(prevState => ({isShowModal: !prevState.isShowModal}));


    render() {
        const {opportunitiesList} = this.props;
        const {isShowModal, item} = this.state;
        const requestData = opportunitiesList.RequestData;
        return (
            <div className="animated fadeIn">

                <Row>
                    {requestData &&
                    <Col>

                        <Card>
                            <CardHeader>
                                <h4>
                                    <strong>{requestData.user && requestData.user.firstname + ' ' + requestData.user.lastname} </strong> Request
                                    Details</h4>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="col-2">
                                        <img
                                            className="profile-img"
                                            src={requestData.user && requestData.user.avatar || Avatar}
                                            alt={'profile picture'}
                                        />
                                    </Col>
                                    <Col className="col-2  mt-5">
                                        <p>Full Name</p>
                                        <p>{requestData.user && requestData.user.firstname + ' ' + requestData.user.lastname}</p>
                                    </Col>
                                    <Col className="col-2  mt-5">
                                        <p>Email</p>
                                        <p>{requestData.user && requestData.user.email}</p>
                                    </Col>
                                    <Col className="col-2  mt-5">
                                        <p>Zip Code</p>
                                        <p>{requestData.user && requestData.user.zipcode}</p>
                                    </Col>
                                    <Col className="col-2  mt-5">
                                        <p>Joined Date</p>
                                        <p>{requestData.user && requestData.user.created_at}</p>
                                    </Col>
                                    <Col className="col-2  mt-5">
                                        <p>Code</p>
                                        <p>{requestData.user && requestData.user.code}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                    }
                </Row>
                <Row>
                    {requestData &&
                    <Col className="col-6">
                        <Card>
                            <CardHeader className="bg-primary">
                                <h5> Request Details</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="col-6">
                                        <p className="font-weight-bold mb-0">Fitness goals</p>
                                    </Col>
                                    <Col className="col-6">
                                        {requestData.goals && requestData.goals.map(item => {
                                            return <p className="mb-0" key={item.goal_id}>{item.goal.name}</p>
                                        })}
                                    </Col>
                                    <hr/>
                                    <Col className="col-6">
                                        <p className="font-weight-bold mb-0">Injuries / Pre-existing medical
                                            conditions</p>
                                    </Col>
                                    <Col className="col-6">
                                        {requestData.injuries && requestData.injuries.map(item => {
                                            return <p className="mb-0" key={item.injury_id}>{item.injury.name}</p>
                                        })}
                                    </Col>

                                    <hr/>
                                    <Col className="col-6">
                                        <p className="font-weight-bold mb-0">Place to train</p>
                                    </Col>
                                    <Col className="col-6">
                                        <p className="mb-0">{requestData.place && requestData.place}</p>
                                    </Col>

                                    <hr/>
                                    <Col className="col-6">
                                        <p className="font-weight-bold mb-0">When</p>
                                    </Col>
                                    <Col className="col-6">
                                        {opportunitiesList.data[0] && requestData && requestData.hours[0] && requestData.hours[0].hours.map(item => {
                                            return <p className="mb-0" key={item.day}>
                                                <strong>{item.day}: </strong> {item.morning ? '- Morning' : ''} {item.afternoon ? '- Afternoon' : ''} {item.evening ? '- Evening' : ''}
                                            </p>
                                        })}
                                    </Col>

                                    <hr/>
                                    <Col className="col-6">
                                        <p className="font-weight-bold mb-0">Additional info</p>
                                    </Col>
                                    <Col className="col-6">
                                        <p className="mb-0">{requestData.addition_info && requestData.addition_info}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    }
                    <Col className="col-6">
                        <Card>
                            <CardHeader className="bg-primary">
                                <h5> Purchase Details</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    {opportunitiesList.data &&
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> ASSIGNED TRAINERS
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<AssignedHeaderTable/>}</thead>
                                    <tbody>
                                    {opportunitiesList && opportunitiesList.data.data.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Thumbnail
                                                    src={item.trainerInfo.avatar || Avatar}
                                                    circle
                                                />
                                            </td>
                                            <td>{item.trainerInfo.firstname || '' + item.trainerInfo.lastname || ''}</td>
                                            <td className={item &&  item.trainerInfo && item.trainerInfo.TrainerDetails && item.trainerInfo.TrainerDetails.searchable ? 'bg-success' : 'bg-danger'}></td>
                                            <td className={item &&  item.trainerInfo && item.trainerInfo.TrainerDetails && item.trainerInfo.TrainerDetails.profession ? 'bg-success' : 'bg-danger'}></td>
                                            <td>{item.trainerInfo.zipcode || ''}</td>
                                            <td>{item.trainerInfo.created_at || ''}</td>
                                            <td>{item.status || ''}</td>
                                            <td>{item.type || ''}</td>
                                            <td>
                                                <span onClick={() => this.onEditOpportunity(item)}
                                                      className="fa fa-lg fa-edit text-primary pointer"></span>
                                                <span className="fa fa-lg fa-remove danger-color pointer"
                                                      onClick={() => {
                                                          this.deleteTrainerFromRequest(item.id)
                                                      }}></span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    }
                    {opportunitiesList.data &&
                    <Col>
                        <Trainers/>
                    </Col>
                    }
                </Row>
                {isShowModal && (<EditOpportunityModal
                        isShowModal={isShowModal}
                        item={item}
                        onToggleModal={this.onToggleModal}
                    />
                )}
            </div>
        );
    }
}

export default RequestOpportunities;
