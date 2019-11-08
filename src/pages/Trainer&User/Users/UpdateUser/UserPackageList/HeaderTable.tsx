import React from "react";

const HeaderTable = () => {
    return (
        <React.Fragment>
            <tr>
                <th>Package type</th>
                <th>Category</th>
                <th>Number of months</th>
                {/* <th>Times per weeks</th> */}
                <th>Additional user price</th>
                <th>Session time</th>
                <th>Price per session</th>
                <th>Actions</th>
            </tr>
        </React.Fragment>
    );
};
export default HeaderTable;
