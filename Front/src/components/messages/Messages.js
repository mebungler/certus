import React from "react";

export const InlineError = ({text}) => <span style={{color: "#ae5856"}}> {text} </span>;

export class NotificationMessage extends React.Component{
    state = {
        className:"col-xs-11 col-sm-4 alert alert-rose alert-with-icon animated fadeInDown"
    };
    render() {
        setTimeout(() => {
            this.setState({className : "col-xs-11 col-sm-4 alert alert-rose alert-with-icon animated fadeInDown fadeOutUp"});
        }, 3000);
        const {header,message}=this.props;
        return (
            <div data-notify="container" className={this.state.className}
                 role="alert" data-notify-position="top-center"
                 style={{
                     display: "inline-block",
                     margin: "15px auto",
                     position: "fixed",
                     transition: "all 0.5s ease-in-out 0s",
                     zIndex: "1031",
                     top: "20px", left: "0px",
                     right: "0px"
                 }}>
                <button
                    type="button"
                    aria-hidden="true"
                    className="close"
                    data-notify="dismiss"
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        marginTop: "-9px",
                        zIndex: 1033
                    }}>
                    <i className="material-icons">close</i></button>
                <i data-notify="icon" className="material-icons">notification_important</i><span data-notify="title"/>
                <span data-notify="message">
                <b>{header}</b>
                <br/>
                    {message}</span>
                <a href="#" target="_blank" data-notify="url"/></div>
        );
    }

};


