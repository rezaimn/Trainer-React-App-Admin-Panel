import React, {Component} from "react";
import {Input} from 'reactstrap';
import {getAllSessionsAction, sessionFilters} from "logic"

interface IProps {
    getAllSessionsAction: typeof getAllSessionsAction;
}

interface IState {
    filters: sessionFilters
}

class HeaderTable extends Component<IProps, IState> {
    state = {
        filters: {
            customer: '',
            trainer: '',
            sessionDateFrom: '',
            sessionDateTo: ''
        }
    }
    loadUserList = () => {
        this.props.getAllSessionsAction('', 'all', this.state.filters);
    }
    // datePickerInputChange = (name, value: Date) => {
    //     this.setState({
    //         filters: {
    //             ...this.state.filters,
    //             [name]: value && value.toISOString().split("T")[0]
    //         }
    //     }, () => this.loadUserList());
    // }
    // dropDownItem = (item, value) => {
    //     this.setState({
    //         filters: {
    //             ...this.state.filters,
    //             status: item["id"]
    //         }
    //     }, () => this.loadUserList());
    //
    // }
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
        const {filters} = this.state;
        const {} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Trainer</th>
                    <th>Late Cancel</th>
                    <th>Location</th>
                    <th>Session Date</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <th/>
                    <th/>
                    <th>
                        <Input
                            type="text"
                            name="customer"
                            placeholder="Customer"
                            value={filters.customer}
                            onChange={this.onChangeTextInput}
                        />
                    </th>
                    <th>
                        <Input
                            type="text"
                            name="trainer"
                            placeholder="Trainer"
                            value={filters.trainer}
                            onChange={this.onChangeTextInput}
                        />
                    </th>
                    <th/>
                    <th/>
                    <th/>

                    <th/>
                    <th/>
                </tr>
            </React.Fragment>
        );
    }
};
export default HeaderTable;

