import React from "react";
import Sidebar from "../header/Sidebar";
import List from "../list/List";
import api from "../../api/api";
import PieChart from 'react-minimal-pie-chart';

class FinishedOperationPage extends React.Component {

//var
    state = {
        finishedOperation: {
            user: {},
            order: {},
            model: {},
            data: {},
            time: 0
        },
        data: {},
        finishedOperations: [],
        title:"Готовые Операции"
    };


    //functions

    populateFinishedOperations = () => {
        api.finishedOperation.getAll().then(res => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    finishedOperations: res.data.FinishedOperation
                }
            })
        });
    };

    componentWillMount() {
        this.populateFinishedOperations();
    }

    edit=()=>{

    };

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main-panel ps-container ps-theme-default">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <List
                                    items={this.state.finishedOperations}
                                    title={this.state.title}
                                    itemTemplate={this.FinishedOperationItemTemplate}
                                    header={this.tableHeader}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


//components
    FinishedOperationItemTemplate = (props) => {
        console.log(this.state);
        return (
            <tr>
                <td>
                    <p>{parseInt(props.time / 60)} минут {props.time % 60} секунд</p>
                </td>
                <td>
                    <p>{props.user.firstName}</p>
                </td>
                <td>
                    <PieChart
                        paddingAngle={15}
                        lineWidth={30}
                        style={{height: 60}}
                        data={[
                            {title: 'Interval', value: 10, color: '#6ea1f4'},
                            {title: 'Phone', value: 15, color: '#6df47d'},
                            {title: 'WC-sucker', value: 200, color: '#f2a46d'},
                            {title: 'WC-fucker', value: 10, color: '#f16de9'},
                        ]}
                    />
                </td>
            </tr>
        )
    };

    tableHeader = () => (
        <thead>
        <tr>
            <th>Время</th>
            <th>Пользователь</th>
            <th>Круговая диаграмма</th>
            <th className="text-right">Действия</th>
        </tr>
        </thead>
    );


}

export default FinishedOperationPage;