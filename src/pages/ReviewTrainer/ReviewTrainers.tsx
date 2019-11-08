import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {AlertModal} from "../../components";
import {Link} from 'react-router-dom';
import {initialState, IProps, IState} from './ReviewTrainersContainer'
import {AccountState} from "logic/src/models/app/account";
import StarRatings from 'react-star-ratings';

class ReviewTrainer extends Component<IProps, IState> {
    state = {
        ...initialState
    }
    onToggleDeleteModal = () => {
        this.setState(prevState => ({isShowDeleteModal: !prevState.isShowDeleteModal}));
    }
    onLoadDeleteUser = (item) => {
        this.setState({selectedReview: item});
        this.setState({isShowDeleteModal: true})
    }
    deleteUser = (item: AccountState) => {
        this.onToggleDeleteModal()
        this.props.deleteReviewAction(item.id)
    }
    componentDidMount = () => {
        this.props.getAllReviewsAction();
    };
    changeStatus = (id, publish) => {
        const body = {
            publish: !publish
        }
        this.props.updateReviewAction(id, body);
    };


    render() {
        const {reviews} = this.props;
        const {selectedReview, isShowDeleteModal} = this.state;
        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Card className="mt-3">
                            <CardHeader>
                                <i className="fa fa-align-justify"/> Review
                                LIST
                            </CardHeader>
                            <CardBody>
                                <Table
                                    hover
                                    bordered
                                    striped
                                    responsive
                                    // size="sm"
                                >
                                    <thead>{<HeaderTable/>}</thead>
                                    <tbody>
                                    {reviews && reviews.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {
                                                    item.userInfo &&
                                                    (item.userInfo.firstname || '') + ' ' + (item.userInfo.lastname || '')
                                                }
                                                <Link className="fa fa-lg fa-envelope-o action-icon"
                                                      to={`/admin/chat/${item.user_id}`}>

                                                </Link>
                                            </td>
                                            <td>
                                                {
                                                    item.trainerInfo &&
                                                    (item.trainerInfo.firstname || '') + ' ' + (item.trainerInfo.lastname || '')
                                                }

                                                <Link className="fa fa-lg fa-envelope-o action-icon"
                                                      to={`/admin/chat/${item.trainer_id}`}></Link>
                                            </td>
                                            <td>
                                                <StarRatings
                                                    rating={item.rating}
                                                    starDimension="20px"
                                                    starSpacing="5px"
                                                    starRatedColor="orange"
                                                    numberOfStars={6}
                                                />
                                            </td>
                                            <td>{item.note || ''}</td>
                                            <td>{item.created_at || ''}</td>
                                            <td>
                                                <input
                                                    className={'check-box'}
                                                    type={'checkbox'}
                                                    checked={item.publish || false}
                                                    onChange={() => {
                                                        this.changeStatus(item.id, item.publish)
                                                    }}
                                                />
                                            </td>
                                            <td>

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
                    item={selectedReview}
                    title={'Delete Review'}
                    onClickAlert={this.deleteUser}/>)}
            </div>

        );
    }
}

export default ReviewTrainer;
