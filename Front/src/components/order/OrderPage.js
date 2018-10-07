import React from "react";
import Sidebar from "../header/Sidebar";
import uuid from "uuid";
import List from "../list/List";
import Modal from "../modal/Modal";
import api from "../../api/api";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

class OrderPage extends React.Component {

    //var
    state = {
        modal: {
            visibility: "none"
        },
        Orders: [],
        Order: {
            customer: {},
            model: {},
            typeOfCloth: {
                name: ""
            },
            property: []
        },
        customers: [],
        models: [],
    };

    defaultOrderState = {
        id: uuid(),
        customer: {
            customerName: "Choose the customer"
        },
        property: [{
            quantity: "",
            size: ""
        }],
        model: {
            codeOfModel: "",
        },
        typeOfCloth: {
            name: "Choose the type of cloth"
        },
        CustomerID:'',
        ModelID:''
    };

//functions

    toggleCustomerSelect = (index) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                Order: {
                    ...prevState.Order,
                    customer: prevState.customers[index],
                    CustomerID:prevState.customers[index].id
                }
            }
        });
        console.log(this.state);
    };

    textInputChange = (obj, value) => {
        this.setState({
            ...this.state,
            Order: {
                ...this.state.Order,
                [obj]: {
                    [value.target.name]: value.target.value
                }
            },
        })
    };

    inputArrayChange = (value, variable, index) => {
        let list = this.state.Order.property;
        list[index][variable] = value.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                Order: {
                    ...prevState.Order,
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
        api.order.preGetAll().then(res => {
            this.setState((prevState => {
                return {
                    ...prevState,
                    Orders: res.data.Orders
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
                    Order: {
                        ...this.state.Order,
                        logo: fr.result
                    }
                });
            };
            fr.readAsDataURL(e.target.files[0]);
        }
    };

    removeAction = (index) => {
        this.setState((prevState => {
                return {
                    ...prevState,
                    Order: {
                        ...prevState.Order,
                        property: [...prevState.Order.property.filter((bool, i) => {
                            return i !== index;
                        })]
                    }
                }
            }
        ))

    };

    addRequest = () => {
        let {id,CustomerID}=this.state.Order;
        api.order.add({id:id,customerId:CustomerID}).then(res => {

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
                Order: {
                    ...prevState.Order,
                    property: [...prevState.Order.property,
                        {
                            ...prevState.Order.property
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
                    visibility: 'none'
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
                Order: this.defaultOrderState
            }
        });
    };

    toggleObjSelect = (name, value, object) => {
        this.setState({
            ...this.state,
            Order: {
                ...this.state.Order,
                [object]: {
                    [name]: value
                }
            }
        })
    };



    toggleObjSelect = (name, value, object) => {
        this.setState({
            ...this.state,
            Order: {
                ...this.state.Order,
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
                Order: {
                    ...prevState.Order,
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
    edit = () => {

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
                                    items={this.state.Orders}
                                    itemTemplate={this.OrderItemTemplate}
                                    header={this.tableHeader}
                                />
                                {
                                    this.state.modal.visibility === 'block' &&
                                    <Modal
                                        item={this.state.Order}
                                        tabs={['Order', 'Table']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.orderTemplate, this.tableTemplate]}
                                        closeModal={this.closeModal}
                                        addObject={this.addRequest}
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
        return (
            <tr>
                <td>

                </td>
                <td>
                    {props.customerName}
                </td>
                <td>
                    <p>{props.codeOfModel}</p>
                </td>
                <td>
                    <p>{props.typeOfCloth}</p>
                </td>
            </tr>
        )
    };

    tableHeader = () => {
        return (
            <thead>
            <tr>
                <th>Customer</th>
                <th>Model</th>
                <th>Type of model</th>
                <th className="text-right">Actions</th>
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
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.Order.property && this.state.Order.property.map((item, index) => (
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
                                                    placeholder="Number of Model"
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
                                                    placeholder="Number of Model"
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
                                                <input
                                                    className="form-control"
                                                    id="exampleInput11"
                                                    name="size"
                                                    placeholder="Number of Model"
                                                    required=""
                                                    aria-required="true"
                                                    type="text"
                                                    // equipment.name
                                                    value={props.content.property.color}
                                                    onChange={(value) => {
                                                        this.inputArrayChange(value, "color", index)
                                                    }}
                                                />
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
    orderTemplate = (props) => {
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
                                value={props.content.model.codeOfModel}
                                onChange={(value) => {
                                    this.textInputChange("model", value)
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
                                    {props.content.typeOfCloth.name}
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
                                           this.toggleObjSelect("name", "T-shirt", "typeOfCloth")
                                       }}
                                       href="#">T-shirt</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("name", "Y-shirt", "typeOfCloth")
                                       }}
                                       href="#">Y-shirt</a>
                                    <a className="dropdown-item"
                                       onClick={() => {
                                           this.toggleObjSelect("name", "X-shirt", "typeOfCloth")
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

export default OrderPage;