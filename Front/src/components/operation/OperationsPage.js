import React from 'react'
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import Modal from "../modal/Modal";
import uuid from "uuid";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import api from "../../api/api";
import equipment from "../../reducers/equipment";

class OperationsPages extends React.Component {

    //var
    state = {
        operation: {
            id: uuid(),
            numOfOperation: 1,
            equipment: {
                machineType: ""
            },
            typeOfCloth: "",
            name: "",
            idealTime: 1
        },
        equipments: [],
        modal: {
            visibility: "none"
        },
        operations: []
    };
    defaultOperationState = {
        id: uuid(),
        numOfOperation: 1,
        equipment: {
            machineType: "Select machine"
        },
        typeOfCloth: "",
        name: "",
        idealTime: 1
    };

//func

    add = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'block'
                },
                operation: this.defaultOperationState
            }
        });
    };

    populateEquipments = () => {
        api.equipment.getAll().then(res => {
            this.setState((prevState => {
                return {
                    ...prevState,
                    equipments: res.data.equipments
                }
            }))
        })
    };

    populateOperations = () => {
        api.operation.getOperations().then(res => {
            this.setState((prevState => {
                return {
                    ...prevState,
                    operations: res.data.operations
                }
            }));
            // console.log("nooooooooooo");
            // console.log(this.state.operations);
            // this.state.operations.map((i, obj) => {
            //     let eq = this.state.equipments.find((index, item) => {
            //         return item.id === obj.EquipmentID
            //     });
            //     console.log(eq);
            //     let op = this.state.operations;
            //     op[i].equipment=eq;
            //     console.log(op);
            //     let arr=this.state.operations.filter((k,el)=>{
            //         return k===i;
            //     });
            //     this.setState((prevState) => {
            //         return {
            //             ...prevState,
            //             operations:arr
            //         }
            //     })
            // })
        })
    };

    componentWillMount() {
        this.populateEquipments();
        this.populateOperations();
    }

    edit = () => {

    };

    toggleEquipmentSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                operation: {
                    ...prevState.operation,
                    equipment:prevState.equipments[index]
                }
            }
        })
    };

    toggleSelect = (name, value) => {
        this.setState({
            ...this.state,
            operation: {
                ...this.state.operation,
                [name]: value
            }
        })
    };

    textInputChange = (e, isNumber) => {
        this.setState({
            ...this.state,
            operation: {
                ...this.state.operation,
                [e.target.name]: isNumber ? parseInt(e.target.value) : e.target.value
            },
        })
    };

    addRequest = () => {
        console.log("operaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(this.state.operation);
        api.operation.addOperation(this.state.operation).then(res => {
            console.log(res);
            if (res.data.errors && res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
            }
            this.closeModal();
            this.populateOperations();
        });
    };

    closeModal = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'none'
                },
                operation: this.defaultOperationState
            }
        });
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main-panel ps-container ps-theme-default">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <List
                                    add={this.add}
                                    edit={this.edit}
                                    items={this.state.operations}
                                    itemTemplate={this.OperationItemTemplate}
                                    header={this.tableHeader}
                                />
                                {
                                    this.state.modal.visibility === 'block' &&
                                    <Modal
                                        item={this.state.operation}
                                        tabs={['Operation']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.operationTemplate]}
                                        closeModal={this.closeModal}
                                        addObject={this.addRequest}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

//component
    OperationItemTemplate = (props) => {
        return (
            <tr>
                <td>
                    {props.name}
                </td>
                <td>
                    {props.numOfOperation}
                </td>
                <td>
                    <p>{props.equipment.machineType}</p>
                </td>
                <td>
                    <p>{props.typeOfCloth}</p>
                </td>
                <td>
                    <p>{props.idealTime}</p>
                </td>
            </tr>
        )
    };

    operationTemplate = ({content: props}) => {
        console.log(props);
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Enter the info about operation </h5>
                </div>
                <div className="col-md-6">
                    <div className="text-center">
                        <h4 className="text-center">Auto generated QR code</h4>
                        <div className="text-center">
                            <QRCode className="text-center" value={props.id}/>
                        </div>
                        <div className="text-center">
                            <button
                                // onClick={this.saveQrCode}
                                className="btn btn-rose btn-round btn-fab"
                            >
                                <i className="material-icons">save</i>
                                <div className="ripple-container"/>
                            </button>
                            <ReactToPrint
                                content={() => (
                                    <QRCode className="text-center" value={props.id}/>
                                )}
                                trigger={() => (
                                    <button className="btn btn-rose btn-round btn-fab">
                                        <i className="material-icons">print</i>
                                        <div className="ripple-container"/>
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group form-control-lg">
                        <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"/>
            </span>
                        </div>
                        <div className="form-group bmd-form-group">
                            <input
                                className="form-control"
                                id="exampleInput11"
                                name="numOfOperation"
                                placeholder="Number of Operation"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.numOfOperation}
                                onChange={(e) => {
                                    this.textInputChange(e, true)
                                }}
                            />
                        </div>
                    </div>
                    <div className="input-group form-control-lg">
                        <div className="input-group-prepend">
                        <span className="input-group-text">
              <i className="fa fa-key"/>
            </span>
                        </div>
                        <div className="form-group bmd-form-group">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle btn btn-default btn-block"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {props.equipment.machineType}
                                    <div className="ripple-container"/>
                                </button>
                                <div className="dropdown-menu"
                                     aria-labelledby="dropdownMenuButton"
                                     x-placement="bottom-start"
                                     style={{
                                         position: 'absolute',
                                         top: '25px',
                                         left: '1px',
                                         willChange: 'top, left'
                                     }}>
                                    {this.state.equipments && this.state.equipments.map((i, n) => {
                                        return (
                                            <a className="dropdown-item"
                                               onClick={() => {
                                                   this.toggleEquipmentSelect(n)
                                               }}
                                               href="#">{i.machineType}</a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-group form-control-lg">
                        <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"/>
            </span>
                        </div>
                        <div className="form-group bmd-form-group">
                            <input
                                className="form-control"
                                id="exampleInput11"
                                name="typeOfCloth"
                                placeholder="Type of Cloth"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.typeOfCloth}
                                onChange={(e) => {
                                    this.textInputChange(e, false)
                                }}
                            />
                        </div>
                    </div>
                    <div className="input-group form-control-lg">
                        <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"/>
            </span>
                        </div>
                        <div className="form-group bmd-form-group">
                            <input
                                className="form-control"
                                id="exampleInput11"
                                name="name"
                                placeholder="Name of Operation"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.name}
                                onChange={(e) => {
                                    this.textInputChange(e, false)
                                }}
                            />
                        </div>
                    </div>
                    <div className="input-group form-control-lg">
                        <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"/>
            </span>
                        </div>
                        <div className="form-group bmd-form-group">
                            <input
                                className="form-control"
                                id="exampleInput11"
                                name="idealTime"
                                placeholder="Ideal Time"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.idealTime}
                                onChange={(e) => {
                                    this.textInputChange(e, true)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    tableHeader = () => {
        return (
            <thead>
            <tr>
                <th>name</th>
                <th>Number of operation</th>
                <th>type of machine</th>
                <th>type of cloth</th>
                <th>ideal time</th>
                <th className="text-right">Actions</th>
            </tr>
            </thead>
        );
    };

}

export default OperationsPages;