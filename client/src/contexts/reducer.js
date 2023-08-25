import {
    CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, DELETE_JOB_BEGIN, DELETE_JOB_ERROR, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, TOGGLE_SIDEBAR
} from "./actions"
import { initialState } from "./app-context"

const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
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
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                token: action.payload.token,
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
                ...initialState,
                userLoading: false,
            }

        case HANDLE_CHANGE:
            return {
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value
            }
        case CLEAR_VALUES:
            return {
                ...state,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending',
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
                jobs: action.payload.jobs,
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
            return {
                ...state,
                isLoading: true
            };
        case DELETE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
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
        case SHOW_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            };
        case SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        case GET_CURRENT_USER_BEGIN:
            return { ...state, userLoading: true, showAlert: false };
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
            };

    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer


