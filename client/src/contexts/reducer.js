import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from "./actions"

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: "danger",
                alertText: "Please provide all values!"
            }
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: "",
                alertText: ""
            }
        case SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case SETUP_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: action.payload.alertText
            }
        case SETUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg

            }
        case UPDATE_USER_BEGIN:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "User profile updated!"
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg

            }
        case LOGOUT_USER:
            return {

            }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer