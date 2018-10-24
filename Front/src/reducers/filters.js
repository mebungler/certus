const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    userType: 0
};

export default (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SORT_BY_NAME':
            return{
                ...state,
                sortBy:'name'
            };
        case 'SORT_BY_PRIORITY':
            return {
                ...state,
                sortBy:'priority'
            };
        case 'SET_USER_TYPE_FILTER':
            return{
                ...state,
                userType:action.userType
            };
        default:
            return state;
    }
}