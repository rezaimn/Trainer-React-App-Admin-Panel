import React, { useState } from "react";
import classnames from "classnames";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner
} from "reactstrap";

interface IProps {
    value: string;
    className?: string;
    onDropDownItem: (name: string, value: string, item: any) => void;
    name: string;
    items: any[];
    keyOfValue?: string;
    loading?: boolean;
    invalid?: boolean;
}
const DropDown = (props: IProps) => {
    const {
        value,
        className='',
        onDropDownItem,
        name,
        items,
        keyOfValue = "name",
        loading = false,
        invalid=false
    } = props;

    const [isOpne, toggleOpne] = useState(false);

    function toggleDropDown() {
        toggleOpne(!isOpne);
    }

    function dropDownItem(item) {
        toggleDropDown();
        onDropDownItem(name, item[keyOfValue], item);
    }
    const classes = classnames({
        'bg-color-red': invalid
    })
    return (
        <Dropdown
            className={className}
            group
            isOpen={items.length > 0 && isOpne}
            toggle={toggleDropDown}
        >
            <DropdownToggle caret className={classes}>
                {loading ? <Spinner size="sm" color="light" /> : value}
            </DropdownToggle>
            <DropdownMenu
                modifiers={{
                    setMaxHeight: {
                        enabled: true,
                        order: 890,
                        fn: data => {
                            return {
                                ...data,
                                styles: {
                                    ...data.styles,
                                    overflow: "auto",
                                    maxHeight: 300
                                }
                            };
                        }
                    }
                }}
            >
                {items.map(item => (
                    <DropdownItem
                        key={item.id}
                        value={item}
                        onClick={() => dropDownItem(item)}
                    >
                        {item[keyOfValue]}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export { DropDown };
