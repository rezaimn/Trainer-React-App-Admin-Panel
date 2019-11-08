import React from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";

import {initialState, IProps, IState} from "./UserPackageListContainer";

import UserPackageUpdateModal from "../UserPackageUpdateModal/UserPackageUpdateModalContainer";

class UserPackageList extends React.Component<IProps, IState> {
    state = {
        ...initialState
    }
    currentItem = {
        id: 0,
        month: 0,
        quantity: 0,
        quantity_free: 0,
        max_additional_person: 0,
        description: '',
        expire_time: '',
        status: ''
    }
    componentWillReceiveProps = nextProps => {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            if (nextProps.userId > 0) {
                this.props.getUserPackageAction(nextProps.userId);
            }
        }
    };
    componentDidMount = () => {
    };
    onEditOpportunity = item => {
        this.currentItem.id = item.id;
        this.currentItem.description = item.description;
        this.currentItem.expire_time = item.expire_time;
        this.currentItem.status = item.status;

        this.currentItem.max_additional_person = item.package.max_additional_person;
        this.currentItem.month = item.package.month;
        this.currentItem.quantity = item.package.quantity;
        this.currentItem.quantity_free = item.package.quantity_free;

        this.setState({isShowModal: true})
    };


    onToggleModal = () =>
        this.setState(prevState => ({isShowModal: !prevState.isShowModal}));


    render() {
        const {userPackageList} = this.props;
        const {item, isShowModal} = this.state;
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <span>
                                <i className="fa fa-align-justify"/>
                                {" User Package List"}
                            </span>

                        </CardHeader>
                        <CardBody>
                            <Table
                                hover
                                bordered
                                striped
                                responsive
                                className={"mt-4"}
                            >
                                <thead>{<HeaderTable/>}</thead>
                                <tbody>
                                {userPackageList && userPackageList.length > 0 &&
                                userPackageList.map((item) => (
                                    <tr key={item.id.toString()}>
                                        <td>
                                            {item.package.package_type || 'custom'}
                                        </td>
                                        <td>
                                            {item.package.package_category || ''}
                                        </td>
                                        <td>
                                            {item.package.month || ''}
                                        </td>
                                        <td>
                                            {item.package.additional_person_amount + '$' || ''}
                                        </td>
                                        <td>
                                            {item.package.session_time || ''}
                                        </td>
                                        <td>
                                            {item.package.price_amount + '$' || ''}
                                        </td>
                                        <td>
                                            <a onClick={() => this.onEditOpportunity(item)}><span
                                                className="fa fa-lg fa-edit text-primary pointer"></span></a>
                                            {/*<span onClick={() => this.onAction(item)} className="fa fa-lg fa-remove text-danger px-2 pointer"></span>*/}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                {isShowModal && (
                    <UserPackageUpdateModal
                        isShowModal={isShowModal}
                        item={this.currentItem}
                        onToggleModal={this.onToggleModal}
                    />
                )}

            </Row>
        );
    }
}

export default UserPackageList;
