import React from "react";
import {
    FormFeedback,
    Input,
    InputGroup,
    Label,
    FormGroup
} from "reactstrap";

interface IProps {
    className?: string;
    placeholder?: string;
    name: string;
    value: any;
    onChange: (evt) => void;
    label?: string;
    show?: boolean; 
    options: any[];
    getValue: (item: any) => string;
    getName: (item: any) => string;
}

function SelectInput (props: IProps){
    const {
        className = "",
        name,
        value,
        onChange,
        label='',
        show=true,
        options=[],
        getValue,
        getName
    } = props;

    
    if(!show) return null
    return (
        <FormGroup>
            {label && (<Label for={name} >{label}</Label>)}
            <InputGroup className={className}>
                <Input
                    autoComplete={name}
                    name={name}
                    type={'select'}
                    value={value || ""}
                    onChange={onChange}
                >
                {options.map( (item) => (
                    <option key={getValue(item)} value={getValue(item)}>{getName(item)}</option>
                ))}
                </Input>
            </InputGroup>
        </FormGroup>
    );
};

export { SelectInput };
