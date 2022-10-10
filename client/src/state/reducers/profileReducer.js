const reducer = (state = {}, action) => {
    switch (action.type) {
        case "uploadProfilePicture":
            return {...state, "updating" : true, "profile_pic_upload_progress" : action.payload};
        case "updatingProfile":
            return {...state, "updating" : true, "updating_status" : action.payload};
        case "updatedProfile":
            return {...state, "updating" : false, "updating_status" : action.payload};
        default:
            return state;
    }
}

export default reducer;