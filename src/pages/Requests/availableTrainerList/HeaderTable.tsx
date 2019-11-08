import React from "react";
import {Input} from 'reactstrap';

const HeaderTable = () => {
    return (
        <React.Fragment>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Full name</th>
                <th>Zip Code</th>
                <th>Certificate</th>
                <th>Searchable</th>
                <th>Register date</th>
                <th>Actions</th>
            </tr>
            <tr>
                <th/>
                <th/>
                <th>
                    <Input type="text" name="fileName" placeholder="File name"/>
                </th>
                <th>
                    <Input type="text" name="zipCode" placeholder="Zip code"/>
                </th>
                <th/>
                <th>
                    <Input type="select" name="select">
                        <option>select</option>
                        <option>True</option>
                        <option>False</option>
                    </Input>
                </th>
                <th>
                    <Input
                        type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                    />
                </th>
                <th/>
            </tr>
        </React.Fragment>
    );
};
export default HeaderTable;
