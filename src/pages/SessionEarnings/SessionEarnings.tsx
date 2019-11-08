import React, {Component} from "react";
import {Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {initialState, IProps, IState} from './SessionEarningsContainer'
import SessionEarningUpdateModal from "./SessionUpdateModal/SessionEarningUpdateModalContainer";

class SessionEarnings extends Component<IProps, IState> {

    state = {
        ...initialState
    }

    constructor(props) {
        super(props);

    }

    componentDidMount(): void {
        if (this.props.match.url.includes('earning')) {
            this.loadData();
        }
        if (this.props.trainerId > 0) {
            this.setState({
                    filters: {
                        ...this.state.filters,
                        trainerId: this.props.trainerId
                    }
                }, () => this.loadData()
            );
        }
    }

    componentWillReceiveProps = nextProps => {

        if (nextProps.trainerId && nextProps.trainerId !== this.props.trainerId) {
            if (nextProps.trainerId > 0) {
                this.setState({
                        filters: {
                            ...this.state.filters,
                            trainerId: nextProps.trainerId
                        }
                    }, () => this.loadData()
                );
            }
        }
    };
    loadData = () => {
        this.props.getAllSessionEarningAction(this.state.filters);
    }
    onToggleUpdateModal = () => {
        this.setState(prevState => ({isShowUpdateModal: !prevState.isShowUpdateModal}));
    }
    onLoadCurrentSession = (item) => {
        this.setState({item: item});
        this.setState({isShowUpdateModal: true});
    }

    componentWillUnmount(): void {
        this.props.clearEarningSessions();
    }

    render() {
        const {sessionEarnings} = this.props;
        const {isShowUpdateModal, item,} = this.state;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>

                        <Table
                            hover
                            bordered
                            striped
                            responsive
                            // size="sm"
                        >
                            <thead>{<HeaderTable/>}</thead>
                            <tbody>
                            {sessionEarnings && sessionEarnings.data.map((item, index) => (
                                <tr key={item.id.toString()}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.status || ''}
                                    </td>
                                    <td>{item.trainerInfo && (item.trainerInfo.firstname || '') + ' ' + (item.trainerInfo.lastname || '')}</td>
                                    <td>{item.franchise_amount || ''}</td>
                                    <td>{item.franchiseAdminInfo && (item.franchiseAdminInfo.firstname || '') + ' ' + (item.franchiseAdminInfo.lastname || '')}</td>
                                    <td>{item.franchise_amount || ''}</td>
                                    <td>{item.session.session_date || ''}</td>
                                    <td>
                                        <a className="fa fa-lg fa-edit action-icon pointer primary-color"
                                           onClick={() => this.onLoadCurrentSession(item)}>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
                {isShowUpdateModal && (
                    <SessionEarningUpdateModal
                        isShowModal={isShowUpdateModal}
                        item={item}
                        onToggleModal={this.onToggleUpdateModal}
                    />
                )}
            </div>

        );
    }
}

export default SessionEarnings;
