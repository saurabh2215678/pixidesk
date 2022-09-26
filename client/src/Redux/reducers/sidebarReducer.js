import { OPEN_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from '../actions/sidebarActions';


export default function sidebarReducer(state=null, action) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return true;
        case CLOSE_SIDEBAR:
            return false;
        case TOGGLE_SIDEBAR:
            return !state;
        default:
            return state;
    }
}