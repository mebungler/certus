import React from "react";
import QRCode from "qrcode.react";
import uuid from "uuid";
import ReactToPrint from 'react-to-print'
import Sidebar from "../header/Sidebar";
import Modal from "../modal/Modal";
import List from "../list/List";
import api from "../../api/api";
import EquipmentItem from "./EquipmentItem";
import {PopulateEquipments} from "../../actions/equipment";
import {connect} from "react-redux";

class EquipmentsPage extends React.Component {
    state = {
        modal: {
            visibility: "none",
            header: ""
        },
        equipment: {}
    };

    defaultEquipmentState = {
        id: uuid(),
        name: "",
        brand: "Select brand name",
        machineType: "Select machine type",
        machineStatus: "Select machine status"
    };

    componentDidMount() {
        this.populateEquipments();
    }

    populateEquipments = () => {
        api.equipment.get().then(res => {
            this.props.dispatch(PopulateEquipments(res.data.equipments));
        });
    };

    add = () => {
        this.setState({
            ...this.state,
            modal: {
                visibility: "block",
                header: "Add equipment"
            },
            equipment: this.defaultEquipmentState
        });
    };

    edit = _equipment => {
        this.setState({
            ...this.state,
            modal: {
                visibility: "block",
                header: "Edit equipment"
            },
            equipment: _equipment
        });
    };
    closeModal = () => {
        this.setState({
            ...this.state,
            modal: {
                visibility: "none"
            }
        });
    };

    textInputChange = (e) => {
        this.setState({
            ...this.state,
            equipment: {
                ...this.state.equipment,
                [e.target.name]: e.target.value
            },
        })
    };

    toggleSelect = (name, value) => {
        this.setState({
            ...this.state,
            equipment: {
                ...this.state.equipment,
                [name]: value
            }
        })
    };
    tableHeader = () => (
        <thead>
        <tr>
            <th>Name</th>
            <th>Brand name</th>
            <th>Machine type</th>
            <th>Machine status</th>
            <th className="text-right">Actions</th>
        </tr>
        </thead>
    );
    equipmentInfoControl = ({content: equipment}) => (
        <div className="row justify-content-center">
            <div className="col-sm-12">
                <h5 className="info-text"> Enter name of the equipment </h5>
            </div>
            <div className="col-md-6">
                <div className="text-center">
                    <h4 className="text-center">Auto generated QR code</h4>
                    <div className="text-center">
                        <QRCode className="text-center" value={equipment.id}/>
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
                                <QRCode className="text-center" value={equipment.id}/>
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
                            name="name"
                            placeholder="Name of the machine"
                            required=""
                            aria-required="true"
                            type="text"
                            value={equipment.name}
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
                                {equipment.brand}
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
                                       this.toggleSelect("brand", "Jack")
                                   }}
                                   href="#">Jack</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("brand", "Juki")
                                   }}
                                   href="#">Juki</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("brand", "Kansai")
                                   }}
                                   href="#">Kansai</a>
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
                                {equipment.machineType}
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
                                       this.toggleSelect("machineType", "Оверлок")
                                   }}
                                   href="#">Оверлок</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("machineType", "Кнопочная машина")
                                   }}
                                   href="#">Кнопочная машина</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("machineType", "Петельная машина")
                                   }}
                                   href="#">Петельная машина</a>
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
                                {equipment.machineStatus}
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
                                       this.toggleSelect("machineStatus", "Ручной")
                                   }}
                                   href="#">Ручной</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("machineStatus", "Полуавтомат")
                                   }}
                                   href="#">Полуавтомат</a>
                                <a className="dropdown-item"
                                   onClick={() => {
                                       this.toggleSelect("machineStatus", "Автомат")
                                   }}
                                   href="#">Автомат</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    requestAdd=()=>{
        api.equipment.add(this.state.equipment).then(res => {
            if (res.data.errors || res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
            }
        });
        this.closeModal();
        this.populateEquipments();
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
                                    <List add={this.add}
                                          edit={this.edit}
                                          items={this.props.equipments}
                                          itemTemplate={EquipmentItem}
                                          header={this.tableHeader}/>
                                    {this.state.modal.visibility === "block" && (
                                        <Modal item={this.state.equipment}
                                               visibility={this.state.modal.visibility}
                                               tabs={["Equipment info"]}
                                               items={[this.equipmentInfoControl]}
                                               closeModal={this.closeModal}
                                               addObject={this.requestAdd}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({equipment}) {
    return {
        equipments: equipment
    };
}

export default connect(mapStateToProps)(EquipmentsPage);