const defaultAuthState = {
    user: {}
};

export default (state = defaultAuthState, action) => {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return {
                ...action.user
            };
        default :
            return state;
    }
}
