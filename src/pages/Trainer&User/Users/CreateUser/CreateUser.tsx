import React, {Component} from "react";
import CreateUpdateUT from "../../Shared/CreateUpdateUsers&Trainer/CreateUpdateUTContainer";


class CreateUser extends Component {

    render() {
        return (
            <div>
                <CreateUpdateUT
                    userProfile={null}
                    role={'CU'}

                />
            </div>
        );
    }
}

export default CreateUser;
