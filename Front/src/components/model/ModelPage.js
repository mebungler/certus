import React from "react";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import api from "../../api/api"
import Modal from "../modal/Modal";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import uuid from "uuid";


class ModelPage extends React.Component {


    state = {
        modal: {
            visibility: 'none',
            header: 'Информация о моделе',
        },
        models: [],
        equipments: [],
        operations: [],
        model: {
            id: "",
            codeOfModel: 'Chotkiy',
            customer: {
                customerName: 'Jalol'
            },
            typeOfCloth: {
                Name: 'Mayka'
            },
            actionOnModel: [{
                operation: {
                    name: "Select operation",
                    number: "0000"
                },
                equipment: {
                    machineType: "Select machine"
                }
            }]
        }
    };

    defaultModelState = {
        id: uuid(),
        codeOfModel: "",
        customer: {
            customerName: "Select customer"
        },
        typeOfCloth: {
            Name: "Select type of cloth"
        },
        actionOnModel: [{
            operation: {
                name: "Select operation",
                number: "0000"
            },
            equipment: {
                machineType: "Select machine"
            }
        }]
    };

    add = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'block'
                },
                model: this.defaultModelState
            }
        });
        console.log(this.state);
    };

    edit = () => {

    };

    toggleSelect = (name, value) => {
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                [name]: value
            }
        });
    };

    toggleObjSelect = (name, value, object) => {
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                [object]: {
                    [name]: value
                }
            }
        })
    };

    populateModels = () => {
        api.model.preGetAll().then(res => {
            console.log(res);
            this.setState((prevState => {
                return {
                    ...prevState,
                    models: res.data.models
                }
            }))
        })
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
            }))
        })
    };

    textInputChange = (e) => {
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                [e.target.name]: e.target.value
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
                model: this.defaultModelState
            }
        });
        console.log(this.state);
    };

    componentWillMount() {
        this.populateModels();
        this.populateEquipments();
        this.populateOperations();
    }

    addRequest = () => {
        api.model.add(this.state.model).then(res => {
            console.log(res);
            if (res.data.errors || res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
                this.closeModal();
                this.populateModels();
            }
        });
    };

    render() {
        return (
            <div>
                <Sidebar/>
                <div>
                    <div className="main-panel ps-container ps-theme-default">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <List
                                        add={this.add}
                                        edit={this.edit}
                                        items={this.state.models}
                                        itemTemplate={ModelItemTemplate}
                                        header={this.tableHeader}
                                    />
                                    {
                                        this.state.modal.visibility === 'block' &&
                                        <Modal
                                            item={this.state.model}
                                            tabs={['AboutTemplate', 'Actions']}
                                            visibility={this.state.modal.visibility}
                                            items={[this.aboutTemplate, this.actions]}
                                            closeModal={this.closeModal}
                                            addObject={this.addRequest}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    tableHeader = () => (
        <thead>
        <tr>
            <th>Code of Model</th>
            <th>Type of cloth</th>
            <th>Customer</th>
            <th>Number of operations</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th className="text-right">Actions</th>
        </tr>
        </thead>
    );

    toggleOperationSelect = (name, index) => {
        let list = this.state.model.actionOnModel;
        list[index].operation.name = name;
        this.setState((prevState) => {
            return {
                ...prevState,
                model: {
                    ...prevState.model,
                    actionOfModel: [list]
                }
            }
        });
    };

    toggleEquipmentSelect = (name, actionIndex) => {
        let list = this.state.model.actionOnModel;
        list[actionIndex].equipment.machineType = name;
        console.log(name + actionIndex);
        this.setState((prevState) => {
            return {
                ...prevState,
                model: {
                    ...prevState.model,
                    actionOfModel: [list]
                }
            }
        })
    };

    actions = (props) => {
        return (
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="table-responsive" style={{overflowY: "scroll", height: "300px"}}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type of Machine</th>
                                <th>Operation</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.model.actionOnModel.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <p>{index}</p>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="dropdown-toggle btn btn-default btn-block"
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
                                                           onClick={() => {
                                                               this.toggleEquipmentSelect(i.machineType, index)
                                                           }}
                                                           href="#">{i.machineType}</a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="dropdown-toggle btn btn-default btn-block"
                                                type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                {item.operation.name}

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
                                                           onClick={() => {
                                                               this.toggleOperationSelect(i.name, index)
                                                           }}
                                                           href="#">{i.name}</a>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() => this.removeAction(index)}
                                            className="btn btn-danger btn-round">
                                            <i className="material-icons"> close</i>
                                            <div className="ripple-container"/>
                                        </a>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="ml-auto">
                            <a onClick={this.addAction} className="btn btn-just-icon btn-round btn-success">
                                <i className="material-icons">add</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    removeAction = (index) => {
        this.setState((prevState => {
                return {
                    ...prevState,
                    model: {
                        ...prevState.model,
                        actionOnModel: [...prevState.model.actionOnModel.filter((bool, i) => {
                            return i !== index;
                        })]
                    }
                }
            }
        ))

    };


    addAction = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                model: {
                    ...prevState.model,
                    actionOnModel: [...prevState.model.actionOnModel,
                        {
                            operation: {
                                name: "Select operation",
                                number: "0000"
                            },
                            equipment: {
                                machineType: "Select machine"
                            }
                        }]
                }
            };
        })
    };

    aboutTemplate = (props) => {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Enter info about Model </h5>
                </div>
                <div className="col-md-6">
                    <div className="text-center">
                        <h4 className="text-center">Auto generated QR code</h4>
                        <div className="text-center">
                            <QRCode className="text-center" value={props.content.id}/>
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
                                    <QRCode className="text-center" value={props.content.id}/>
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
                                name="codeOfModel"
                                placeholder="Number of Model"
                                required=""
                                aria-required="true"
                                type="text"
                                // equipment.name
                                value={props.content.codeOfModel}
                                onChange={this.textInputChange}
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
                                    className="dropdown-toggle btn btn-primary btn-round btn-block"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {/*brand*/}
                                    {props.content.customer.customerName}
                                    <div className="ripple-container"/>
                                </button>
                                <div className="dropdown-menu"
                                     aria-labelledby="dropdownMenuButton"
                                     x-placement="bottom-start"
                                     style={{
                                         position: 'absolute',
                                         top: '41px',
                                         left: '1px',
                                         willChange: 'top, left'
                                     }}>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("customerName", "Customer 1", "customer")
                                       }}
                                       href="#">Customer 1</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("customerName", "Customer 2", "customer")
                                       }}
                                       href="#">Customer 2</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("customerName", "Customer 3", "customer")
                                       }}
                                       href="#">Customer 3</a>
                                </div>
                            </div>
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
                                    className="dropdown-toggle btn btn-primary btn-round btn-block"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {/*machineStatus*/}
                                    {props.content.typeOfCloth.Name}
                                    <div className="ripple-container"/>
                                </button>
                                <div className="dropdown-menu"
                                     aria-labelledby="dropdownMenuButton"
                                     x-placement="bottom-start"
                                     style={{
                                         position: 'absolute',
                                         top: '41px',
                                         left: '1px',
                                         willChange: 'top, left'
                                     }}>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("Name", "T-shirt", "typeOfCloth")
                                       }}
                                       href="#">T-shirt</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("Name", "Y-shirt", "typeOfCloth")
                                       }}
                                       href="#">Y-shirt</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("Name", "X-shirt", "typeOfCloth")
                                       }}
                                       href="#">X-shirt</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}
;


const ModelItemTemplate = (props) => {
    console.log(props);
    return (
        <tr>
            <td>
                {props.codeOfModel}
            </td>
            <td>
                {props.typeOfCloth.Name}
            </td>
            <td>
                <p>{props.customer.name}</p>
            </td>
            <td>
                <p>{props.actionOnModel && props.actionOnModel.length}</p>
            </td>
            <td>
                <p>{props.createAt}</p>
            </td>
            <td>
                <p>{props.updatedAt}</p>
            </td>
        </tr>
    )
};


export default ModelPage;

