import React, {Component} from "react";
import {Button, Col, Form, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import TagsInput from 'react-tagsinput'
import {TextInput} from "../../../../../components";
import {initialState, IProps, IState} from "./EditDetailsInformationContainer";


class EditDetailsInformation extends Component<IProps, IState> {
    statusList = [
        {
            id: true,
            name: "TRUE"
        },
        {
            id: false,
            name: "FALSE"
        }
    ]

    state = {
        ...initialState
    }

    handleTagChange = (tags) => {
        this.setState(
            {tags: tags}
        )
    }
    componentDidMount = () => {
        this.props.getSpecialitiesAction();
    };
    componentWillReceiveProps = nextProps => {
        if (nextProps.userProfile !== this.props.userProfile) {
            this.setState(
                {
                    detailInfo: {
                        ...nextProps.userProfile.TrainerDetails,
                    }
                }
            );

            let certifications = nextProps.userProfile.TrainerDetails.Certifications.map(cer => {
                return cer.name
            })
            this.state.tags = certifications;
        }
    };
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({
            detailInfo: {
                ...this.state.detailInfo,
                [name]: value
            }
        });
    };
    onSubmitForm = async (evt) => {
        evt.preventDefault();
        if (evt.target.checkValidity()) {

            this.setState({formInvalid: false});
            let certificates: any[] = [];
            this.state.tags.map(cer => {
                let certificate = {
                    name: cer
                }
                certificates.push(certificate);
            })
            let certBody = {
                certifications: certificates
            }
            this.state.detailInfo.certifications = [];
            if (certificates.length > 0 && await this.props.addCertificateAction(certBody)) {
                if (this.props.certificatesId) {
                    this.state.detailInfo.certifications = [...this.props.certificatesId.map(cer => {
                        let certificate = {
                            certification_id: cer.id
                        }
                        return certificate;
                    }), ...this.state.detailInfo.certifications]
                }

            }

            // if (event.target.checkValidity()) {
            this.state.detailInfo.specialities = this.state.detailInfo.Specialities.map(Spec => {
                let speciality = {
                    speciality_id: Spec.id
                }
                return speciality;
            })
            this.props.trainerUpdateDetailsInfo(
                this.props.userProfile.id,
                this.state.detailInfo
            );


        } else {
            this.setState({formInvalid: true});
        }


    };
    currencyDropDownItem = (item, value) => {

        this.setState({
            detailInfo: {
                ...this.state.detailInfo,
                rate_per_session_currency: item.id || 0
            }
        })
    };
    specialitiesDropDownItem = (item, value) => {
        this.setState({
            detailInfo: {
                ...this.state.detailInfo,
                Specialities: item
            }
        })
    };
    professionDropDownItem = (item, value) => {
        this.setState({
            detailInfo: {
                ...this.state.detailInfo,
                profession: item.id || 0
            }
        })
    };
    searchableDropDown = (item, value) => {
        this.setState({
            detailInfo: {
                ...this.state.detailInfo,
                searchable: item["id"]
            }
        })

    }

    render() {
        const {userProfile, specialities} = this.props;
        const {detailInfo, formInvalid, currencies, profession, tags} = this.state;
        return (
            <Form onSubmit={this.onSubmitForm} noValidate>
                <Row>
                    <Col sm="12">
                        {/* Title */}
                        <Label for="title">Title</Label>
                        <TextInput
                            icon={"user"}
                            placeholder="Title"
                            name="title"
                            type="text"
                            required
                            value={detailInfo.title}
                            textInvalid={"Title is required"}
                            invalid={detailInfo.title === "" && formInvalid}
                            onChange={this.onChangeTextInput}
                        />
                    </Col>
                    <Col sm="12">
                        {/* Start Year */}
                        <Label for="start_year" className={"mt-4"}>
                            Start Year
                        </Label>
                        <TextInput
                            icon={"key"}
                            placeholder="Start Year"
                            name="start_year"
                            type="number"
                            required
                            value={detailInfo.start_year}
                            textInvalid={"Start Year is required"}
                            invalid={
                                detailInfo.start_year === "" && formInvalid
                            }
                            onChange={this.onChangeTextInput}
                        />
                    </Col>
                    <Col sm="12">
                        {/* Rate per session */}
                        <Label for="rate_per_session_amount" className={"mt-4"}>
                            Rate per session
                        </Label>
                        <TextInput
                            icon={"dollar"}
                            placeholder="Rate Per Session"
                            name="rate_per_session_amount"
                            type="number"
                            required
                            value={detailInfo.rate_per_session_amount}
                            textInvalid={"Rate Per Session is required"}
                            invalid={
                                detailInfo.rate_per_session_amount <= 0 &&
                                formInvalid
                            }
                            onChange={this.onChangeTextInput}
                        />
                    </Col>
                    <Col sm="6">
                        <Label
                            for="rate_per_session_currency"
                            className="mt-4"
                        >
                            Currency
                        </Label>
                        <Select
                            value={currencies.filter(
                                option =>
                                    option.id ===
                                    detailInfo.rate_per_session_currency
                            )}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={currencies}
                            name="rate_per_session_currency"
                            placeholder="Currency"
                            menuShouldBlockScroll
                            menuPosition={"fixed"}
                            onChange={this.currencyDropDownItem}
                        />
                    </Col>
                    <Col sm="6">
                        <Label
                            for="profession"
                            className="mt-4"
                        >
                            Profession
                        </Label>
                        <Select
                            value={profession.filter(
                                option =>
                                    option.id ===
                                    detailInfo.profession
                            )}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={profession}
                            name="profession"
                            placeholder="Profession"
                            menuShouldBlockScroll
                            menuPosition={"fixed"}
                            onChange={this.professionDropDownItem}
                        />
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label
                                for="rate_per_session_amount"
                                className="mt-4"
                            >
                                searchable
                            </Label>
                            <Select
                                value={this.statusList.filter(
                                    option =>
                                        option.id ===
                                        detailInfo.searchable
                                )}
                                getOptionLabel={opt => opt.name}
                                getOptionValue={opt => opt.id}
                                options={this.statusList}
                                name="searchable"
                                placeholder="Searchable"
                                menuShouldBlockScroll
                                menuPosition={"fixed"}
                                onChange={this.searchableDropDown}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label
                                for="specialities"
                                className="mt-4"
                            >
                                Specialities
                            </Label>
                            <Select
                                value={detailInfo.Specialities}
                                isMulti
                                getOptionLabel={opt => opt.name || 'NoName'}
                                getOptionValue={opt => opt.id}
                                options={specialities}
                                name="specialities"
                                // isLoading={true}F
                                placeholder="Specialities"
                                menuShouldBlockScroll
                                menuPosition={"fixed"}
                                onChange={this.specialitiesDropDownItem}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="12">
                        <FormGroup>
                            <Label
                                for="certificates"
                                className="mt-4"
                            >
                                Certificates
                            </Label>
                            <TagsInput
                                inputProps={
                                    {placeholder: 'Add a Certificate'}
                                }
                                value={tags}
                                onChange={this.handleTagChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Button type="submit" className="primary-btn mt-4">
                            Edit Details Info
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default EditDetailsInformation;
