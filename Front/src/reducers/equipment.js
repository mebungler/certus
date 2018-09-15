const equipmentDefaultState = [];

export default (state = equipmentDefaultState, action) => {
    switch (action.type) {
        case "POPULATE_EQUIPMENTS":
            return [
                ...action.equipments
            ];
        default:
            return state
    }
}