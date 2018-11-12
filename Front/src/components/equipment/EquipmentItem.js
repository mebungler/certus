import React from 'react';

export default class EquipmentItem extends React.Component {
    render(){
        return(
            <tr>
                <td>
                    <a href="#" onClick={() => this.props.edit(this.props)}>
                        {this.props.name}
                    </a>

                </td>
                <td>
                    <p>{this.props.brand}</p>
                </td>
                <td>
                    {this.props.machineType}
                </td>
                <td>
                    {this.props.machineStatus}
                </td>
                <td style={{display: this.props.actionVisibility}}>
                    <a className="btn btn-just-icon btn-link btn-danger btn-block">
                        <i className="material-icons">delete</i>
                    </a>
                    <a className="btn btn-just-icon btn-link btn-success btn-block">
                        <i className="material-icons">file_copy</i>
                    </a>
                </td>
            </tr>
        )
    }
}