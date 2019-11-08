import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from "reactstrap";

interface IProps {
    children: JSX.Element | JSX.Element[];
    title?: string;
    className?: string;
}

const CardContainer = (props: IProps) => {
    const {
        children,
        title,
        className
    } = props;
        return (
            <div className={`animated fadeIn ${className}`}>
                <Row>
                    <Col>
                        <Card>
                            {title && (<CardHeader>{title}</CardHeader>)}
                            <CardBody>
                                {children}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
}

export { CardContainer };
