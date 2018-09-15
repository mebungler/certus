import React from "react";
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const withHeader = (WrappedComponent) => {
    return (props)=>(
        <div>
            <Sidebar/>
            <div className="main-panel ps-container ps-theme-default ps-active-y"
                 data-ps-id="a03e7bf1-4659-8597-2e58-3e6ba9efcbe4">
                <Navbar/>
                <WrappedComponent {...props}/>
            </div>
        </div>
    )
};
export default withHeader;