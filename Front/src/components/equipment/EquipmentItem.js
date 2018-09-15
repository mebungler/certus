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
                <td>
                </td>
            </tr>
        )
    }
}