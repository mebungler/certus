import React from 'react';
import QrReader from 'react-qr-reader'
import api from "../../api/api";
import {ProductScanned} from "../../actions/seamstress";
import {connect} from 'react-redux'

class ScanPage extends React.Component {
    state = {
        delay: 300,
    };
    handleScan = (data) => {
        if (data) {
            api.operation.product(data).then(res => {
                console.log(res);
                this.props.dispatch(ProductScanned(res.data.product));
                this.props.history.push("/timer");
            });
        }
    };
    handleError = (err) => {
        console.error(err)
    };

    render() {
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{width: '100%'}}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ScanPage);