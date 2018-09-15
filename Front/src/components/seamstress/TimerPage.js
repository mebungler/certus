import React from 'react'
import {connect} from 'react-redux'
import api from "../../api/api";
import uuid from 'uuid';

class TimerPage extends React.Component {
    state = {
        minutes: '00',
        seconds: '00',
        status: 'Start'
    };
    handleButton = () => {
        let interval = 0;
        if (this.state.status === 'Start') {
            this.setState({
                ...this.state,
                status: "Complete"
            });
            setInterval(() => {
                interval++;
                let temps = interval % 60;
                let tempm = Math.floor(interval / 60);
                let sec = temps < 10 ? "0" + temps : temps;
                let min = tempm < 10 ? "0" + tempm : tempm;
                this.setState({
                    ...this.state,
                    seconds: sec,
                    minutes: min
                })
            }, 1000)
        } else {
            let i=parseInt(this.state.minutes*60+this.state.seconds);
            api.seamstress.addOperation({id: uuid(), time_span: i, product_id: this.props.product.ID}).then();
        }
    };

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="col-md-8 col-12 mr-auto ml-auto">
                        <div className="card">
                            <div className="card-header card-header-icon card-header-rose">
                                <div className="card-icon">
                                    <i style={{
                                        fontSize: '80px',
                                        width: '80px',
                                        height: '80px',
                                        lineHeight: '80px'
                                    }} className="material-icons">timer</i>
                                </div>
                                <h1 className="card-title">Timer</h1>
                                <p className="card-category">How much time does it take to complete the task</p>
                            </div>
                            <div className="card-body">
                                <span className="text-center">
                                    <h1 style={{fontSize: '120px'}}>{this.state.minutes} : {this.state.seconds}</h1>
                                    <div>
                                        <button onClick={this.handleButton}
                                                className="btn btn-success">{this.state.status}</button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.seamstress.product);
    return {
        product: state.seamstress.product
    }
}

export default connect(mapStateToProps)(TimerPage);