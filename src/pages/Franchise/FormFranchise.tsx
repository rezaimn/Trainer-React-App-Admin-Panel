import React from "react";
import {Button, Row, Spinner} from "reactstrap";
import {Map, TextInput} from "../../components";

const FormFranchise = props => {
    return (
        <>
            <Row>
                <TextInput
                    placeholder="Name"
                    name="name"
                    className="col-md-4 col-sm-12 mt-2"
                    value={props.name}
                    onChange={props.onChangeTextInput}
                />
            </Row>
            <Map
                geometries={props.franchiseGeometries ? props.franchiseGeometries : []}
                className="my-5"
                geometry={props.franchiseToEdit && props.franchiseToEdit.geometry}
                query={props.query}
                onCompleteSelect={props.onCompleteSelect}
            />
            <div className="row">
                <div className="col-md-4">
                {
                    props.isEdit ?
                    <Button
                        className="primary-btn mt-2 col-sm-12"
                        onClick={props.updateFranchise}
                        style={{height: 42}}
                    >
                      {props.isLoadingFranchise ? (
                          <Spinner size="sm" color="light" />
                      ) : (
                          "Update Franchise"
                      )}
                    </Button>
                    :
                    <Button
                        className="primary-btn mt-2 col-sm-12"
                        onClick={props.createFranchise}
                        style={{height: 42}}
                    >
                      {props.isLoadingFranchise ? (
                          <Spinner size="sm" color="light" />
                      ) : (
                          "Create Franchise"
                      )}
                    </Button>
                }
                </div>
            </div>
        </>
    );
};

export default FormFranchise;
