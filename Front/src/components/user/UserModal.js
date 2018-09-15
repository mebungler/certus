import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print'

class UserModal extends React.Component {
    state = {
        selectedTabMargin: '0%',
        selectedTabName: "About",
        user: this.props.user,
        modalType: "add",
        errors: {}
    };
    passwordConfirmation = this.state.user.password;
    toggleTabClasses = (name) => {
        if (name === this.state.selectedTabName) {
            return "tab-pane active show";
        } else {
            return "tab-pane";
        }
    };
    toggleTabs = (index) => {
        switch (index) {
            case 0:
                this.setState({...this.state, selectedTabMargin: '0%', selectedTabName: 'About'});
                break;
            case 1:
                this.setState({...this.state, selectedTabMargin: '37%', selectedTabName: 'Account'});
                break;
            default:
                this.setState({...this.state, selectedTabMargin: '68%', selectedTabName: 'Type'});
                break;
        }
    };
    textInputChange = e => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    };
    fileInputChange = e => {
        if (e.target.files[0]) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    ...this.state,
                    user: {
                        ...this.state.user,
                        photo: fr.result
                    }
                });
            };
            fr.readAsDataURL(e.target.files[0]);
        }
    };
    passwordConfirmChange = e => {
        this.passwordConfirmation = e.target.value;
        if (e.target.value !== this.state.user.password) {
            this.setState({
                ...this.state,
                errors: {
                    confirmPassword: "Passwords do not match!"
                }
            });
        } else {
            this.setState({
                ...this.state,
                errors: {}
            });
        }
    };
    toggleDropdown = e => {
        if (e === "Select priority") {
            this.setState({
                ...this.state,
                errors: {
                    priority: "Required"
                }
            })
        } else
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    priority: e
                }
            });
    };
    isOk = () => {
        if (this.state.selectedTabName === "Account" && this.passwordConfirmation !== this.state.user.password) {
            this.setState({
                ...this.state,
                errors: {
                    confirmPassword: "Passwords do not match!"
                }
            });
            return false;
        }
    };
    toggleNextTab = () => {
        let selectedTab = 0;
        switch (this.state.selectedTabName) {
            case "Account":
                selectedTab = 2;
                break;
            case "About":
                selectedTab = 1;
                break;
            default:
                selectedTab = 0;
                break;
        }
        this.toggleTabs(selectedTab);
    };
    generateStyle = (reverse = false) => {
        let bool = reverse ? this.state.selectedTabName === "Type" && Object.keys(this.state.errors).length === 0 : !(this.state.selectedTabName === "Type" && Object.keys(this.state.errors).length === 0);
        if (bool) {
            return {
                display: "block"
            }
        } else {
            return {
                display: "none"
            }
        }
    };
    toggleCheckboxes = e => {
        let val = parseInt(e, 10);
        if (val === this.state.user.type) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    type: 0
                }
            });
            return;
        }
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                type: val
            }
        });
    };

    saveQrCode=()=>{
        let el=()=><QRCode className="text-center" value={this.state.user.id}/>
        let ctx=el.getContext('2d');

    };

    render() {
        const {visibility, header} = this.props.content;
        const {errors} = this.state;
        return <div className="modal fade show" tabIndex="-1" role="dialog"
                    style={{display: visibility, padding: '17px', marginLeft: '20%'}}>
            <div className="col-md-8 col-12 mr-auto ml-auto">
                <div className="wizard-container">
                    <div className="card card-wizard active" data-color="rose" id="wizardProfile">
                        <form action="" method="" noValidate="novalidate">
                            <div className="card-header">
                                <div className="card-title text-center">
                                    <h3 className="pull-right text-right">
                                        <a href="#" onClick={this.props.closeModal} className="fa fa-times"/>
                                    </h3>
                                    <h3>{header}</h3>
                                </div>
                                <h5 className="card-description text-center">This information will let us know more
                                    about the
                                    user.</h5>
                            </div>
                            <div className="wizard-navigation">
                                <ul className="nav nav-pills">
                                    <li className="nav-item" style={{width: '33.3333%'}}>
                                        <a className="nav-link active" onClick={() => {
                                            this.toggleTabs(0)
                                        }} href="#about"
                                           data-toggle="tab" role="tab">
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item" style={{width: '33.3333%'}}>
                                        <a className="nav-link" onClick={() => {
                                            this.toggleTabs(1)
                                        }} href="#account" data-toggle="tab" role="tab">
                                            Account
                                        </a>
                                    </li>
                                    <li className="nav-item" style={{width: '33.3333%'}}>
                                        <a className="nav-link" onClick={() => {
                                            this.toggleTabs(2)
                                        }} href="#type" data-toggle="tab" role="tab">
                                            Type
                                        </a>
                                    </li>
                                </ul>
                                <div className="moving-tab"
                                     style={{
                                         width: '260.222px',
                                         marginLeft: this.state.selectedTabMargin,
                                         transform: 'translate3d(-8px, 0px, 0px)',
                                         transition: 'transform 0s ease 0'
                                     }}>
                                    {this.state.selectedTabName}
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className={this.toggleTabClasses("About")} id="about">
                                        <h5 className="info-text"> Let's start with the basic information</h5>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-4">
                                                <div className="picture-container">
                                                    <div className="picture">
                                                        <img src={this.state.user.photo}
                                                             className="picture-src" id="wizardPicturePreview"
                                                             title=""/>
                                                        <input id="wizard-picture"
                                                               type="file"
                                                               name="photo"
                                                               onChange={this.fileInputChange}/>
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
                                                               name="firstName"
                                                               placeholder="First Name"
                                                               required=""
                                                               aria-required="true"
                                                               type="text"
                                                               value={this.state.user.firstName}
                                                               onChange={this.textInputChange}/>
                                                    </div>
                                                </div>
                                                <div className="input-group form-control-lg">
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              <i className="material-icons">record_voice_over</i>
                                                            </span>
                                                    </div>
                                                    <div className="form-group bmd-form-group">
                                                        <input className="form-control" id="exampleInput11"
                                                               name="lastName"
                                                               placeholder="Last name"
                                                               required=""
                                                               aria-required="true"
                                                               type="text"
                                                               value={this.state.user.lastName}
                                                               onChange={this.textInputChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.toggleTabClasses("Account")} id="account">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12">
                                                <h5 className="info-text"> Choose username and password </h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-center">
                                                    <h4 className="text-center">Auto generated QR code</h4>
                                                    <div className="text-center">
                                                        <QRCode className="text-center" value={this.state.user.id}/>
                                                    </div>
                                                    <div className="text-center">
                                                        <button onClick={this.saveQrCode}
                                                                className="btn btn-rose btn-round btn-fab">
                                                            <i className="material-icons">save</i>
                                                            <div className="ripple-container"/>
                                                        </button>
                                                        <ReactToPrint
                                                            content={() => (<QRCode className="text-center"
                                                                                    value={this.state.user.id}/>)}
                                                            trigger={() => (
                                                                <button className="btn btn-rose btn-round btn-fab">
                                                                    <i className="material-icons">print</i>
                                                                    <div className="ripple-container"/>
                                                                </button>)}
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
                                                        <input className="form-control" id="exampleInput11"
                                                               name="email"
                                                               placeholder="Username or email"
                                                               required=""
                                                               aria-required="true"
                                                               type="text"
                                                               value={this.state.user.email}
                                                               onChange={this.textInputChange}/>
                                                    </div>
                                                </div>
                                                <div className="input-group form-control-lg">
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              <i className="fa fa-key"/>
                                                            </span>
                                                    </div>
                                                    <div className="form-group bmd-form-group">
                                                        <input className="form-control" id="exampleInput11"
                                                               name="password"
                                                               placeholder="Password"
                                                               required=""
                                                               aria-required="true"
                                                               type="password"
                                                               value={this.state.user.password}
                                                               onChange={this.textInputChange}/>
                                                    </div>
                                                </div>
                                                <div className="input-group form-control-lg">
                                                    <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              <i className="fa fa-lock"/>
                                                            </span>
                                                    </div>
                                                    <div className="form-group bmd-form-group">
                                                        <input className="form-control" id="exampleInput11"
                                                               name="confirmPassword"
                                                               placeholder="Confirm Password"
                                                               required=""
                                                               aria-required="true"
                                                               type="password"
                                                               value={this.passwordConfirmation}
                                                               onChange={this.passwordConfirmChange}/>
                                                    </div>
                                                </div>
                                                {errors.confirmPassword &&
                                                <div className="tim-typo">
                                                    <span className="fa fa-times text-danger tim-note"/>
                                                    <p className="text-danger">{errors.confirmPassword}</p>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.toggleTabClasses("Type")} id="type">
                                        <h5 className="info-text"> What is the position and priority? </h5>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-10">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div onClick={() => this.toggleCheckboxes(1)}
                                                             className={this.state.user.type === 1 ? "choice active" : "choice"}
                                                             data-toggle="wizard-checkbox">
                                                            <input name="job" value="Cutter" type="checkbox"/>
                                                            <div className="icon">
                                                                <i className="fa fa-cut"/>
                                                            </div>
                                                            <h6>Cutter</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div onClick={() => this.toggleCheckboxes(2)}
                                                             className={this.state.user.type === 2 ? "choice active" : "choice"}
                                                             data-toggle="wizard-checkbox">
                                                            <input name="job" value="Seamstress" type="checkbox"/>
                                                            <div className="icon">
                                                                <i className="fa fa-tshirt"/>
                                                            </div>
                                                            <h6>Seamstress</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div onClick={() => this.toggleCheckboxes(3)}
                                                             className={this.state.user.type === 3 ? "choice active" : "choice"}
                                                             data-toggle="wizard-checkbox">
                                                            <input name="job" value="Controller" type="checkbox"/>
                                                            <div className="icon">
                                                                <i className="fa fa-laptop-code"/>
                                                            </div>
                                                            <h6>Controller</h6>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="dropdown-toggle btn btn-primary btn-round btn-block"
                                                                type="button" id="dropdownMenuButton"
                                                                data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false">
                                                                {this.state.user.priority}
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
                                                                   onClick={() => this.toggleDropdown(1)}
                                                                   href="#">1</a>
                                                                <a className="dropdown-item"
                                                                   onClick={() => this.toggleDropdown(2)}
                                                                   href="#">2</a>
                                                                <a className="dropdown-item"
                                                                   onClick={() => this.toggleDropdown(3)}
                                                                   href="#">3</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="mr-auto">
                                    <input className="btn btn-previous btn-fill btn-default btn-wd disabled"
                                           name="previous"
                                           value="Previous" type="button"/>
                                </div>
                                <div className="ml-auto">
                                    <input className="btn btn-next btn-fill btn-rose btn-wd" name="next"
                                           value="Next"
                                           type="button"
                                           style={this.generateStyle()}
                                           onClick={this.toggleNextTab}/>
                                    <input className="btn btn-finish btn-fill btn-rose btn-wd" name="finish"
                                           value="Add"
                                           style={this.generateStyle(true)}
                                           onClick={() => this.props.addUser(this.state.user)}
                                           type="button"/>
                                </div>
                                <div className="clearfix"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default UserModal;
