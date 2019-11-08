import React from 'react';
import moment from 'moment';
import './Message.css';
import {Col, Row,} from "reactstrap";

interface IProps {
    message,
    myProfile
}

export default function Message(props: IProps) {

    const {
        message,
        myProfile
    } = props;

    const friendlyTimestamp = moment(message.messageTime).format('YYYY-mm-dd:hh:mm:ss');
    return (
        <Row>
            <Col className={"col-12"}>
                <div className={'message' + (myProfile.id === message.sender ? ' sent-message' : ' received-message')}>
                    <p className={"mb-2 font-weight-bold" + (myProfile.id === message.sender ? ' sent-message-time' : ' received-message-time')}>{message.senderUserName}</p>
                    <hr className="m-0"/>
                    <p className={"mt-3" + (myProfile.id === message.sender ? ' sent-message-time' : ' received-message-time')}>{message.message.body}</p>
                    <div
                        className={"timestamp" + (myProfile.id === message.sender ? ' sent-message-time' : ' received-message-time')}>
                        {friendlyTimestamp}
                    </div>
                </div>
            </Col>
        </Row>

    );
}
