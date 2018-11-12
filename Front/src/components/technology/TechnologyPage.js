import React from "react";
import uuid from "uuid";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import Modal from "../modal/Modal";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import api from "../../api/api";
import {NotificationMessage} from "../messages/Messages";

class TechnologyPage extends React.Component {

    //var

    defaultOperationState = {
        id: uuid(),
        numOfOperation: "",
        equipment: {
            machineType: "выберите машину"
        },
        typeOfCloth: "",
        name: "",
        idealTime: ""
    };

    state = {
        successNotification: false,
        equipments: [],
        modal: {
            visibility: "none"
        },
        title: "Технология- not yet",
        technology: {
            operation: {
                ...this.defaultOperationState
            },
            technologyReady: false,
            operations: [],
            id: "",
            actionOnModel: []
        },
        technologies: []
    };

    //functions

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

    toggleEquipmentSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                technology: {
                    ...prevState.technology,
                    operation: {
                        ...prevState.technology.operation,
                        equipment: prevState.equipments[index]
                    }
                }
            }
        })
    };

    edit = () => {

    };

    removeAction = (index) => {
        this.setState((prevState => {
                return {
                    ...prevState,
                    technology: {
                        ...prevState.technology,
                        operations: [...prevState.technology.operations.filter((bool, i) => {
                            return i !== index;
                        })]
                    }
                }
            }
        ))

    };

    textInputChange = (e, isNumber) => {
        this.setState({
            ...this.state,
            technology: {
                ...this.state.technology,
                operation: {
                    ...this.state.technology.operation,
                    [e.target.name]: isNumber ? parseInt(e.target.value) : e.target.value
                }
            },
        })
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
        })
    };

    componentWillMount() {
        this.populateEquipments();
        this.populateOperations();
    }

    addOperationToTechnology = (operation) => {
        this.setState({
            ...this.state,
            technology: {
                ...this.state.technology,
                operations: [...this.state.technology.operations, {...operation}],
                operation: this.defaultOperationState
            },
            successNotification: true
        })
    };

    //component

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main-panel ps-container ps-theme-default">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <List
                                    title={this.state.title}
                                    add={this.add}
                                    edit={this.edit}
                                    items={this.state.technologies}
                                    itemTemplate={this.TechnologyItemTemplate}
                                    header={this.tableHeader}
                                />
                                {
                                    this.state.modal.visibility === 'block' &&
                                    <Modal
                                        item={this.state.technology}
                                        tabs={['Операция', 'Действия']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.technologyTemplate, this.actionTemplate]}
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

    TechnologyItemTemplate = (props) => {
        console.log(props);
        console.log("prop");
        return (
            <tr>
                <td>
                    <a href="#" onClick={() => props.edit(props)}>
                        {null}
                    </a>
                </td>
                <td>
                    {props.numOfOperation}
                </td>
                <td>
                    <p>{props.equipment.machineType && props.equipment.machineType}</p>
                </td>
                <td>
                    <p>{props.typeOfCloth}</p>
                </td>
                <td>
                    <p>{props.idealTime}</p>
                </td>
                <td>
                    {!this.state.technologyReady ?
                        <div className="ml-auto">
                            <a href="#" className="btn btn-success">
                                Technology Ready
                            </a>
                        </div> :
                        <div className="ml-auto">
                            <a href="#" className="btn">
                                Technology not ready
                            </a>
                        </div>
                    }
                </td>
            </tr>
        )
    };

    tableHeader = () => {
        return (
            <thead>
            <tr>
                <th>Название</th>
                <th>Количество операций</th>
                <th>Тип машины</th>
                <th>Тип изделий</th>
                <th>Хронометраж</th>
                <th>Статус</th>
                <th className="text-right">Действия</th>
            </tr>
            </thead>
        );
    };

    technologyTemplate = ({content: props}) => {
        console.log(props);
        console.log("props");
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Введите информацию об операции</h5>
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
                                placeholder="Номер операций"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.operation.numOfOperation}
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
                                    className="dropdown-toggle btn btn-info btn-block"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {props.operation.equipment.machineType}
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
                                placeholder="Тип издели"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.operation.typeOfCloth}
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
                                placeholder="Название операции"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.operation.name}
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
                                placeholder="хронометраж"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.operation.idealTime}
                                onChange={(e) => {
                                    this.textInputChange(e, true)
                                }}
                            />
                        </div>
                    </div>
                    {this.state.successNotification &&
                    <NotificationMessage success header="Success!" message={"Operation successfully added"}/>}
                </div>
                <div className="col-md-6">
                    <div className="text-center">
                        <h4 className="text-center">Автогенерированный QR-код</h4>
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
                    <div className="bottom-align-text">
                        <a href="#" className="btn btn-success btn-block"
                           onClick={() => this.addOperationToTechnology(props.operation)}>
                            <p>добавить в список</p>
                            <i className="material-icons">done</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    actionTemplate = (props) => {
        return (
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="table-responsive" style={{overflowY: "scroll", height: "300px"}}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Тип машины</th>
                                <th>Операция</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.technology.operations.map((item, index) => (
                                <tr key={index}>
                                    {console.log(this.state.technology)}{console.log("item")}
                                    <td>
                                        <p>{index}</p>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="dropdown-toggle btn btn-info btn-block"
                                                type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                {item.equipment.machineType}
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
                                                            // onClick={() => {
                                                            //     this.toggleSelect(i, i.target.value)
                                                            // }}
                                                           href="#">{i.machineType}</a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="dropdown-toggle btn btn-info btn-block"
                                                type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                {item.name}


                                                <div className="ripple-container"/>
                                            </button>
                                            <div className="dropdown-menu"
                                                 aria-labelledby="dropdownMenuButton"
                                                 x-placement="bottom-start"
                                                 style={{
                                                     position: 'absolute',
                                                     top: '0px',
                                                     left: '1px',
                                                     willChange: 'top, left'
                                                 }}>
                                                {this.state.operations && this.state.operations.map((i, n) => {
                                                    return (
                                                        <a className="dropdown-item"
                                                            // onClick={() => {
                                                            //     this.toggleOperationSelect(i.name, index)
                                                            // }}
                                                           href="#">{i.name}</a>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() => this.removeAction(index)}
                                            className="btn btn-danger btn-link">
                                            <i className="material-icons"> close</i>
                                            <div className="ripple-container"/>
                                        </a>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex">
                            <div className="form">
                                <input type="checkbox"
                                       id="checkbox"
                                       className="form-check-input"
                                       checked={this.state.technologyReady}
                                       onChange={() => {
                                           this.setState({...this.state, technologyReady: !this.state.technologyReady})
                                           console.log(this.state.technologyReady)
                                       }}
                                />
                                <label htmlFor="checkbox" className="form-check-label">
                                    <h4>Technology Ready</h4>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default TechnologyPage;