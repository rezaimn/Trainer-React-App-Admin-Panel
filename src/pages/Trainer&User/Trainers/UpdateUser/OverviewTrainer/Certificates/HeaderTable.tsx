import React, {Component} from "react";
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
                    <th>Certificate</th>
                </tr>
                <tr>
                    <th/>
                    <th/>
                </tr>
            </React.Fragment>
        )
    }
};
export default HeaderTable;



