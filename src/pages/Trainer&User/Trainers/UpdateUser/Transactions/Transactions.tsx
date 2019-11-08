import React, {Component} from "react";
import {Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {initialState, IProps, IState} from './TransactionsContainer'
import {AccountState} from "logic/src/models/app/account";

class Transactions extends Component<IProps, IState> {

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
        // this.props.deleteUserAction(item.id)
    }
    componentDidMount = () => {
        // this.props.getListUserAction(this.state.filters);
    };
    changeStatus = id => {
        // this.props.setUserStatusAction(id);
    };

    render() {
        // const {users, getListUserAction} = this.props;
        const {isShowDeleteModal, item} = this.state;
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
                            {/*{users.map((item, index) => (*/}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/*))}*/}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Transactions;
