import React from "react";

class SeamstressPage extends React.Component {
    scanClick=()=>{
        this.props.history.push("/scan");
    };
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 ml-auto mr-auto cards">
                        <div className="card card-pricing card-raised">
                            <div className="card-body">
                                <h6 className="card-category">Scan QR code</h6>
                                <div className="card-icon icon-rose">
                                    <img style={{width:'100px',height:'100px'}} src="./assets/img/code.jpg"/>
                                </div>
                                <br/>
                                <p className="card-description">Click button below to begin scanning scan!</p>
                                <a href="#" onClick={this.scanClick} className="btn btn-rose btn-round">Scan</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 ml-auto mr-auto cards">
                        <div className="card card-pricing card-raised">
                            <div className="card-body">
                                <h6 className="card-category">Do nothing</h6>
                                <div className="card-icon icon-rose">
                                    <i className="material-icons">home</i>
                                </div>
                                <a href="#pablo" className="btn btn-rose btn-round">Choose</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SeamstressPage;