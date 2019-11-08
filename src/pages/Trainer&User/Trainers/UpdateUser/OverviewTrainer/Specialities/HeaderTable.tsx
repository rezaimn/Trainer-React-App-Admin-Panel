import React, {Component} from "react";

interface IProps {
    // getListUserAction: typeof getListUserAction;
}

interface IState {

}

class HeaderTable extends Component<IProps, IState> {
    loadUserList = () => {
        // this.props.getListUserAction(this.state.filters);
    }

    render() {
        // const {filters} = this.state;
        const {} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <th>#</th>
                    <th>Speciality</th>
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



