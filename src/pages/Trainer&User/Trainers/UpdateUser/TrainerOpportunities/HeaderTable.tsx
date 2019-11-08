import React from "react";
import {Input} from 'reactstrap';

const HeaderTable = () => {
    return (
        <React.Fragment>
            <tr>
                <th>#</th>
                <th>Trainer Name</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Type Assigned</th>
                <th>Actions</th>
            </tr>
            <tr>
                <th/>
                <th/>
                <th>
                    <Input type="text" name="customerName" placeholder="Customer Name"/>
                </th>
                <th/>
                <th/>
                <th/>
            </tr>
        </React.Fragment>
    );
};
export default HeaderTable;
