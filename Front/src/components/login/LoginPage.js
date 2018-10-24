import React from "react";
import LoginForm from "./LoginForm"
import {connect} from "react-redux"

class LoginPage extends React.Component {
    render(){
        return(
            <div>
                <LoginForm/>
            </div>
        );
    }

}


export default connect(null)(LoginPage);