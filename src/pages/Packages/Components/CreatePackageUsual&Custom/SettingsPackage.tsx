import React from "react";
import * as NumericInput from "react-numeric-input";
import {TextInput} from "../../../../components";
import {Card, CardBody, CardHeader, Col, FormGroup, Input, Label} from "reactstrap";
import Select from "react-select";


const SettingsPackage = props => {
    const { 
        setting_package,
        onChangeTextInput,
        type,
        onChangeTextNumber,
        onChangeStatus,
        categoryPackage,
        onChangeDropdown, 
        franchises, 
        isLoadingFranchises,
    } = props;

    return (
        <Col>
            <Card>
                <CardHeader>{"Main settings of package"}</CardHeader>
                <CardBody>
                    <div className="align-items-center d-flex">
                        <input
                            id="status"
                            className={'check-box m-0 mr-2'}
                            type={'checkbox'}
                            checked={!!setting_package.status || false}
                            onChange={() => {onChangeStatus(!setting_package.status, 'status')}}
                        />
                        <Label for="status" className={"mt-2"}>
                            Status
                        </Label>
                    </div>
                    {/* Gender */}
                    {type === "usual" && (
                        <FormGroup>
                            <Label for="exampleSelect">
                                Category of Package
                            </Label>
                            <Input
                                value={
                                    setting_package.package_category ||
                                    "inactive"
                                }
                                onChange={onChangeTextInput}
                                name={"package_category"}
                                type="select"
                                id="exampleSelect"
                            >
                                <option key={0} value={0}>{'select'}</option>
                                {categoryPackage && categoryPackage.length > 0 && categoryPackage.map( item => (
                                    <option key={item.id.toString()} value={item.id}>{item.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    )}
                    <Label for="franchise" className={"mt-2"}>
                                Franchise
                            </Label>
                    <Select
                        id="franchise"
                        className={"w-100"}
                        getOptionLabel={opt => opt.name}
                        getOptionValue={opt => opt.id}
                        options={franchises}
                        menuPosition={"fixed"}
                        name={"franchise"}
                        placeholder="Franchise"
                        isLoading={isLoadingFranchises}
                        onChange={onChangeDropdown}
                        menuShouldBlockScroll
                        value={setting_package && franchises.filter(i => i.id == setting_package.franchise_id)}
                    />
                    <Label for="month" className={"mt-2"}>
                        Number of months
                    </Label>
                    <NumericInput
                        className={"w-100"}
                        min={0}
                        max={12}
                        name={'month'}
                        value={setting_package.month || 0}
                        style={styleInput}
                        onChange={(value) => onChangeTextNumber(value, 'month')}
                    />

                    <Label for="month" className={"mt-4"}>
                        Times per week
                    </Label>
                    <NumericInput
                        className={"w-100"}
                        min={0}
                        max={7}
                        value={setting_package.quantity || 0}
                        name={"quantity"}
                        style={styleInput}
                        onChange={(value) => onChangeTextNumber(value, 'quantity')}
                    />
                    <Label for="month" className={"mt-4"}>
                        Quantity of free sessions
                    </Label>
                    <NumericInput
                        className={"w-100"}
                        min={0}
                        max={7}
                        value={setting_package.quantity_free || 0}
                        name={"quantity_free"}
                        style={styleInput}
                        onChange={(value) => onChangeTextNumber(value, 'quantity_free')}
                    />
                    <Label for="month" className={"mt-4"}>
                        Count additional person
                    </Label>
                    <NumericInput
                        className={"w-100"}
                        min={0}
                        value={setting_package.max_additional_person || 0}
                        name={"max_additional_person"}
                        style={styleInput}
                        onChange={(value) => onChangeTextNumber(value, 'max_additional_person')}
                    />

                    <Label for="month" className={"mt-4"}>
                        Session time in hours
                    </Label>
                    <NumericInput
                        className={"w-100"}
                        min={0}
                        value={setting_package.session_time || 0}
                        name={"session_time"}
                        style={styleInput}
                        onChange={(value) => onChangeTextNumber(value, 'session_time')}
                    />

                    <Label for="month" className={"mt-4"}>
                        Short description
                    </Label>
                    <TextInput
                        placeholder="Short description"
                        name="description"
                        required
                        value={setting_package.description || ""}
                        onChange={onChangeTextInput}
                    />
                    {type === "custom" && (
                        <>
                            <Label for="month" className={"mt-4"}>
                                Promo code
                            </Label>
                            <TextInput
                                placeholder="Promo code"
                                name="promo"
                                required
                                value={setting_package.promo || ""}
                                onChange={onChangeTextInput}
                            />
                        </>
                    )}

                </CardBody>
            </Card>
        </Col>
    );
};

export default SettingsPackage;

const styleInput = {
    input: {
        height: 30
    }
};
