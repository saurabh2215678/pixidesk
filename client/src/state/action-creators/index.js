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