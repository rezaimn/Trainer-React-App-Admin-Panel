import React, {Component} from "react";
import {Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {Thumbnail} from "../../../../../../components";
import {Link} from 'react-router-dom';
import {initialState, IProps, IState} from './ClientListContainer'
import Avatar from "../../../../../../assets/img/avatar.png";


class ClientList extends Component<IProps, IState> {

    state = {
        ...initialState
    }

    render() {
        const {clientList} = this.props;
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
                            {clientList.map((item, index) => (
                                <tr key={item.id.toString()}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Thumbnail
                                            src={item.request_info.user.avatar || Avatar}
                                            circle
                                        />
                                    </td>
                                    <td>{item.request_info.user.firstname || '' + item.request_info.user.lastname || ''}</td>
                                    <td>{item.request_info.user.created_at || ''}</td>
                                    <td>
                                        <p>{item.request_info.user.status.toString()}</p>
                                    </td>
                                    <td>
                                        <Link className="fa fa-lg fa-edit action-icon"
                                              to={`/admin/user/edit/${item.request_info.user.id}`}></Link>
                                        <Link className="fa fa-lg fa-envelope-o action-icon"
                                              to={`/admin/chat/${item.request_info.user.id}`}></Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </div>

        );
    }
}

export default ClientList;
