import {combineReducers, createStore} from "redux";
import usersReducer from '../reducers/users'
import equipmentReducer from '../reducers/equipment'
import seamstressReducer from '../reducers/seamstress'
import filtersReducer from '../reducers/filters'
import userReducer from '../reducers/auth'

export default () => {
    return createStore(
        combineReducers({
            users: usersReducer,
            filters: filtersReducer,
            user: userReducer,
            seamstress:seamstressReducer,
            equipment:equipmentReducer
        })
    );
};