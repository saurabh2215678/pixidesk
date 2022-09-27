const reducer = (state = false, action) => {
    switch (action.type) {
        case "open":
            return true;
        case "close":
            return false;
        case "toggle":
            return !state;
        default:
            return state;
    }
}

export default reducer;