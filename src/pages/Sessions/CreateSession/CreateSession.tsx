import React, {Component} from "react";
import {initialCurrentSession, IProps} from "./CreateSessionContainer";
import CreateUpdateSession from "../CreateUpdateSession/CreateUpdateSessionContainer";

class CreateSession extends Component<IProps> {


    constructor(props) {
        super(props);
        console.log(initialCurrentSession, "sssssssssssssssssssssssssssssssssssssssssss")
    }

    render() {
        const {} = this.props;
        return (
            <div>
                <CreateUpdateSession item={initialCurrentSession} isUpdate={false}/>
            </div>

        );
    }
}

export default CreateSession;

const styleInput = {
    input: {
        height: 30
    }
};
