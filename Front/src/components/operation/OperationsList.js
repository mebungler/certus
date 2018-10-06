import React from 'react';
import {connect} from 'react-redux'
import api from "../../api/api";
import {PopulateOperations} from "../../actions/seamstress";
import OperationItem from "./OperationItem";

class OperationsList extends React.Component {
    componentDidMount() {
        api.operation.getOperations().then(res => {
            console.log(res);
            this.props.dispatch(PopulateOperations(res.data.operations));
        }).catch(err => console.log(err));
    }

    render() {
        console.log(this.props);
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-rose card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">assignment</i>

                        </div>
                        <div className="card-title">Operations list
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4"/>
                            <div className="col-md-4">
                                <div className="pull-right text-right">
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="input-group no-border">
                                    <input value="" className="form-control" placeholder="Search..." type="text"/>
                                    <button type="submit" className="btn btn-rose btn-round btn-just-icon">
                                        <i className="material-icons">search</i>
                                        <div className="ripple-container"/>
                                    </button>
                                    <div className="dropdown pull-right">
                                        <button type="submit"
                                                id="moreLink"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                className="btn btn-rose btn-round btn-just-icon">...
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right"
                                             aria-labelledby="moreLink">
                                            <a className="dropdown-item" href="#">Filter</a>
                                            <a className="dropdown-item" href="#">Sort</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-shopping">
                                <thead>
                                <tr>
                                    <th className="text-center"/>
                                    <th>Product</th>
                                    <th className='th-description'>Spent time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.operations.map((user, i) => {
                                    return <OperationItem key={i} {...user}/>
                                })}
                                <tr>
                                    <td colSpan="3"/>
                                    <td className="pull-right">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true"><i className="fa fa-angle-double-left"
                                                                    aria-hidden="true"/></span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">1</a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">2</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">3
                                                    <div className="ripple-container"/>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#link" aria-label="Next">
                                        <span aria-hidden="true"><i className="fa fa-angle-double-right"
                                                                    aria-hidden="true"/></span>
                                                    <div className="ripple-container"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        operations:state.operation.operations
    }
}

export default connect(mapStateToProps)(OperationsList);