//TODO:Create Add/Delete/Edit user action generators

export const AddUser = ({
                            firstName = "",
                            lastName = "",
                            type = "0",
                            priority = "0",
                            id = "",
                            createdAt = "",
                            photo = ""
                        } = {}) => ({
    type: 'ADD_USER',
    user: {
        firstName,
        lastName,
        type,
        priority,
        id,
        createdAt,
        photo,
    }
});

export const EditUser = (id, updates) => ({
    type: 'EDIT_USER',
    id,
    updates
});

export const DeleteUser = ({id} = {}) => ({
    type: "DELETE_USER",
    id
});

export const UserLoggedIn = (user) => ({
    type: "USER_LOGGED_IN",
    user: user
});

export const PopulateUsers = users => ({
    type: "POPULATE_USERS",
    users: users
});