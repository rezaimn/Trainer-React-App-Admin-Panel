import React, {Component} from "react";
import {IProps, IState} from './CreateTrainerContainer'
import CreateUpdateUT from "../../Shared/CreateUpdateUsers&Trainer/CreateUpdateUTContainer";


class CreateTrainer extends Component<IProps, IState> {


    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <CreateUpdateUT
                    userProfile={null}
                    role={'TR'}

                />
            </div>
        );
    }
}

export default CreateTrainer;
