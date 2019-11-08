import React, { Component } from "react";


interface IProps {
    
}

class Footer extends Component<IProps> {
    render() {

        return (
            <React.Fragment>
                <span className="ml-auto">
                    Powered by{" "}
                    <a href="#">SMAT</a>
                </span>
            </React.Fragment>
        );
    }
}


export default Footer;
