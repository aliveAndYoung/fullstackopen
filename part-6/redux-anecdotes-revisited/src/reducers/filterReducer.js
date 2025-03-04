const filterReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload;
        default:
            return state;
    }
};
const filterActionCreator = (filter) => {
    return {
        type: "SET_FILTER",
        payload: filter,
    };
};
export { filterReducer, filterActionCreator };
