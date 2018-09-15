import React from "react";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div
                className="sidebar"
                data-color="rose"
                data-background-color="black"
                data-image="../assets/img/sidebar-1.jpg"
            >
                <div className="logo">
                    <a href="http://www.certus.uz" className="simple-text logo-mini">
                        <span className="material-icons">sentiment_satisfied</span>
                    </a>
                    <a href="http://www.certus.uz" className="simple-text logo-normal">
                        Certus Admin
                    </a>
                </div>
                <div
                    className="sidebar-wrapper ps-container ps-theme-default"
                    data-ps-id="33395484-a89d-1bd2-a96c-a7a11edba82e"
                >
                    <div className="user">
                        <div className="photo">
                            <img src="./assets/img/faces/marc.jpg"/>
                        </div>
                        <div className="user-info">
                            <a
                                data-toggle="collapse"
                                href="#collapseExample"
                                className="username"
                            >
                                <span>Akmal Salikhoff</span>
                            </a>
                            {/*<div className="collapse" id="collapseExample">*/}
                            {/*<ul className="nav">*/}
                            {/*<li className="nav-item">*/}
                            {/*<a className="nav-link" href="#">*/}
                            {/*<span className="sidebar-mini"> MP </span>*/}
                            {/*<span className="sidebar-normal"> My Profile </span>*/}
                            {/*</a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                            {/*<a className="nav-link" href="#">*/}
                            {/*<span className="sidebar-mini"> EP </span>*/}
                            {/*<span className="sidebar-normal"> Edit Profile </span>*/}
                            {/*</a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                            {/*<a className="nav-link" href="#">*/}
                            {/*<span className="sidebar-mini"> S </span>*/}
                            {/*<span className="sidebar-normal"> Settings </span>*/}
                            {/*</a>*/}
                            {/*</li>*/}
                            {/*</ul>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <ul className="nav">
                        <li className="nav-item active-pro">
                            <a className="nav-link" href="#">
                                <i className="material-icons">settings</i>
                                <p>Закази</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a
                                className="nav-link"
                                data-toggle="collapse"
                                href="#tablesExamples"
                            >
                                <i className="material-icons">grid_on</i>
                                <p>
                                    {" "}
                                    Ввод данниых
                                    <b className="caret"/>
                                </p>
                            </a>
                            <div className="collapse" id="tablesExamples">
                                <ul className="nav">
                                    <li>
                                        <NavLink
                                            activeClassName=" active"
                                            className="nav-link nav-item"
                                            to="/users"
                                        >
                      <span className="sidebar-mini">
                        {" "}
                          <p className="fa fa-user"/>{" "}
                      </span>
                                            <span className="sidebar-normal"> Сотрудники </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/operations"
                                            className="nav-link nav-item"
                                            href="../examples/tables/extended.html"
                                        >
                      <span className="sidebar-mini">
                        {" "}
                          <p className="fa fa-tasks"/>{" "}
                      </span>
                                            <span className="sidebar-normal"> Операции </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/equipments"
                                            className="nav-link nav-item"
                                            href="../examples/tables/extended.html"
                                        >
                      <span className="sidebar-mini">
                        {" "}
                          <p className="fa fa-cogs"/>{" "}
                      </span>
                                            <span className="sidebar-normal"> Оборудование </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item active-pro">
                            <a className="nav-link" href="#">
                                <i className="material-icons">settings</i>
                                <p>Статистика</p>
                            </a>
                        </li>
                        <li className="nav-item active-pro">
                            <a className="nav-link" href="#">
                                <i className="material-icons">settings</i>
                                <p>Настройки</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="material-icons">exit_to_app</i>
                                <p>Выход</p>
                            </a>
                        </li>
                    </ul>
                    {/*<div className="ps-scrollbar-x-rail" style={{left: '0px', bottom: '0px'}}>*/}
                    {/*<div className="ps-scrollbar-x" tabIndex="0" style={{left: '0px', width: '0px'}}/>*/}
                    {/*</div>*/}
                    {/*<div className="ps-scrollbar-y-rail" style={{top: '0px', height: '211px', right: '0px'}}>*/}
                    {/*<div className="ps-scrollbar-y" tabIndex="0" style={{top: '0px', height: '76px'}}/>*/}
                    {/*</div>*/}
                </div>
                <div
                    className="sidebar-background"
                    style={{backgroundImage: "url(./assets/img/sidebar-4.jpg)"}}
                />
            </div>
        </div>
    );
};

export default Sidebar;
