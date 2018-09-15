import React from 'react'
import Sidebar from "../header/Sidebar";
import OperationsList from "./OperationsList";

class OperationsPages extends React.Component {
    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main-panel ps-container ps-theme-default">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <OperationsList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OperationsPages;