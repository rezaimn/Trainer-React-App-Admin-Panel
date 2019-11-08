import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {Link} from 'react-router-dom';
import {initialState, IProps, IState} from './RequestsContainer'
import {AlertModal} from "../../components";
import {currentRequestState} from "logic/src/models/app/requests";
import Paginate from '../../components/Paginate';

class Requests extends Component<IProps, IState> {
    state = {
        ...initialState,
    }
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            if (nextProps.userId > 0) {
                this.props.getUserRequestAction(nextProps.userId, this.state.currentPage)
            }
        }
    };
    setCurrentRequest = request => {
        this.props.currentRequestAction(request);
    };
    deleteRequest = (item: currentRequestState) => {
        this.onToggleAlert()
        this.props.deleteRequestAction(item.id)
    }
    onToggleAlert = () =>
        this.setState(prevState => ({ isShowModalDelete: !prevState.isShowModalDelete }));

    render() {
        const {requestList, getAllRequestAction} = this.props;
        const { isShowModalDelete, item, currentPage } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> All Requests Trainer List
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<HeaderTable getAllRequestAction={getAllRequestAction} currentPage={currentPage}/>}</thead>
                                    <tbody>
                                    {requestList.data && requestList.data.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{item.id}</td>
                                            <td>
                                                {item.status || 'Open'}
                                            </td>
                                            <td>{item.user && ((item.user.firstname || '') + (item.user.lastname || '')) || ''}</td>
                                            <td>{item.periodicity || ''}</td>
                                            <td>{item.prefer_sex || ''}</td>
                                            <td>{item.place || ''}</td>

                                            <td>{item.created_at || ''}</td>
                                            <td>{item.updated_at || ''}</td>
                                            <td>
                                                <Link className="fa fa-lg fa-edit action-icon pointer" onClick={() => {
                                                    this.setCurrentRequest(item)
                                                }}
                                                      to={`/admin/request/opportunities/${item.id}`}></Link>
                                                <span onClick={() => this.setState({isShowModalDelete: true, item})}
                                                      className="fa fa-lg fa-remove text-danger px-2 pointer"></span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Paginate lastPage={requestList.lastPage} total={requestList.total} onChangePage={page => this.setState({currentPage: page})} />
                            </CardBody>
                        </Card>
                    </Col>
                    { isShowModalDelete && (<AlertModal
                        type={'Delete'}
                        toggleModal={this.onToggleAlert}
                        message={'Are you sure?'}
                        isShowModal={isShowModalDelete}
                        item={item}
                        title={'Delete Request'}
                        onClickAlert={this.deleteRequest}/>)}
                </Row>

            </div>

        );
    }
}

export default Requests;
