import React from "react";
import UserItem from "./UserItem";
import {connect} from "react-redux";
import uuid from "uuid";
import api from "../../api/api";
import {PopulateUsers} from "../../actions/users";
import List from "../list/List";
import UserModal from "./UserModal";

class UsersList extends React.Component {
    componentDidMount() {
        this.populateUsers();
    }

    state = {
        modal: {
            visibility: "none",
            header: ""
        },
        user: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            type: 0,
            priority: "Select priority",
            id: "000",
            createdAt: "",
            photo: "../../assets/img/default-avatar.png"
        },
        pages: 1,
        errors: {},
        users: this.props.users
    };
    defaultUserState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        type: 0,
        priority: "Select priority",
        id: "000",
        createdAt: "",
        photo: "../../assets/img/default-avatar.png"
    };
    populateUsers = () => {
        api.user.get().then(res => {
            this.props.dispatch(PopulateUsers(res.data.users));
        });
    };
    generateNewUser = () => {
        return {
            ...this.defaultUserState,
            id: uuid()
        };
    };
    addUser = () => {
        this.setState({
            modal: {
                visibility: "block",
                header: "Add user"
            },
            user: this.generateNewUser()
        });
    };
    editUser = user => {
        console.log(user);
        this.setState({
            modal: {
                visibility: "block",
                header: "Edit user"
            },
            user: user
        });
    };
    closeModal = () => {
        this.setState({
            modal: {
                visibility: "none"
            }
        });
    };
    requestAddUser = user => {
        api.user.add(user).then(res => {
            if (res.data.errors || res.data.errors !== {}) {
                this.setState({
                    ...this.state,
                    errors: {
                        global: res.data.errors.global
                    }
                });
            }
        });
        this.populateUsers();
        this.closeModal();
    };

    render() {
        return (
            <div className="col-md-12">
                <List
                    add={this.addUser}
                    edit={this.editUser}
                    items={this.props.users}
                    itemTemplate={UserItem}
                    header={tableHeader}
                />
                {this.state.modal.visibility === "block" && (
                    <UserModal
                        content={this.state.modal}
                        closeModal={this.closeModal}
                        user={this.state.user}
                        addUser={this.requestAddUser}
                    />
                )}
                {/*{this.state.modal.visibility === "block" && (*/}
                {/*<Modal*/}
                {/*tabs={["First Tab", "Second tab", "Third Tab"]}*/}
                {/*items={[this.someForm, this.someForm, this.someForm]}*/}
                {/*visibility={this.state.modal.visibility}*/}
                {/*header={this.state.modal.header}*/}
                {/*closeModal={this.closeModal}*/}
                {/*/>*/}
                {/*)}*/}
            </div>
        );
    }

    someForm = () => (
        <div className="input-group form-control-lg">
            <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fa fa-lock"/>
        </span>
            </div>
            <div className="form-group bmd-form-group">
                <input
                    className="form-control"
                    id="exampleInput11"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required=""
                    aria-required="true"
                    type="password"
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.users
    };
};

export default connect(mapStateToProps)(UsersList);

const tableHeader = () => (
    <thead>
    <tr>
        <th>Photo</th>
        <th>Name&Username</th>
        <th className="th-description">Job position</th>
        <th className="text-right">Actions</th>
    </tr>
    </thead>
);
{
    /* <div className="card">
            <div className="card-header card-header-rose card-header-icon">
              <div className="card-icon">
                <i className="material-icons">assignment</i>
              </div>
              <div className="card-title">Users list</div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4">
                  <div className="pull-right text-right" />
                </div>
                <div className="col-md-4">
                  <div className="input-group no-border">
                    <input
                      value=""
                      className="form-control"
                      placeholder="Search..."
                      type="text"
                    />
                    <button
                      type="submit"
                      className="btn btn-rose btn-round btn-just-icon"
                    >
                      <i className="material-icons">search</i>
                      <div className="ripple-container" />
                    </button>
                    <div className="dropdown pull-right">
                      <button
                        type="submit"
                        id="moreLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        className="btn btn-rose btn-round btn-just-icon"
                      >
                        ...
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="moreLink"
                      >
                        <a
                          className="dropdown-item"
                          onClick={this.editUser}
                          href="#"
                        >
                          Edit users
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={this.addUser}
                          href="#"
                        >
                          Add user
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-shopping">
                  <thead>
                    <tr>
                      <th className="text-center" />
                      <th>User</th>
                      <th className="th-description">Job position</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map((user, i) => {
                      return (
                        <UserItem key={i} editUser={this.editUser} {...user} />
                      );
                    })}
                    <tr>
                      <td colSpan="3" />
                      <td className="pull-right">
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i
                                  className="fa fa-angle-double-left"
                                  aria-hidden="true"
                                />
                              </span>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3<div className="ripple-container" />
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#link"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i
                                  className="fa fa-angle-double-right"
                                  aria-hidden="true"
                                />
                              </span>
                              <div className="ripple-container" />
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>*/
}
