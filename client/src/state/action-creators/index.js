export const closeSidebar = () =>{
    return (dispatch) => {
        dispatch({
            type: "close"
        })
    }
}

export const openSidebar = () =>{
    return (dispatch) => {
        dispatch({
            type: "open"
        })
    }
}

export const toggleSidebar = () =>{
    return (dispatch) => {
        dispatch({
            type: "toggle"
        })
    }
}

export const createUser = (user) =>{
    return (dispatch) => {
        dispatch({
            type: "createUser",
            payload: user
        })
    }
}

export const updateUser = (user) =>{
    return (dispatch) => {
        dispatch({
            type: "updateUser",
            payload: user
        })
    }
}

export const deleteUser = (user) =>{
    return (dispatch) => {
        dispatch({
            type: "deteteUser",
            payload: user
        })
    }
}

export const signingUp = () =>{
    return (dispatch) => {
        dispatch({
            type: "signingUp"
        })
    }
}

export const signedUp = () =>{
    return (dispatch) => {
        dispatch({
            type: "signedUp"
        })
    }
}

export const uploadProfilePicture = (progress) =>{
    return (dispatch) => {
        dispatch({
            type: "uploadProfilePicture",
            payload: progress
        })
    }
}
export const updatingProfile = (status) =>{
    return (dispatch) => {
        dispatch({
            type: "updatingProfile",
            payload : status
        })
    }
}
export const updatedProfile = (status) =>{
    return (dispatch) => {
        dispatch({
            type: "updatedProfile",
            payload : status
        })
    }
}
// ************************
export const depositMoney = (amount) =>{
    return (dispatch) => {
        dispatch({
            type: "deposit",
            payload: amount
        })
    }
}

export const withdrawMoney = (amount) =>{
    return (dispatch) => {
        dispatch({
            type: "withdraw",
            payload: amount
        })
    }
}