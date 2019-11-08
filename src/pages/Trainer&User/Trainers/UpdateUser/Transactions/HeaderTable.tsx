import React, {Component} from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {UserFilters} from "logic";

interface IProps {
    // getListUserAction: typeof getListUserAction;
}

interface IState {
    filters: UserFilters
}

class HeaderTable extends Component<IProps, IState> {
    statusList = [
        {
            id: null,
            name: "ALL"
        },
        {
            id: true,
            name: "TRUE"
        },
        {
            id: false,
            name: "FALSE"
        }
    ]

    loadUserList = () => {
        // this.props.getListUserAction(this.state.filters);
    }
    datePickerInputChange = (name, value: Date) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value.toISOString().split("T")[0]
            }
        }, () => this.loadUserList());

    }
    dropDownItem = (item, value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                status: item["id"]
            }
        }, () => this.loadUserList());

    }
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({
                filters: {
                    ...this.state.filters,
                    [name]: value
                }
            }, () => this.loadUserList()
        );

    };

    render() {
        // const {filters} = this.state;
        const {} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>State</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <th/>
                    <th>
                        <DatePicker
                            className={'w-100 form-control'}
                            // selected={filters.registerDate ? new Date(filters.registerDate) : new Date()}
                            onChange={(value) => this.datePickerInputChange('registerDate', value)}
                            peekNextMonth
                            maxDate={new Date()}
                            title={'Date'}
                            placeholderText={'Date'}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            required
                            isClearable
                        />
                    </th>
                    <th/>

                    <th>
                        <Select
                            // value={this.statusList.filter(
                            //     option =>
                            //         option.id ===
                            //         filters.status
                            // )}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={
                                this.statusList
                            }
                            name={"STATUS"}
                            placeholder="STATUS"
                            onChange={this.dropDownItem}
                        />
                    </th>
                    <th/>
                </tr>
            </React.Fragment>
        )
    }
};
export default HeaderTable;



