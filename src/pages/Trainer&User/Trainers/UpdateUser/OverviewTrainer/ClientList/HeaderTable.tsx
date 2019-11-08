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
                    <th>Avatar</th>
                    <th>Full name</th>
                    <th>Register date</th>
                    <th>Enabled/Disabled</th>
                    <th>Actions</th>
                </tr>
                <tr>
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
