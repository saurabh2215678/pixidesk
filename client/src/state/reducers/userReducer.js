import {User} from "../../models/userModel"
const user = new User();


const reducer = (state = user, action) => {
    switch (action.type) {
        case "createUser":
            return action.payload;
        case "updateUser":
            return {...state, ...action.payload};
        case "deleteUser":
            return {};
        default:
            return state;
    }
}

export default reducer;