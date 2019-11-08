import React from "react";
import {FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";

interface IProps {
    className?: string;
    icon?: string;
    type?: string;
    placeholder: string;
    name: string;
    value: any;
    invalid?: boolean;
    onChange: (evt) => void;
    required?: boolean;
    textInvalid?: string;
    label?: string;
    show?: boolean; 
    min?: number;
    max?: number;
    disabled?: boolean
}

const TextInput = (props: IProps) => {
    const {
        className = "",
        icon,
        type = "text",
        placeholder,
        name,
        value,
        invalid = false,
        onChange,
        required = false,
        textInvalid = "",
        label='',
        show=true,
        min=0,
        disabled = false
        // max=0
    } = props;
    if(!show) return null
    return (
        <div className={className}>
            <FormGroup>
                {label && (<Label for={name} className={'mt-2'}>{label}</Label>)}
                <InputGroup>
                    {icon && (
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className={icon}></i>
                            </InputGroupText>
                        </InputGroupAddon>
                    )}
                    <Input
                        type={type}
                        placeholder={placeholder}
                        autoComplete={name}
                        name={name}
                        required={required}
                        min={min}
                        // max={max}
                        value={value || ""}
                        invalid={invalid}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    {required && <FormFeedback>{textInvalid}</FormFeedback>}
                </InputGroup>
            </FormGroup>
        </div>
    );
};

export { TextInput };
