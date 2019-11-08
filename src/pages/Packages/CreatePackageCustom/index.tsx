import React, { Component } from "react";
import CreatePackage from "../Components/CreatePackageUsual&Custom/CreatePackageContainer";

const CreatePackageCustom = props => {
    //TODO use match
    let id;
    if(props.history.location.pathname.includes('edit')){
        id = props.history.location.pathname.replace('/admin/packages/custom/edit/', '')
    }

    return (
        <div>
            <CreatePackage
                from={id ? 'edit': 'add'}
                id={id}
                type={"custom"}
                title="Create Custom Package"
            />
        </div>
    );
};

export default CreatePackageCustom;
