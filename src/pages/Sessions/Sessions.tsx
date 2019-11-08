import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {initialCurrentSession, initialState, IProps, IState} from './SessionsContainer'
import SessionUpdateModal from "./SessionUpdateModal/SessionUpdateModalContainer";
import {AlertModal} from "../../components";

class Sessions extends Component<IProps, IState> {
    type = 'all';
    oppId = 0;

    state = {
        ...initialState
    }

    constructor(props) {
        super(props);
        this.type = this.props.match.params.type;
        this.oppId = this.props.match.params.oppId;
    }
    onAddSession = () => {
        this.setState({
            isUpdate: false
        });
        this.setState({isShowUpdateModal: true});
    }
    onToggleUpdateModal = () => {
        this.setState(prevState => ({isShowUpdateModal: !prevState.isShowUpdateModal}));
        this.setState({item: initialCurrentSession});
    }
    onLoadCurrentSession = (item) => {
        this.setState({
            isUpdate: true
        });
        this.setState({item: item});
        this.setState({isShowUpdateModal: true});
    }
    onLoadDeleteSession = (id) => {
        this.setState({sessionId: id});
        this.setState({isShowDeleteModal: true});
    }
    deletesSession = () => {
        this.onToggleDeleteModal();
        this.props.deleteSessionAction(this.state.sessionId);
    }
    onToggleDeleteModal = () => {
        this.setState(prevState => ({isShowDeleteModal: !prevState.isShowDeleteModal}));
    }
    componentDidMount = () => {
        if (this.type === 'all') {
            this.props.getAllSessionsAction('');
        }
        if (this.type === 'trainer') {
            this.props.getOpportunitySessionsAction(this.oppId, '')
        }
    };


    render() {
        const {sessionList, getAllSessionsAction} = this.props;
        const {isShowUpdateModal, item, isShowDeleteModal, isUpdate} = this.state;
        return (
            <div className="animated fadeIn">
                {
                    this.type === 'trainer' &&
                    <Row className="mb-4">
                        <Col sm="12">
                            <Button type="submit" className="primary-btn mt-4" onClick={this.onAddSession}>
                                Add New Session
                            </Button>
                        </Col>
                    </Row>
                }

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> Session List
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<HeaderTable getAllSessionsAction={getAllSessionsAction}/>}</thead>
                                    <tbody>
                                    {sessionList && sessionList.data.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {item.status || 'NEW'}
                                            </td>
                                            <td>{item.requestOpportunity && ((item.requestOpportunity.customerInfo.firstname || '') + ' ' + (item.requestOpportunity.customerInfo.lastname || ''))}</td>
                                            <td>{item.requestOpportunity && ((item.requestOpportunity.trainerInfo.firstname || '') + ' ' + (item.requestOpportunity.trainerInfo.lastname || ''))}</td>
                                            <td>{item.late_cancel.toString() || ''}</td>
                                            <td>{item.location || ''}</td>
                                            <td>{item.session_date || ''}</td>
                                            <td>{item.created_at || ''}</td>

                                            <td>
                                                <a className="fa fa-lg fa-edit action-icon pointer primary-color"
                                                   onClick={() => this.onLoadCurrentSession(item)}>
                                                </a>
                                                <a className="fa fa-lg fa-trash-o action-icon pointer danger-color"
                                                   onClick={() => this.onLoadDeleteSession(item.id)}>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {isShowUpdateModal && (
                    <SessionUpdateModal
                        isUpdate={isUpdate}
                        isShowModal={isShowUpdateModal}
                        item={item}
                        request_opportunity_id={this.oppId}
                        onToggleModal={this.onToggleUpdateModal}
                    />
                )}
                {isShowDeleteModal && (<AlertModal
                    type={'Delete'}
                    toggleModal={this.onToggleDeleteModal}
                    message={'Are you sure?'}
                    isShowModal={isShowDeleteModal}
                    item={item}
                    title={'Delete User'}
                    onClickAlert={this.deletesSession}/>)}
            </div>

        );
    }
}

export default Sessions;
