import React from "react";
import {TextInput} from "../../../../components";
import {FormGroup, Input, Label} from "reactstrap";

const BankData = (props) => {
    return (
        <>
            {/* account_holder_name */}

            <Label for="account_holder_name" className="">
                account holder name
            </Label>
            <TextInput
                disabled={props.disabled}
                icon={"fa fa-envelope-o"}
                placeholder="account holder name"
                name="account_holder_name"
                required
                value={props.bankData && props.bankData.account_holder_name}
                textInvalid={"account holder name is required"}
                invalid={props.bankData && props.bankData.account_holder_name === "" && props.formInvalid}
                onChange={props.onChangeTextInput}
            />

            <FormGroup>
                <Label for="exampleSelect" className="mt-4">
                    account holder type
                </Label>
                <Input
                    disabled={props.disabled}
                    value={props.bankData && props.bankData.account_holder_type || "male"}
                    onChange={props.onChangeTextInput}
                    name={"account_holder_type"}
                    type="select"
                    id="exampleSelect"
                >
                    <option value={"individual"}>individual</option>
                </Input>
            </FormGroup>

            {/* account_number */}
            <Label for="account_holder_name" className="">
                account number
            </Label>
            <TextInput
                disabled={props.disabled}
                icon={"fa fa-envelope-o"}
                placeholder="account number"
                name="account_number"
                required
                value={props.bankData && props.bankData.account_number}
                textInvalid={"account number is required"}
                invalid={props.bankData && props.bankData.account_number === "" && props.formInvalid}
                onChange={props.onChangeTextInput}
            />

            {/* routing number */}
            <Label for="routing_number" className="mt-4">
                routing number
            </Label>
            <TextInput
                disabled={props.disabled}
                icon={"fa fa-envelope-o"}
                placeholder="routing number"
                name="routing_number"
                required
                value={props.bankData && props.bankData.routing_number}
                textInvalid={"routing number is required"}
                invalid={props.bankData && props.bankData.routing_number === "" && props.formInvalid}
                onChange={props.onChangeTextInput}
            />
        </>
    );
};

export default BankData;
