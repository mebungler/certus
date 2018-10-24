import React from "react";

class Modal extends React.Component {
    state = {
        selectedTabMargin: "0%",
        selectedTabName: this.props.tabs[0],
        selectedTab: 0,
        modalType: "add",
        errors: {},
    };
    toggleNextTab = () => {
        let nexTab = this.state.selectedTab;
        if (++nexTab >= this.props.tabs.length) {
            nexTab = 0;
        }
        this.toggleTabs(nexTab);
    };
    togglePreviousTab = () => {
        let previous = this.state.selectedTab;
        if (--previous < 0) {
            previous = 0;
        }
        this.toggleTabs(previous);
    };
    toggleTabClasses = name => {
        if (name === this.state.selectedTabName) {
            return "tab-pane active show";
        } else {
            return "tab-pane";
        }
    };
    toggleTabs = index => {
        const tabsCount = this.props.items.length;
        this.setState({
            ...this.state,
            selectedTabMargin: index * (100 / tabsCount).toString() + "%",
            selectedTabName: this.props.tabs[index],
            selectedTab: index
        });
    };

    render() {
        const {visibility, header, description} = this.props;
        const tabsCount = this.props.items.length;
        return (
            <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                style={{display: visibility, padding: "17px", marginLeft: "20%", overflowY: "scroll"}}
            >
                <div className="col-md-8 col-12 mr-auto ml-auto">
                    <div className="wizard-container">
                        <div
                            className="card card-wizard active"
                            data-color="rose"
                            id="wizardProfile"
                        >
                            <form action="" method="" noValidate="novalidate">
                                <div className="card-header">
                                    <div className="card-title text-center">
                                        <h3 className="pull-right text-right">
                                            <a
                                                href="#"
                                                onClick={this.props.closeModal}
                                                className="fa fa-times"
                                            />
                                        </h3>
                                        <h3>{header}</h3>
                                    </div>
                                    {description && (
                                        <h5 className="card-description text-center">
                                            {description}
                                        </h5>
                                    )}
                                </div>
                                <div className="wizard-navigation">
                                    <ul className="nav nav-pills">
                                        {this.props.tabs.map((item, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="nav-item"
                                                    style={{width: (100 / tabsCount).toString() + "%"}}
                                                >
                                                    <a
                                                        className="nav-link active"
                                                        onClick={() => {
                                                            this.toggleTabs(index);
                                                        }}
                                                        href={"#" + item}
                                                        data-toggle="tab"
                                                        role="tab"
                                                    >
                                                        {item}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div
                                        className="moving-tab"
                                        style={{
                                            //width:103%
                                            width: (103 / tabsCount).toString() + "%",
                                            marginLeft: this.state.selectedTabMargin,
                                            transform: "translate3d(-8px, 0px, 0px)",
                                            transition: "transform 0s ease 0"
                                        }}
                                    >
                                        {this.state.selectedTabName}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content">
                                        {this.props.items.map((Item, index) => {
                                            const tabName = this.props.tabs[index];
                                            return (
                                                <div
                                                    className={this.toggleTabClasses(tabName)}
                                                    id={tabName}
                                                    key={index}
                                                >
                                                    <Item content={this.props.item}/>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="mr-auto">
                                        <input
                                            className="btn btn-previous btn-fill btn-rose btn-wd"
                                            name="previous"
                                            value="Предыдущий"
                                            type="button"
                                            style={{
                                                display: this.state.selectedTab > 0 ? "block" : "none"
                                            }}
                                            onClick={this.togglePreviousTab}
                                        />
                                    </div>
                                    <div className="ml-auto">
                                        <input
                                            className="btn btn-next btn-fill btn-rose btn-wd"
                                            name="next"
                                            value="Дальше"
                                            type="button"
                                            style={{
                                                display:
                                                    this.state.selectedTab < this.props.tabs.length - 1
                                                        ? "block"
                                                        : "none"
                                            }}
                                            onClick={this.toggleNextTab}
                                        />
                                        <input
                                            className="btn btn-finish btn-fill btn-rose btn-wd"
                                            name="finish"
                                            value="Добавить"
                                            style={{
                                                display:
                                                    this.state.selectedTab == this.props.tabs.length - 1
                                                        ? "block"
                                                        : "none"
                                            }}
                                            onClick={() => this.props.addObject()}
                                            type="button"
                                        />
                                    </div>
                                    <div className="clearfix"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
