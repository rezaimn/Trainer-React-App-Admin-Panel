import React from "react";
import {Input} from 'reactstrap';

const AssignedHeaderTable = () => {
    return (
        <React.Fragment>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Full Name</th>
                <th>Searchable</th>
                <th>Pro</th>
                <th>Zip Code</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Type Assigned</th>
                <th>Actions</th>
            </tr>
            <tr>
                <th/>
                <th/>
                <th>
                    <Input type="text" name="fileName" placeholder="File Name"/>
                </th>
                <th>
                    <Input type="select" name="searchable">
                        <option>select</option>
                        <option>Yes</option>
                        <option>No</option>
                    </Input>
                </th>
                <th/>
                <th>
                    <Input type="text" name="zipcode" placeholder="Zip Code"/>
                </th>
                <th>
                    <Input
                        type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="Join Date"
                    />
                </th>
                <th/>
                <th/>
                <th/>
            </tr>
        </React.Fragment>
    );
};
export default AssignedHeaderTable;
