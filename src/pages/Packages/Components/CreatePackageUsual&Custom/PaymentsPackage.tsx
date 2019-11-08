import React from "react";
import * as NumericInput from "react-numeric-input";
import {TextInput} from "../../../../components";
import {Card, CardBody, CardHeader, Col, FormGroup, Input, Label,} from "reactstrap";

const PaymentsPackage =  (props) => {

        const {payments_package, onChangeTextInput, onChangeTextNumber} = props;
        return (
            <Col>
                <Card>
                    <CardHeader>{"Set payments for package"}</CardHeader>
                    <CardBody>
                        <Label>Price Per Session</Label>
                        <TextInput
                            icon={"fa fa-usd"}
                            placeholder="Price Per Session"
                            name="price_amount"
                            value={payments_package.price_amount || ""}
                            textInvalid={"Price Per Session is required"}
                            onChange={onChangeTextInput}
                        />

                        <Label className={"mt-4"}>
                            Additional person price
                        </Label>
                        <TextInput
                            icon={"fa fa-usd"}
                            placeholder="Additional person price"
                            name="additional_person_amount"
                            required
                            value={payments_package.additional_person_amount || ""}
                            onChange={onChangeTextInput}
                        />

                        <Label className={"mt-4"}>
                            Discount pay in %
                        </Label>
                        <NumericInput
                            className={"w-100"}
                            min={0}
                            max={100}
                            value={payments_package.discount_pay || 0}
                            name={'discount_pay'}
                            style={styleInput}
                            onChange={(value) => onChangeTextNumber(value, 'discount_pay')}
                        />

                        {/* Payment periodicity */}
                        <FormGroup>
                            <Label for="exampleSelect" className="mt-4">
                                Payment periodicity
                            </Label>
                            <Input
                                value={payments_package.payment_periodicity || "one"}
                                onChange={onChangeTextInput}
                                name={"payment_periodicity"}
                                type="select"
                                id="exampleSelect"
                            >
                                <option value={"one"}>one</option>
                                <option value={"monthly"}>monthly</option>
                            </Input>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        );
}

export default PaymentsPackage;

const styleInput = {
    input: {
        height: 30
    }
};
