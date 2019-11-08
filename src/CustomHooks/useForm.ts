import {useState} from "react";

function useForm<T>(initialState: T ,callback?) {
    const [inputs, setInputs] = useState<T>(initialState);
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            if(callback) callback(!event.target.checkValidity());
        }
        
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const customInputChange = (name, value) => {
        setInputs(inputs => ({...inputs, [name]: value}));
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs,
        customInputChange,
        setInputs
    };
};
export { useForm } ;
