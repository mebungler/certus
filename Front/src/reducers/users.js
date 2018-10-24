//Users


const usersDefaultState = [];

export default (state = usersDefaultState, action) => {
    switch (action.type) {
        case "POPULATE_USERS":
            return [
                ...action.users
            ];
        case "ADD_USER":
            return [
                ...state,
                action.user
            ];
        case "DELETE_USER":
            return state.filter(({id}) => id !== action.id);
        case "EDIT_USER":
            return state.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        ...action.updates
                    };
                } else {
                    return user;
                }
            });
        default:
            return state;
    }
};

