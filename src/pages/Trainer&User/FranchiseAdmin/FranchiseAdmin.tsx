import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {AlertModal, Thumbnail} from "../../../components";
import {Link} from 'react-router-dom';
import {IProps, IState} from './FranchiseAdminContainer'
import Avatar from "../../../assets/img/avatar.png";
import {CSVLink} from "react-csv";
import {initialState} from "../FranchiseAdmin/FranchiseAdminContainer";
import {AccountState} from "logic/src/models/app/account";

class FranchiseAdmin extends Component<IProps, IState> {
    userListForCSV = [
        [
            "#",
            "Full Name",
            "Email",
            "Zip Code",
            "Register Date",
            "Enabled/Disabled"
        ]
    ];
    state = {
        ...initialState
    }
    onToggleDeleteModal = () => {
        this.setState(prevState => ({isShowDeleteModal: !prevState.isShowDeleteModal}));
    }
    onLoadDeleteUser = (item) => {
        this.setState({item: item});
        this.setState({isShowDeleteModal: true})
    }
    deleteUser = (item: AccountState) => {
        this.onToggleDeleteModal()
        this.props.deleteUserAction(item.id)
    }
    componentDidMount = () => {
        this.props.getListUserAction(this.state.filters);
    };
    changeStatus = id => {
        this.props.setUserStatusAction(id);
    };
    render() {
        const {users, getListUserAction} = this.props;
        const {filters, item, isShowDeleteModal} = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <CSVLink filename='Franchise_Admin_List.csv' className="csv-btn"
                                 data={
                                     users &&
                                     this.userListForCSV.concat(users && users.map((user, index) => {
                                         let userForCSV: any[] = [];
                                         userForCSV.push(index);
                                         userForCSV.push((user.firstname || '') + ' ' + (user.lastname || ''));
                                         userForCSV.push(user.email);
                                         userForCSV.push(user.zipcode);
                                         userForCSV.push(user.created_at);
                                         userForCSV.push(user.status && user.status.toString() || 'FALSE');
                                         return userForCSV;
                                     }))
                                 }>
                            Export as CSV
                        </CSVLink>
                        <Card className="mt-3">
                            <CardHeader>
                                <i className="fa fa-align-justify" />
                                Franchise Admin LIST
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<HeaderTable getListUserAction={getListUserAction}/>}</thead>
                                    <tbody>
                                    {users && users.map((item, index) => (
                                            <tr key={item.id.toString()}>
                                                <td>{index+1}</td>
                                                <td>
                                                    <Thumbnail
                                                        src={item.avatar || Avatar}
                                                        circle
                                                    />
                                                </td>
                                                <td>{item.firstname || '' + item.lastname || ''}</td>
                                                <td>{item.email}</td>
                                                {/*<td>{item.FranchiseAdmin && item.FranchiseAdmin.length > 0 && item.FranchiseAdmin.map(i => i.name).toString()}</td>*/}
                                                <td>{item.zipcode || ''}</td>
                                                <td>{item.created_at || ''}</td>
                                                <td>
                                                    <input
                                                        className={'check-box'}
                                                        type={'checkbox'}
                                                        checked={item.status || false}
                                                        onChange={() => {
                                                            this.changeStatus(item.id)
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Link className="fa fa-lg fa-edit action-icon"
                                                          to={`/admin/franchise-admin/edit/${item.id}`}></Link>
                                                    <Link className="fa fa-lg fa-envelope-o action-icon"
                                                          to={`/admin/chat/${item.id}`}></Link>
                                                    <a className="fa fa-lg fa-trash-o action-icon danger-color pointer"
                                                       onClick={() => this.onLoadDeleteUser(item)}
                                                    ></a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {isShowDeleteModal && (<AlertModal
                    type={'Delete'}
                    toggleModal={this.onToggleDeleteModal}
                    message={'Are you sure?'}
                    isShowModal={isShowDeleteModal}
                    item={item}
                    title={'Delete Franchise Admin'}
                    onClickAlert={this.deleteUser}/>)}
            </div>
        );
    }
}

export default FranchiseAdmin;
