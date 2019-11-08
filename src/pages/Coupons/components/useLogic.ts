import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {CouponState} from 'logic/src/models'
import {useForm} from "../../../CustomHooks";
import {getDateFormatDateAndTime} from '../../../utilities'
import {toast} from 'react-toastify'
import {addCouponsAction, AppState, editCouponsAction, getByIdCouponsAction} from "logic";

export default function(id: number | undefined, from : 'edit' | 'add', isCreateFormat: boolean){
    const dispatch = useDispatch()
    const coupons = useSelector( (state:AppState)  => state.coupons.current, shallowEqual)
    const [formInvalid, setFormInvalid] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const { inputs, handleInputChange, handleSubmit, customInputChange, setInputs } = useForm<CouponState>(coupons, handleCoupons);
    async function handleCoupons(isValid: boolean){
        setFormInvalid(isValid)
        if(isValid){
            toast.error("Please fill field")
        } else {
            // check from edit or add
            if(from === 'add'){
                inputs.format = isCreateFormat  ? 'create' : 'generate';
                await dispatch(addCouponsAction(Object.assign({}, inputs, {expireTime: getDateFormatDateAndTime(inputs.expireTime)})))
                    .then(res => {
                        if(res) setRedirect(true)
                    })
                return
            }
            await dispatch(editCouponsAction(inputs.id, Object.assign({}, inputs, {expireTime: getDateFormatDateAndTime(inputs.expireTime)})))
                .then(res => {
                    if(res) setRedirect(true)
                })
            return
        }
    }

    // useEffect for getCurrentCoupons for edit
    useEffect( () => {
        if(id !== 0 && from === 'edit'){
            dispatch(getByIdCouponsAction(id))
        }
    },[id])

    // useEffect for update coupons for edit
    useEffect( () => {
        if(from === 'edit'){
            setInputs(coupons)
        }
        //ToDo: initiate empty inputs for add form after populated edit form in the correct way
        if(from === 'add' && coupons.code != ''){
            setInputs({} as CouponState)
        }
    },[coupons])

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        customInputChange,
        formInvalid,
        redirect
    }
}
