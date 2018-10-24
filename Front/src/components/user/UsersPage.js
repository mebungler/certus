import React from "react";
import UsersList from "./UsersList";
import Sidebar from "../header/Sidebar";

class UsersPage extends React.Component {
    render() {
        return (
            <div>
                <Sidebar/>
                <div className="main-panel ps-container ps-theme-default">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <UsersList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersPage;