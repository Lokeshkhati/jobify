import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, DELETE_JOB_BEGIN } from "./actions"

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
        case HANDLE_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case CLEAR_VALUES:
            const initialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending',
            }
            return {
                ...state,
                ...initialState
            }
        case CREATE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true

            }
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "New Job Created! "
            }
        case CREATE_JOB_ERROR:
            return {
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg
            }
        case GET_JOBS_BEGIN:
            return {
                ...state,
                isLoading: false,
                showAlert: false,

            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.totalJobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages

            }
        case SET_EDIT_JOB:
            const job = state.jobs.find((job) => job._id === action.payload.id);
            const { _id, position, company, jobLocation, jobType, status } = job;
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            }
        case DELETE_JOB_BEGIN:
            return { ...state, isLoading: true };

        case EDIT_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            };
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Updated!',
            };
        case EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer

