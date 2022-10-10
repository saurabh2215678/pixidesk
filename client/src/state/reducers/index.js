import {combineReducers} from "redux";
import sidebarReducer from "./sidebarReducer";
import userReducer from "./userReducer";
import signingUpReducer from "./isSigningUp";
import profileStatus from "./profileReducer";
const reducres = combineReducers({
    sidebarOpened: sidebarReducer,
    user: userReducer,
    isSigningUp: signingUpReducer,
    profileStatus: profileStatus
});
export default reducres;