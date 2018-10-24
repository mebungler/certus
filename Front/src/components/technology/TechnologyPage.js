import React from "react";
import uuid from "uuid";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import Modal from "../modal/Modal";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

class TechnologyPage extends React.Component {

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
        operations: [],
        title: "Технология- not yet",
        technology: {
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

    edit = () => {

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
                                        tabs={['Операция','Действия']}
                                        visibility={this.state.modal.visibility}
                                        items={[this.technologyTemplate,this.actionTemplate]}
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
        return (
            <tr>
                <td>
                    <a href="#" onClick={() => props.edit(props)}>
                        {props.name}
                    </a>
                </td>
                <td>
                    {props.numOfOperation}
                </td>
                <td>
                    <p>{props.equipment.machineType&&props.equipment.machineType}</p>
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

    tableHeader = () => {
        return (
            <thead>
            <tr>
                <th>Название</th>
                <th>Количество операций</th>
                <th>Тип машины</th>
                <th>Тип изделий</th>
                <th>Хронометраж</th>
                <th className="text-right">Действия</th>
            </tr>
            </thead>
        );
    };

    technologyTemplate = ({content: props}) => {
        console.log(props);
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <h5 className="info-text"> Введите информацию об операции</h5>
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
                                placeholder="Количество операций"
                                required=""
                                aria-required="true"
                                type="text"
                                value={props.numOfOperation}
                                // onChange={(e) => {
                                //     this.textInputChange(e, true)
                                // }}
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
                                    {/*{props.equipment.machineType}*/}
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
                                               //     this.toggleEquipmentSelect(n)
                                               // }}
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
                                value={props.typeOfCloth}
                                // onChange={(e) => {
                                //     this.textInputChange(e, false)
                                // }}
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
                                value={props.name}
                                // onChange={(e) => {
                                //     this.textInputChange(e, false)
                                // }}
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
                                value={props.idealTime}
                                // onChange={(e) => {
                                //     this.textInputChange(e, true)
                                // }}
                            />
                        </div>
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
                            {this.state.technology.actionOnModel.map((item, index) => (
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
}

export default TechnologyPage;