import {combineReducers} from "redux";
import accountReducer from "./accountReducer";
import sidebarReducer from "./sidebarReducer";
const reducres = combineReducers({
    account: accountReducer,
    sidebarOpened: sidebarReducer
});
export default reducres;