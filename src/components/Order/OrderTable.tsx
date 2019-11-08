import React from "react";
interface Props {
    children: JSX.Element | string;
}

const OrderTable = ({children}: Props) => {
    return (
        <th>
            {children}
            <span className="order fa fa-sort icon-order-th" />
        </th>
    );
};

export { OrderTable };
