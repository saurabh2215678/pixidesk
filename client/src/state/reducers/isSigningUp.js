const reducer = (state = false, action) => {
    switch (action.type) {
        case "signingUp":
            return true;
        case "signedUp":
            return false;
        default:
            return state;
    }
}

export default reducer;