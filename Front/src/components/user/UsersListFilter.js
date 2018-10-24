import React from "react";
import {connect} from 'react-redux';
import {setTextFilter} from "../../actions/filters";

const UserListFilter =(props)=>(
    <div>
        <input type='text' value={props.filters.text} onChange={(e)=>{
            props.dispatch(setTextFilter(e.target.value));
        }}/>
    </div>
);

const mapStateToProp=(state)=>{
    return{
        filters:state.filters
    }
};

export default connect(mapStateToProp)(UserListFilter)