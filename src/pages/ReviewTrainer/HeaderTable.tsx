import React, {Component} from "react";

interface IProps {

}

interface IState {

}

class HeaderTable extends Component<IProps, IState> {


    render() {
        return (
            <React.Fragment>
                <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Trainer</th>
                    <th>Rate</th>
                    <th>Note</th>
                    <th>Create Date</th>
                    <th>Publish</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <th/>
                    <th/>
                    <th/>
                    <th/>
                    <th/>
                    <th/>
                    <th/>
                    <th/>
                </tr>
            </React.Fragment>
        )
    }
};
export default HeaderTable;
