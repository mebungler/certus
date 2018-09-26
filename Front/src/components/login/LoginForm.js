import React from "react";
import api from "../../api/api";
import {connect} from 'react-redux'
import {UserLoggedIn} from "../../actions/users";
import {NotificationMessage} from "../messages/Messages";
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    };
    onChange = event => this.setState({
        data: {...this.state.data, [event.target.name]: event.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            api.user.login(this.state.data).then((res) => {
                //Catching error
                if (Object.keys(res.data.errors).length!==0) {
                    this.setState({...this.state, ...res.data});
                    return;
                }
                this.props.dispatch(UserLoggedIn(res.data.user));
                console.log(res.data.user);
                //Redirecting to user's own page
                switch (res.data.user.type) {
                    case 1:
                        break;
                    case 2:
                        this.props.history.push("/operation");
                        break;
                    case 3:
                        break;
                    default:
                        this.props.history.push('/users');
                        break;
                }
            });
        }
    };
    validate = (data) => {
        const errors = {};
        if (!data.email) errors.email = "Can't be blank!";
        if (!data.password) errors.password = "Can't be blank!";
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <div className="wrapper wrapper-full-page" style={{
                backgroundImage: "url('./assets/img/login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "top center"
            }}>
                <div className="container">
                    {errors.global &&
                    <NotificationMessage header="Ooops we run into problem!" message={errors.global}/>}
                    <div className="page-header login-page header-filter">
                        <div className="container">
                            <div className="col-lg-4 col-md-6 col-sm-6 ml-auto mr-auto">
                                <form className="form">
                                    <div className="card card-login">
                                        <div className="card-header card-header-rose text-center">
                                            <h4 className="card-title">Login</h4>
                                            <div className="social-line">
                                                Here could be logo or social links
                                            </div>
                                        </div>
                                        <div className="card-body ">
                                            <p className="card-description text-center">Into magical Certus Admin</p>
                                            <span className="bmd-form-group">
                                              <div className="input-group">
                                                <div className="input-group-prepend">
                                                  <span className="input-group-text">
                                                    <i className="fa fa-user"/>
                                                  </span>
                                                </div>
                                                <input
                                                    onChange={this.onChange}
                                                    className="form-control"
                                                    placeholder="Email or username"
                                                    name="email"
                                                    type="email"/>
                                              </div>
                                            </span>
                                            {errors.email &&
                                            <div className="tim-typo">
                                                <span className="fa fa-times text-danger tim-note"/>
                                                <p className="text-danger">{errors.email}</p>
                                            </div>
                                            }
                                            <span className="bmd-form-group">
                                              <div className="input-group">
                                                <div className="input-group-prepend">
                                                  <span className="input-group-text">
                                                    <i className="fa fa-lock"/>
                                                  </span>
                                                </div>
                                                <input
                                                    name="password"
                                                    onChange={this.onChange}
                                                    className="form-control"
                                                    placeholder="Password..."
                                                    type="password"/>
                                              </div>
                                            </span>
                                            {errors.password &&
                                            <div className="tim-typo">
                                                <span className="fa fa-times text-danger tim-note"/>
                                                <p className="text-danger">{errors.password}</p>
                                            </div>
                                            }
                                        </div>
                                        <div className="card-footer justify-content-center">
                                            <a onClick={this.onSubmit} className="btn btn-rose btn-link btn-lg">Lets
                                                Go</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null)(LoginForm)) ;
