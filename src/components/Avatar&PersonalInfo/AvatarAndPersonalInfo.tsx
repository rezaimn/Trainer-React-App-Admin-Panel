import React, {Component} from "react";
import {Col, Row,} from "reactstrap";
import './AvatarAndPersonalInfo.scss'
import {AccountState} from 'logic/src/models'

import Avatar from "../../assets/img/avatar.png";

interface IProps {
    userProfile: AccountState
}

class AvatarAndPersonalInfo extends Component<IProps> {


    render() {
        const {userProfile} = this.props;
        return (
            <Row>
                <Col sm="12">
                    <Row>
                        <Col sm="6">
                            <img
                                className="profile-img"
                                src={userProfile.avatar || Avatar}
                                alt={'profile picture'}
                            />
                        </Col>
                        <Col sm="6">
                            <div className="overview-personal-info">
                                <h4 className="primary-color ">
                                    {userProfile ? (userProfile.firstname) : ''}
                                </h4>
                                <p><strong> Description:</strong></p>
                                <p className="user-data">
                                    <i className="fa fa-male"></i>
                                    <strong>Gender: </strong> {userProfile ? (userProfile.gender) : ''}
                                </p>
                                <p className="user-data">
                                    <i className="fa fa-at"></i>
                                    <strong>Mail: </strong> {userProfile ? (userProfile.email) : ''}
                                </p>
                                <p className="user-data">
                                    <i className="fa fa-globe"></i>
                                    <strong>Country: </strong> {userProfile ? (userProfile.Country && userProfile.Country.name || '') : ''}
                                </p>
                                <p className="user-data">
                                    <i className="fa fa-map"></i>
                                    <strong>State: </strong> {userProfile ? (userProfile.State && userProfile.State.name || '') : ''}
                                </p>
                                <p className="user-data"><i className="fa fa-university"></i><strong>City: </strong> {userProfile ? (userProfile.City && userProfile.City.name || '') : ''}</p>
                                {/* <p className="user-data">
                                    <i className="fa fa-circle-o"></i>
                                    <strong>Franchise: </strong> {userProfile ? (userProfile.Franchise && userProfile.Franchise.) : ''}
                                </p> */}
                                <p className="user-data">
                                    <i className="fa fa-map-marker"></i>
                                    <strong>Zip: </strong> {userProfile ? (userProfile.zipcode) : ''}
                                </p>
                                <p className="user-data">
                                    <i className="fa fa-phone"></i>
                                    <strong>Phone: </strong> {userProfile ? (userProfile.phone) : ''}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export {AvatarAndPersonalInfo};
