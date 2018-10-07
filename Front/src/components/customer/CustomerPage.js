import React from "react";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import Modal from "../modal/Modal";
import api from "../../api/api";
import uuid from "uuid";

class CustomerPage extends React.Component {

    //var
    state = {
        customer: {
            customerName: "Kamuran-",
            contactNumber: "nomerim yuq",
            email: "kamuran@nmadir.com",
            logo: "../../assets/img/customer.svg"
        },
        customers: [],
        modal: {
            visibility: "none"
        }
    };

    defaultCustomerState = {
        id: uuid(),
        customerName: "",
        contactNumber: "",
        email: "",
        logo: "../../assets/img/customer.svg"
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
                customer: this.defaultCustomerState
            }
        });
    };
    edit = () => {

    };

    closeModal = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'none'
                },
                customer: this.defaultCustomerState
            }
        });
        console.log(this.state);
    };
    populateCustomers = () => {
        api.customer.getAll().then(res => {
            console.log(res);
            this.setState((prevState => {
                return {
                    ...prevState,
                    customers: res.data.customers
                }
            }));
            console.log(res);
        })
    };

    componentDidMount() {
        this.populateCustomers();
    };

    closeCustomer = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                modal: {
                    ...prevState.modal,
                    visibility: 'none'
                },
                customer: this.defaultCustomerState
            }
        });
        // console.log(this.state);
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

    addRequest = () => {
        api.customer.add(this.state.customer).then(res => {
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
            this.populateCustomers();
        });
    };

    textInputChange = (e) => {
        this.setState({
            ...this.state,
            customer: {
                ...this.state.customer,
                [e.target.name]: e.target.value
            },
        })
    };

    fileInputChange = (e) => {
        if (e.target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    customer: {
                        ...this.state.customer,
                        logo: fr.result
                    }
                });
            };
            fr.readAsDataURL(e.target.files[0]);
        }
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
                                    items={this.state.customers}
                                    itemTemplate={this.CustomerItemTemplate}
                                    header={this.tableHeader}
                                />
                                {
                                    this.state.modal.visibility === 'block' &&
                                    <Modal
                                        item={this.state.customer}
                                        tabs={['Customer']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.customerTemplate]}
                                        closeModal={this.closeCustomer}
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

//Component
    CustomerItemTemplate = (props) => {
        return (
            <tr>
                <td>
                    <img
                        className="img"
                        src={props.logo}
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50px"
                        }}
                    />
                </td>
                <td>
                    {props.customerName}
                </td>
                <td>
                    <p>{props.contactNumber}</p>
                </td>
                <td>
                    <p>{props.email}</p>
                </td>
            </tr>
        )
    };

    tableHeader = () => (
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th className="text-right">Actions</th>
        </tr>
        </thead>
    );

    customerTemplate = (props) => {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Info About Customer </h5>
                </div>
                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                            <div className="picture-container">
                                <div className="picture">
                                    <img src={this.state.customer.logo}
                                         className="picture-src" id="wizardPicturePreview"
                                         title=""/>
                                    <input id="wizard-picture"
                                           type="file"
                                           name="photo"
                                           onChange={this.fileInputChange}
                                    />
                                </div>
                                <h6 className="description">Choose Picture</h6>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group form-control-lg">
                                <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              <i className="material-icons">face</i>
                                                            </span>
                                </div>
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" id="exampleInput1"
                                           name="customerName"
                                           placeholder="Customer Name"
                                           required=""
                                           aria-required="true"
                                           type="text"
                                           value={props.content.customerName}
                                           onChange={this.textInputChange}
                                    />
                                </div>
                            </div>
                            <div className="input-group form-control-lg">
                                <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                             <i class="fab fa-telegram"></i>
                                                            </span>
                                </div>
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" id="exampleInput11"
                                           name="contactNumber"
                                           placeholder="Telegram Contact"
                                           required=""
                                           aria-required="true"
                                           type="text"
                                           value={props.content.contactNumber}
                                           onChange={this.textInputChange}
                                    />
                                </div>
                            </div>
                            <div className="input-group form-control-lg">
                                <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              <i className="material-icons">email</i>
                                                            </span>
                                </div>
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" id="exampleInput11"
                                           name="email"
                                           placeholder="Email Address"
                                           required=""
                                           aria-required="true"
                                           type="text"
                                           value={props.content.email}
                                           onChange={this.textInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    };
}

export default CustomerPage;