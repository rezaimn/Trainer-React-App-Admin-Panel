import React, {useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {Input} from 'reactstrap';
import Select from "react-select";

const HeaderTable = ({getAllRequestAction, currentPage}) => {
    const [filters, setFilters] = useState(
        {
            periodicity: '',
            place: '',
            prefer_sex: '',
            created_at: '',
            userName: '',
        }
    )
    const loadList = () => {
        getAllRequestAction(currentPage, filters)
    }
    const datePickerInputChange = (name, value: Date) => {
        setFilters({
            ...filters,
            [name]: value.toISOString().split("T")[0]
        })
    }
    const dropDownItem = (item, value) => {
        console.error(item)
        console.error(value)
        setFilters({
            ...filters,
            [value.name]: item["id"]
        })
    }
    const textInputChange = e => {
        e.preventDefault();
        const {
            target: {name, value}
        } = e;
        setFilters({
            ...filters,
            [name]: value
        })
    }

    useEffect( () => {
        loadList()
    }, [filters, currentPage])

    return (
        <React.Fragment>
            <tr>
                <th>ID</th>
                <th>Status</th>
                <th>User Name</th>
                <th>Periodicity</th>
                <th>Prefer Sex</th>
                <th>Place</th>
                <th>Last Edit</th>
                <th>Created Date</th>
                <th>Actions</th>
            </tr>
            <tr>
                <th/>
                <th/>
                <th>
                    <Input
                        type="text"
                        name="userName"
                        placeholder="User name"
                        value={filters.userName}
                        onChange={textInputChange}
                    />
                </th>
                <th>
                    <Input
                        type="text"
                        name="periodicity"
                        placeholder="Periodicity"
                        value={filters.periodicity}
                        onChange={textInputChange}
                    />
                </th>
                <th style={{minWidth: 120}}>
                    <Select
                        value={{ id: filters.prefer_sex, name: filters.prefer_sex != '' ? filters.prefer_sex : 'select' }}
                        getOptionLabel={opt => opt.name}
                        getOptionValue={opt => opt.id}
                        options={[
                            { id: '', name: "select" },
                            { id: 'Male', name: "Male" },
                            { id: 'Female', name: "Female" }
                        ]}
                        name={"prefer_sex"}
                        placeholder="Prefer Sex"
                        onChange={dropDownItem}
                    />
                </th>
                <th>
                    <Input
                        type="text"
                        name="place"
                        placeholder="Place"
                        value={filters.place}
                        onChange={textInputChange}
                    />
                </th>
                <th/>
                <th>
                    <DatePicker
                        className={'w-100 form-control'}
                        selected={filters.created_at ? new Date(filters.created_at) : ''}
                        onChange={(value) => datePickerInputChange('created_at', value)}
                        peekNextMonth
                        maxDate={new Date()}
                        title={'Created date'}
                        placeholderText={'Created date'}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        required
                        isClearable
                    />
                </th>
                <th/>
            </tr>
        </React.Fragment>
    );
};
export default HeaderTable;
