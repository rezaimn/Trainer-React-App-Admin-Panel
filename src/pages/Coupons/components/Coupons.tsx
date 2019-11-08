import React from "react";
import './styles.scss';
import {IPropsCoupons} from "../../../model";
import {CardContainer, SelectInput, TextInput} from "../../../components";
import {Button, Form, Label} from "reactstrap";
import DatePicker from "react-datepicker";
import useLogic from './useLogic'

const ActivateData = [
    {name: 'true'},
    {name: 'false'}
]

const Coupons = ({ title, format, from, id }: IPropsCoupons) => {
    const isCreateFormat = format === "create";
    const textCode = isCreateFormat ? "Code" : "Code length"
    const nameCode = isCreateFormat ? "code" : "codeLength"

    const {inputs, handleInputChange, handleSubmit, customInputChange, formInvalid, redirect} = useLogic(id, from, isCreateFormat);

    // if(redirect) {return (<Redirect to={'/admin/coupons/list'}/>)}
    return (
        <CardContainer title={title}>
            <Form onSubmit={handleSubmit} noValidate>
            
                <TextInput
                    placeholder={textCode}
                    name={nameCode}
                    required
                    label={textCode}
                    value={isCreateFormat ? inputs.code : inputs.codeLength}
                    textInvalid={`${textCode} is required`}
                    type={isCreateFormat ? 'text' : 'number'}
                    min={3}
                    invalid={(inputs[nameCode] === "") && formInvalid}
                    onChange={handleInputChange}
                />

                <TextInput
                    placeholder={"Count"}
                    name={'count'}
                    show={!isCreateFormat}
                    required
                    label={'Count'}
                    value={inputs.count}
                    type={'number'}
                    min={1}
                    textInvalid={`Count is required`}
                    invalid={inputs.count == "0" && formInvalid}
                    onChange={handleInputChange}
                />

                <TextInput
                    placeholder={"Value"}
                    name={"value"}
                    required
                    label={"Value"}
                    type={'number'}
                    min={0}
                    value={inputs.value}
                    textInvalid={`Value is required`}
                    invalid={inputs.value == "0" && formInvalid}
                    onChange={handleInputChange}
                />
                <TextInput
                    placeholder={"Max bonus limit"}
                    name={'maxBounce'}
                    required
                    type={'number'}
                    min={0}
                    label={"Max bonus limit"}
                    value={inputs.maxBounce}
                    textInvalid={`Max bonus limit is required`}
                    invalid={(inputs.maxBounce == "0") && formInvalid}
                    onChange={handleInputChange}
                />
                <SelectInput
                    label={'Percent'}
                    name={'percent'}
                    value={inputs.percent}
                    onChange={handleInputChange}
                    getName={(item) => item && item.name || 'NoName'}
                    getValue={(item) => item && item.name || ''}
                    options={ActivateData}
                />

                <SelectInput
                    label={'Multiple use'}
                    name={'multiple'}
                    value={inputs.multiple}
                    onChange={handleInputChange}
                    getName={(item) => item && item.name || 'NoName'}
                    getValue={(item) => item && item.name || ''}
                    options={ActivateData}
                />
                <React.Fragment>
                    <Label>{'Expiration date'}</Label>
                    <DatePicker
                        className={'w-100 form-control'}
                        selected={inputs.expireTime ? new Date(inputs.expireTime) : new Date()}
                        showTimeSelect
                        onChange={(value) => customInputChange('expireTime', value)}
                        dateFormat="Pp"
                        title={'Expiration date'}
                        placeholderText={'Expiration date'}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        required
                        isClearable
                    />
                </React.Fragment>

                <Button type={'submit'} className="primary-btn mt-4">{isCreateFormat ? 'Save' : 'Generate'}</Button>
            </Form>
        </CardContainer>
    );
};

export default Coupons;
