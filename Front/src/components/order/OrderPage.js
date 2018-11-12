import React from "react";
import Sidebar from "../header/Sidebar";
import uuid from "uuid";
import List from "../list/List";
import Modal from "../modal/Modal";
import api from "../../api/api";
import {SwatchesPicker} from 'react-color';
import ReactTooltip from 'react-tooltip';

class OrderPage extends React.Component {

    //var
    state = {
        title: "Заказы",
        actionVisibility: "none",
        modal: {
            visibility: "none",
            editing: false
        },
        orders: [],
        order: {
            managerReady: false,
            photo: "",
            customer: {
                customerName: ""
            },
            model: {},
            typeOfCloth: {
                name: ""
            },
            property: []
        },
        customers: [],
        models: [],
    };

    ModelID = uuid();

    defaultOrderState = {
        photo: "../../assets/img/cs-ohnoes.svg",
        id: uuid(),
        customer: {
            customerName: "Выберите Клиента"
        },
        CodeOfModel: "",
        TypeOfClothID: "",
        property: [{
            quantity: "",
            size: "",
            color: "",
            secondaryColor: ""
        }],
        model: {
            id: this.ModelID
        },
        managerReady: false,
        typeOfCloth: {
            name: "Выберите тип Изделий"
        },
        CustomerID: '',
        ModelID: this.ModelID
    };

//functions

    toggleCustomerSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    customer: prevState.customers[index],
                    CustomerID: prevState.customers[index].id
                }
            }
        });
        console.log(this.state);
    };

    textInputChange = (obj, value) => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [obj]: {
                    [value.target.name]: value.target.value
                }
            }
        })
    };

    textChange = (obj, value) => {
        this.setState({
                ...this.state,
                [obj]: {
                    ...this.state[obj],
                    [value.target.name]: value.target.value
                }
            }
        )
    };

    inputArrayChange = (value, variable, index) => {
        let list = this.state.order.property;
        list[index][variable] = value.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    property: list
                }
            }
        })
    };


    componentWillMount() {
        this.populateCustomers();
        this.populateModels();
        this.populateOrders();
    }

    populateModels = () => {
        api.model.getAll().then(res => {
            this.setState((prevState => {
                return {
                    ...prevState,
                    models: res.data.models
                }
            }))
        })
    };

    populateCustomers = () => {
        api.customer.getAll().then(res => {
            this.setState((prevState => {
                return {
                    ...prevState,
                    customers: res.data.customers
                }
            }))
        })
    };

    populateOrders = () => {
        api.order.getAll().then(res => {
            console.log(res);
            this.setState((prevState => {
                return {
                    ...prevState,
                    orders: res.data.Order
                }
            }))
        })
    };

    fileInputChange = (e) => {
        if (e.target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    order: {
                        ...this.state.order,
                        photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(e.target.files[0]);
        }
    };

    handleChangeComplete = (color) => {
        this.setState({background: color.hex});
    };

    removeAction = (index) => {
        this.setState((prevState => {
                return {
                    ...prevState,
                    order: {
                        ...prevState.order,
                        property: [...prevState.order.property.filter((bool, i) => {
                            return i !== index;
                        })]
                    }
                }
            }
        ))

    };

    addRequest = () => {
        let {order} = this.state;
        api.order.add({
            id: order.id,
            CodeOfModel: order.CodeOfModel,
            CustomerID: order.CustomerID,
            ModelID: order.ModelID,
            property: order.property,
            photo: order.photo
        }).then(res => {
            if (res.data.errors && res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
            }
            this.closeModal();
            this.populateOrders();
        });
    };

    saveRequest = () => {
        let {order} = this.state;
        api.order.update({
            managerReady: order.managerReady,
            id: order.id,
            CodeOfModel: order.CodeOfModel,
            CustomerID: order.CustomerID,
            ModelID: order.ModelID,
            property: order.property,
            photo: order.photo
        }).then(res => {
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
            this.populateOrders();
        });
    };

    addAction = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    property: [...prevState.order.property,
                        {
                            ...prevState.order.property,
                            OrderID:prevState.order.id
                        }]
                }
            };
        })
    };

    closeModal = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'none',
                    editing: false
                },
                Order: this.defaultOrderState
            }
        });
    };

    add = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'block'
                },
                order: this.defaultOrderState
            }
        });
    };

    toggleObjSelect = (name, value, object) => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [object]: {
                    [name]: value
                }
            }
        })
    };

    editAll = () => {
        this.setState(prevState => ({
            ...prevState,
            actionVisibility: "block",
            editing: true
        }))
    };

    toggleObjSelect = (name, value, object) => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [object]: {
                    [name]: value
                }
            }
        })
    };

    toggleModelSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    model: prevState.models[index]
                }
            }
        })
    };

    toggleTypeOfClothSelect = (name, value) => {
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                typeOfCloth: {
                    [name]: value
                }
            }
        })
    };
    edit = order => {
        console.log(this.state.customers);
        console.log("customers");
        console.log(order.CustomerID);
        this.setState({
            ...this.state,
            modal: {
                visibility: "block",
                header: "Изменить заказчика",
                editing: true
            },
            order: {
                ...order,
                customer: this.state.customers.find((item, index) => {
                    return item.id === order.CustomerID
                })
            }
        });
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
                                    title={this.state.title}
                                    add={this.add}
                                    edit={this.edit}
                                    items={this.state.orders}
                                    itemTemplate={this.OrderItemTemplate}
                                    header={this.tableHeader}
                                    editAll={this.editAll}
                                    actionVisibility={this.state.actionVisibility}
                                />
                                {
                                    this.state.modal.visibility === 'block' &&
                                    <Modal
                                        editing={this.state.modal.editing}
                                        item={this.state.order}
                                        tabs={['Заказ', 'Таблица']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.orderTemplate, this.tableTemplate]}
                                        closeModal={this.closeModal}
                                        addObject={this.addRequest}
                                        saveObject={this.saveRequest}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

//components

    OrderItemTemplate = (props) => {
        console.log("Order props");
        console.log(props);
        let customer = this.state.customers.find((item, index) => {
            return item.id === props.CustomerID
        });

        let customerName = customer ? customer.customerName : "null";

        // let order = this.state.orders.find((item, index) => {
        //     return item.id === props.ModelID
        // });
        //
        // let codeOfModel = order ? order.CodeOfModel : "null";

        return (
            <tr>

                <td>
                    <img
                        className="img"
                        src={props.photo}
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50px"
                        }}
                    />
                </td>
                <td>
                    {customerName}
                </td>
                <td>
                    <a href="#" onClick={() => props.edit(props)}>
                        {props.CodeOfModel}
                    </a>
                </td>
                <td>
                    {}
                </td>
                {/*status*/}
                <td>
                    <ReactTooltip/>
                    {props.managerReady ?
                        <div className="ml-auto" data-tip="Manager ready">
                            <a href="#" className="btn btn-lg btn-success btn-round btn-just-icon">
                                <i className="fas fa-check"></i>
                            </a>
                        </div>
                        :
                        <div className="ml-auto" data-tip="Manager not ready">
                            <a href="#" className="btn btn-lg btn-danger btn-round btn-just-icon">
                                <i className="fas fa-times"></i>
                            </a>
                        </div>}
                    <div className="ml-auto" data-tip="Ready for cutting">
                        <a href="#" className="btn btn-lg btn-success btn-round btn-just-icon">
                            <i className="fas fa-cut"></i>
                        </a>
                    </div>
                    <div className="ml-auto" data-tip="Not finished">
                        <a href="#" className="btn btn-lg btn-danger btn-round btn-just-icon">
                            <i className="fas fa-clock"></i>
                        </a>
                    </div>
                </td>
                <td style={{display: props.actionVisibility}}>
                    <a href="#" className="btn btn-just-icon btn-round btn-danger btn-block">
                        <i className="fas fa-trash"></i>
                    </a>
                    <a href="#" className="btn btn-just-icon btn-round btn-success btn-block">
                        <i className="fas fa-clone"></i>
                    </a>
                </td>
            </tr>
        )
    };

    tableHeader = () => {
        return (
            <thead>
            <tr>
                <th>Фото</th>
                <th>Заказчик</th>
                <th>Номер Моделей</th>
                <th>Тип издели</th>
                <th>Статус</th>
                <th className="text-right">Действия</th>
            </tr>
            </thead>
        );
    };
    tableTemplate = (props) => {
        return (
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="table-responsive" style={{overflowY: "scroll", height: "300px"}}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Количество</th>
                                <th>Размер</th>
                                <th>Цвет</th>
                                <th>Второй Цвет</th>
                                <th>Действие</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.order.property && this.state.order.property.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <p>{index}</p>
                                    </td>
                                    <td>
                                        <div className="input-group form-control-lg">

                                            <div className="form-group bmd-form-group">
                                                <input
                                                    className="form-control"
                                                    id="exampleInput11"
                                                    name="quantity"
                                                    placeholder="Количество"
                                                    required=""
                                                    aria-required="true"
                                                    type="text"
                                                    // equipment.name
                                                    value={props.content.property.quantity}
                                                    onChange={(value) => {
                                                        this.inputArrayChange(value, "quantity", index)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-group form-control-lg">
                                            <div className="form-group bmd-form-group">
                                                <input
                                                    className="form-control"
                                                    id="exampleInput11"
                                                    name="size"
                                                    placeholder="Размер"
                                                    required=""
                                                    aria-required="true"
                                                    type="text"
                                                    // equipment.name
                                                    value={props.content.property.size}
                                                    onChange={(value) => {
                                                        this.inputArrayChange(value, "size", index)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-group form-control-lg">

                                            <div className="form-group bmd-form-group">
                                                <SwatchesPicker
                                                    width={"120px"}
                                                    height={"60px"}
                                                    onChangeComplete={this.handleChangeComplete}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-group form-control-lg">
                                            <div className="form-group bmd-form-group">
                                                <SwatchesPicker
                                                    width={"120px"}
                                                    height={"60px"}
                                                    onChangeComplete={this.handleChangeComplete}
                                                />
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
                                       checked={props.content.managerReady}
                                       onChange={() => {
                                           this.setState({
                                               ...this.state,
                                               order: {
                                                   ...this.state.order,
                                                   managerReady: !this.state.order.managerReady
                                               }
                                           });
                                           console.log(this.state.order.managerReady)
                                       }}
                                />
                                <label for="checkbox" className="form-check-label">
                                    <h4>Manager Ready</h4>
                                </label>
                            </div>
                        </div>
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
    orderTemplate = ({content: props}) => {
        console.log(props);
        console.log("order data");
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Введите информацию о модели </h5>
                </div>
                <div className="col-md-5">
                    <div className="text-center">
                        <div className="text-center">
                            <div className="picture-container">
                                <div className="picture">
                                    <img src={props.photo}
                                         className="picture-src" id="wizardPicturePreview"
                                         title=""/>
                                    <input id="wizard-picture"
                                           type="file"
                                           name="photo"
                                           onChange={this.fileInputChange}
                                    />
                                </div>
                                <h6 className="description">Выберите изображение</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
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
                                name="CodeOfModel"
                                placeholder="Код модели"
                                required=""
                                aria-required="true"
                                type="text"
                                // equipment.name
                                value={props.CodeOfModel}
                                onChange={(value) => {
                                    this.textChange("order", value)
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
                                name="Name"
                                placeholder="тип изделия"
                                required=""
                                aria-required="true"
                                type="text"
                                // equipment.name
                                value={props.typeOfCloth.Name}
                                onChange={(value) => {
                                    this.textInputChange("typeOfCloth", value)
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
                                    className="dropdown-toggle btn btn-primary btn-round btn-block"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {/*brand*/}
                                    {props.customer && props.customer.customerName}
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
                                    {this.state.customers && this.state.customers.map((i, n) => {
                                        return (
                                            <a className="dropdown-item"
                                               onClick={() => {
                                                   this.toggleCustomerSelect(n)
                                               }}
                                               href="#">{i.customerName}</a>
                                        );

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };


}

export default OrderPage;