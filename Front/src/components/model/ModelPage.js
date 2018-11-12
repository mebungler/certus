import React from "react";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import api from "../../api/api"
import Modal from "../modal/Modal";
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
                    name: "Выберите операцию",
                    number: "0000"
                },
                equipment: {
                    machineType: "Выбрать машину"
                }
            }]
        },
        actionVisibility: "none",
        title: "Модели"
    };

    defaultModelState = {
        id: uuid(),
        codeOfModel: "",
        customer: {
            customerName: "Выбрать клиента"
        },
        typeOfCloth: {
            Name: "Выберите тип издели"
        },
        actionOnModel: [{
            operation: {
                name: "Выберите операцию",
                number: "0000"
            },
            equipment: {
                machineType: "Выбрать машину"
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

    toggleCustomerSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                model: {
                    ...prevState.model,
                    customer: prevState.customers[index]
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

    editAll = () => {
        this.setState(prevState => ({
            ...prevState,
            actionVisibility: "block"
        }))
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
            if (res.data.errors && res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
            }
            this.closeModal();
            this.populateModels();
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
                                        title={this.state.title}
                                        actionVisibility={this.state.actionVisibility}
                                        editAll={this.editAll}
                                    />
                                    {
                                        this.state.modal.visibility === 'block' &&
                                        <Modal
                                            item={this.state.model}
                                            tabs={['Действия']}
                                            visibility={this.state.modal.visibility}
                                            items={[this.actions]}
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
            <th>Код модели</th>
            <th>Тип изделия</th>
            <th>Заказчик</th>
            <th>Количество операций</th>
            <th>Создан</th>
            <th>Обновлено</th>
            <th className="text-right">Действия</th>
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

    toggleEquipmentSelect = (name) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                model: {
                    ...prevState.model,
                    equipment: name
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
                                <th>Тип машины</th>
                                <th>Операция</th>
                                <th>Действия</th>
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
                                                               this.toggleSelect(i, i.target.value)
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
                                name: "Выберите операцию",
                                number: "0000"
                            },
                            equipment: {
                                machineType: "Выбрать машину"
                            }
                        }]
                }
            };
        })
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
                {props.typeOfCloth.name}
            </td>
            <td>
                <p>{props.customer.customerName}</p>
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
            <td style={{display: props.actionVisibility}}>
                <a className="btn btn-just-icon btn-link btn-danger btn-block">
                    <i className="material-icons">delete</i>
                </a>
                <a className="btn btn-just-icon btn-link btn-success btn-block">
                    <i className="material-icons">file_copy</i>
                </a>
            </td>
        </tr>
    )
};


export default ModelPage;

