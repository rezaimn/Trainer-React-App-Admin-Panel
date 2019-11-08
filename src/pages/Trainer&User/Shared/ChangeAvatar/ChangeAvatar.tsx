import React, {Component} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Avatar from "../../../../assets/img/avatar.png";

interface IProps {
    setAvatarAction: (id: number, avatar: FormData) => void
    userId: number,
    currentAvatar: string | undefined
}

interface IState {

    formInvalid: boolean,
    avatar: any
}

class ChangeAvatar extends Component<IProps, IState> {

    state = {
        formInvalid: false,
        avatar: ''
    };
    onChangeInputFile = evt => {

        this.setState({
            avatar: evt.target.files[0]
        });
    };
    onSubmitForm = evt => {
        evt.preventDefault();
        this.setState({formInvalid: false});
        const formData = new FormData();
        formData.append('avatar', this.state.avatar);
        if (this.state.avatar) {
            this.props.setAvatarAction(this.props.userId, formData);
        } else {
            this.setState({formInvalid: true});
        }
    };

    render() {
        const {currentAvatar, userId} = this.props;
        const {avatar, formInvalid} = this.state;
        let localImage;
        if (avatar) {
            localImage = URL.createObjectURL(avatar)

        } else {
            localImage = currentAvatar || Avatar;
            // localImage = Avatar;
        }

        return (


            <Form onSubmit={this.onSubmitForm} noValidate>
                <Row>
                    <Col sm="6">
                        <img
                            className="profile-img"
                            src={localImage}
                            alt={'profile picture'}
                        />
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="avatar">Select Avatar Picture</Label>
                            <Input type="file" name="file" id="avatar" onChange={this.onChangeInputFile}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Button type="submit" className="primary-btn mt-4">
                            Edit Avatar
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ChangeAvatar;
