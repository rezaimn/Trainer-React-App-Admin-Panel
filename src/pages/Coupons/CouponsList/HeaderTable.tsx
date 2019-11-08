// import React, {useEffect, useState } from "react";
// import DatePicker from "react-datepicker";

// const HeaderTable = ({getCouponsAction, currentPage}) => {
//     const [filters, setFilters] = useState(
//         {
//             expireTime: '',
//             sort: ''
//         }
//     )
//     const loadList = () => {
//         getCouponsAction(currentPage, filters)
//     }
//     const datePickerInputChange = (name, value: Date) => {
//         setFilters({
//             ...filters,
//             [name]: value.toISOString().split("T")[0]
//         })
//     }
//     const changeSort = () => {
//         setFilters({
//             ...filters,
//             sort: filters.sort == 'asc' ? 'desc' : 'asc'
//         })
//     }

//     useEffect( () => {
//         loadList()
//     }, [filters, currentPage])
import React from "react";
const HeaderTable = () => {
    return (
        <React.Fragment>
            <tr>
                {/* <th className="pointer" onClick={() => changeSort()}>
                    Id
                    <span className={"fa ml-2 " + (filters.sort == ''? "fa-sort icon-order-th" : filters.sort == 'asc' ? "fa-sort-amount-asc" : "fa-sort-amount-desc")}/>
                </th> */}
                <th>#</th>
                <th>Code</th>
                <th>Value</th>
                <th>Limit</th>
                <th>Multiple</th>
                <th>Expiration date</th>
                <th>Create date</th>
                <th>Actions</th>
            </tr>
            <tr>
                <th/>
                <th/>
                <th/>
                <th/>
                <th/>
                {/* <th>
                    <DatePicker
                        className={'w-100 form-control'}
                        selected={filters.expireTime ? new Date(filters.expireTime) : ''}
                        onChange={(value) => datePickerInputChange('expireTime', value)}
                        peekNextMonth
                        maxDate={new Date()}
                        title={'Expiration date'}
                        placeholderText={'Expiration date'}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        required
                        isClearable
                    />
                </th> */}
                <th/>
                <th/>
                <th/>
            </tr>
        </React.Fragment>
    );
};
export default HeaderTable;
