import React from 'react';
import Coupons from '../components/Coupons'

const CouponsCreate = ({match}: any) => {
    const id = match && match.params && match.params.id || 0

    return(
        <Coupons id={id} from={id === 0 ? 'add' : 'edit'}  format={'create'} title={'Coupon Create'} />
    )
}

export default CouponsCreate;