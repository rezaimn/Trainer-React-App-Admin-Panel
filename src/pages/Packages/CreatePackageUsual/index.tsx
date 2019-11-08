import React, { Component } from "react";
import CreatePackage from "../Components/CreatePackageUsual&Custom/CreatePackageContainer";

const CreatePackageUsual = props => {

    // TODO
    let id;
    if(props.history.location.pathname.includes('edit')){
        id = props.history.location.pathname.replace('/admin/packages/usual/edit/', '')
    }

    return (
        <div>
            <CreatePackage
                from={id ? 'edit': 'add'}
                id={id}
                type={"usual"}
                title="Create Usual Custom"
            />
        </div>
    );
};

export default CreatePackageUsual;
