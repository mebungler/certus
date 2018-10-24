
export default (users, {text='', sortBy, userType}) => {
    return users.filter((item) => {
        //TODO:UserType filter does not work
        const textMatch = item.firstName.toLowerCase().includes(text.toLowerCase()) || item.lastName.toLowerCase().includes(text.toLowerCase());
        const userTypeMatch = item.type === userType;
        return textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'priority')
            return a.priority < b.priority ? 1 : -1;
        else
            return a.firstName < b.firstName ? 1 : -1;
    });
}