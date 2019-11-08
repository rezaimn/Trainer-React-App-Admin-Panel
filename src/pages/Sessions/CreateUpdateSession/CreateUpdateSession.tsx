import React, {Component} from "react";
import {initialState, IProps, IState} from "./CreateUpdateSessionContainer";
import Select from "react-select";
import {Button, Col, Form, Label, Row} from "reactstrap";
import DatePicker from "react-datepicker";
import {TextInput} from "../../../components";
import GoogleMapReact from "google-map-react";
import {addDays, setHours, setMinutes} from 'date-fns';

class CreateUpdateSession extends Component<IProps, IState> {
    state = {
        ...initialState,
    };
    toDay = new Date();
    sessionStatus = [
        {key: "NW", name: "NEW"},
        {key: "CA", name: "CLIENT_APPROVE"},
        {key: "CR", name: "CLIENT_REJECT"},
        {key: "AA", name: "ADMIN_APPROVE"},
        {key: "AR", name: "ADMIN_REJECT"},
        {key: "AU", name: "AUTO_APPROVE"}
    ];

    constructor(props) {
        super(props);

        this.state.sessionForm = this.props.item;

    }

    setDefaultDate = () => {
        let selectedDate = new Date().toISOString();
        selectedDate = selectedDate.substr(0, 11) + new Date().getHours() + ':' + new Date().getMinutes() + selectedDate.substr(16, 8);
        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                session_date: selectedDate
            }
        });
    }
    dropDownItem = (item, value) => {
        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                status: item["name"]
            }
        });
    }
    onSubmitForm = (evt) => {
        evt.preventDefault();
        const dateTemp = new Date(this.state.sessionForm.session_date);

        this.state.sessionForm.session_date = dateTemp.toISOString().split("T")[0] + ' ' + dateTemp.toISOString().split("T")[1].substr(0, 5);
        if (this.props.isUpdate) {
            this.state.sessionForm.status = this.sessionStatus.filter(status => {
                return status.name === this.state.sessionForm.status
            })[0].key;
            delete this.state.sessionForm.request_opportunity_id;
            this.props.updateSessionAction(this.state.sessionForm, this.props.item.id);
            this.props.onToggleModal();
        } else {
            delete this.state.sessionForm.status;
            this.state.sessionForm.request_opportunity_id = this.props.request_opportunity_id;
            this.props.addSessionAction(this.state.sessionForm);
            this.props.onToggleModal();
        }
    };

    componentDidMount = () => {
        if (this.state.sessionForm.location === "0,0" || this.state.sessionForm.location === "") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState(
                        {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    )
                    this.setState({
                        sessionForm: {
                            ...this.state.sessionForm,
                            location: this.state.lat.toFixed(4) + ',' + this.state.lng.toFixed(4)
                        }
                    });
                }
            );
        } else {
            this.setState(
                {
                    lat: parseFloat(this.state.sessionForm.location.substr(0, this.state.sessionForm.location.indexOf(','))),
                    lng: parseFloat(this.state.sessionForm.location.substr(this.state.sessionForm.location.indexOf(',') + 1, this.state.sessionForm.location.length))
                }
            )
        }
    };

    onChangeTextInput = evt => {
        const {
            target: {name, value}
        } = evt;
        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                [name]: value
            }
        });
    };
    datePickerInputChange = (name, value: Date) => {
        let selectedDate = new Date(value).toISOString();
        selectedDate = selectedDate.substr(0, 11) + new Date(value).getHours() + ':' + new Date(value).getMinutes() + selectedDate.substr(16, 8);
        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                session_date: selectedDate
            }
        });
    }
    changeStatus = () => {
        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                late_cancel: !this.state.sessionForm.late_cancel
            }
        });
    };
    onMapClick = ({x, y, lat, lng, event}) => {

        this.setState({
            sessionForm: {
                ...this.state.sessionForm,
                location: lat + ',' + lng,
            }
        });
        this.setState({
            lat: lat,
            lng: lng
        });
    }

    render() {
        console.log("2222222222222222222222222222222222222222222222222222222222222222", this.state.sessionForm)
        const {} = this.props;

        const bootstrapURLKeys = {
            key: "AIzaSyACckusHX9FL5LLcLfNvrOwxQQ-pBbwUDw",
            libraries: ["drawing", "places"].join(",")
        }
        const AnyReactComponent = () => <div>
            <i className="fa fa-3x fa-map-marker danger-color "></i>
        </div>;
        const {
            sessionForm, formInvalid, lat,
            lng
        } = this.state;
        return (
            <div className={`animated fadeIn w-100 h-100`}>
                <Row className="m-0">
                    <Col className="col-lg-6">

                        <Form onSubmit={this.onSubmitForm} noValidate>
                            <div className="date-picker-base">
                                                    <span className="input-group-text date-picker-icon">
                                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    </span>
                                <Label>{'Session Date'}</Label>
                                {
                                    (this.state.sessionForm.session_date && this.state.sessionForm.session_date.length > 0) ?
                                        <DatePicker
                                            className={'w-100 form-control'}
                                            selected={setHours(setMinutes(new Date(this.state.sessionForm.session_date),
                                                parseInt(new Date(this.state.sessionForm.session_date).toISOString().substr(14, 2))),
                                                parseInt(new Date(this.state.sessionForm.session_date).toISOString().substr(11, 2)))}
                                            onChange={(value) => this.datePickerInputChange('session_date', value)}
                                            peekNextMonth
                                            title={'Session Date'}
                                            placeholderText={'Session Date'}
                                            showMonthDropdown
                                            showYearDropdown
                                            maxDate={addDays(new Date(), 0)}
                                            minTime={setHours(setMinutes(this.toDay, 0), 0)}
                                            maxTime={!(new Date(this.state.sessionForm.session_date) < new Date()) ?
                                                setHours(setMinutes(this.toDay, this.toDay.getMinutes()), this.toDay.getHours()) :
                                                setHours(setMinutes(new Date(this.state.sessionForm.session_date), 59), 23)}
                                            dropdownMode="select"
                                            showTimeSelect
                                            timeIntervals={5}
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            required
                                            isClearable
                                        /> : this.setDefaultDate()
                                }

                            </div>


                            <Label for="location" className={"mt-4"}>
                                Location
                            </Label>
                            <TextInput
                                className={"w-100"}
                                placeholder="Location"
                                name="location"
                                required
                                value={sessionForm.location || ""}
                                onChange={this.onChangeTextInput}
                            />

                            <Label for="message" className={"mt-4"}>
                                Message
                            </Label>
                            <TextInput
                                className={"w-100"}
                                placeholder="Message"
                                name="message"
                                required
                                value={sessionForm.message || ""}
                                onChange={this.onChangeTextInput}
                            />


                            {
                                this.props.isUpdate &&
                                <div>
                                    <Label for="status" className={"mt-4"}>
                                        Status
                                    </Label>

                                    <Select
                                        value={this.sessionStatus.filter(
                                            option =>
                                                option.name ===
                                                sessionForm.status || ''
                                        )}
                                        className={"w-100"}
                                        getOptionLabel={opt => opt.name}
                                        getOptionValue={opt => opt.key}
                                        options={this.sessionStatus}
                                        name={"status"}
                                        placeholder="Status"
                                        menuPosition={"fixed"}
                                        onChange={this.dropDownItem}
                                    />
                                </div>
                            }


                            <Label for="late_cancel" className={"mt-4"}>
                                Late Cancel
                            </Label>
                            <input
                                className={'check-box'}
                                type={'checkbox'}
                                checked={sessionForm.late_cancel || false}
                                onChange={
                                    this.changeStatus
                                }
                            />

                            <Button
                                className="primary-btn mt-4 col-md-6 col-sm-12"
                                type={"submit"}
                            >
                                Save
                            </Button>
                        </Form>
                    </Col>
                    <Col className="col-lg-6">

                        <GoogleMapReact
                            bootstrapURLKeys={bootstrapURLKeys}
                            center={{lat: lat, lng: lng}}
                            defaultZoom={8}
                            onClick={this.onMapClick}
                        >
                            <AnyReactComponent

                            />
                        </GoogleMapReact>

                    </Col>
                </Row>
            </div>

        );
    }
}

export default CreateUpdateSession;

const styleInput = {
    input: {
        height: 30
    }
};
