import React, {Component} from "react";
import {Input} from 'reactstrap';
import Select from "react-select";
import {getListUserAction, UserFilters} from "logic";

interface IProps {
    getListUserAction: typeof getListUserAction;
}

interface IState {
    filters: UserFilters
}

class HeaderTable extends Component<IProps, IState> {
    roles = [
        {
            id: '',
            name: 'All Users'
        },
        {
            id: 'FA',
            name: 'Franchise Admin'
        },
        {
            id: 'CU',
            name: 'Customer'
        },
        {
            id: 'TR',
            name: 'Trainer'
        }
    ]

    state = {
        filters: {
            role: '',
            status: null,
            email: '',
            fullname: '',
            zipcode: '',
            searchable: null,
            userPackage: '',
            registerDate: '',
        }
    }
    loadUserList = () => {
        this.props.getListUserAction(this.state.filters);
    }
    dropDownItem = (item, value) => {
        this.setState({
            filters: {
                ...this.state.filters,
                role: item["id"]
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
        const {filters} = this.state;
        const {} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>User Role</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Zip Code</th>
                    <th>Register date</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <th/>
                    <th/>
                    <th>
                        <Select
                            value={this.roles.filter(
                                option =>
                                    option.id ===
                                    filters.role
                            )}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={
                                this.roles
                            }
                            name={"User Role"}
                            placeholder="User Role"
                            onChange={this.dropDownItem}
                        />
                    </th>

                    <th>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="File name"
                            value={filters.fullname}
                            onChange={this.onChangeTextInput}
                        />
                    </th>
                    <th>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={filters.email}
                            onChange={this.onChangeTextInput}
                        />
                    </th>
                    <th>
                        <Input
                            type="text"
                            name="zipcode"
                            placeholder="Zip Code"
                            value={filters.zipcode}
                            onChange={this.onChangeTextInput}
                        />
                    </th>
                    <th/>
                </tr>
            </React.Fragment>
        )
    }
};
export default HeaderTable;
