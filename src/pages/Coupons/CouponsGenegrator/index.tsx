import React from 'react';
import Coupons from '../components/Coupons'

const CouponsGenerate = () => {
    return(
        <Coupons from={'add'}  format={'generate'} title={'Coupon Generator'}/>
    )
}

export default CouponsGenerate;