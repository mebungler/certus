import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux'

class NewRoute extends React.Component {
    componentWillMount() {
        this.unlisten = this.props.history.listen(location => {
            this.setState({location});
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const {isAuthenticated, component: Component, ...rest} = this.props;
        return <Route {...rest} render={(props) =>
            isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>}/>
    }
}

function mapStateToProps(state) {
    if (state.user)
        return {
            isAuthenticated: state.user.type === 2
        };
    return {
        isAuthenticated: false
    };
}

export default withRouter(connect(mapStateToProps)(NewRoute));