import React, {Component} from "react";
import {initialState, IProps, IState} from "./UserSearchModalContainer";
import {Modal, ModalBody, ModalHeader, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import Avatar from "../../../../../assets/img/avatar.png";


class UserSearchModal extends Component<IProps, IState> {
    state = {
        ...initialState
    };


    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        this.props.getListUserAction(this.state.filters);
    };

    dropDownItem = (item, value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                role: item.id
            }
        });
    }

    onChangeTextInput = evt => {
        const {
            target: {name, value}
        } = evt;
        this.setState({
            filters: {
                ...this.state.filters,
                fullname: value
            }
        });

    };


    render() {
        const {
            isShowModal,
            onToggleModal,
            users,
            getListUserAction,
            onClickAlert
        } = this.props;
        const {
            filters
        } = this.state;
        return (
            <Modal
                className="modal-width"
                centered
                scrollable
                isOpen={isShowModal}
                toggle={onToggleModal}
            >
                <ModalHeader toggle={onToggleModal}>
                    Find Users To Chat
                </ModalHeader>
                <ModalBody>
                    <Row>

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
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={item.avatar || Avatar} alt="avatar"
                                             className="img-circle img-thumbnail"
                                        />
                                    </td>
                                    <td>
                                        {item.roles && item.roles[0].slug}
                                    </td>
                                    <td>{item.firstname || '' + item.lastname || ''}</td>
                                    <td>{item.email || ''}</td>
                                    <td>{item.zipcode || ''}</td>
                                    <td>{item.created_at || ''}</td>
                                    <td>
                                        <i onClick={() => onClickAlert(item)}
                                           className="fa fa-2x fa-weixin primary-color pointer"></i>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </ModalBody>
            </Modal>
        );
    }
}

export default UserSearchModal;

