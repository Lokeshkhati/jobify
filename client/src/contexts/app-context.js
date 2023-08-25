import { createContext, useContext, useEffect, useReducer } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, SET_EDIT_JOB, CHANGE_PAGE, DELETE_JOB_ERROR, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, TOGGLE_SIDEBAR } from './actions'
import reducer from './reducer'
import axios from "axios"

const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: '',
    userLocation: "",
    jobLocation: '',
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", 'part-time', "remote", "internship"],
    jobType: 'full-time',
    statusOptions: ["pending", 'interview', "declined"],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    showSidebar: false
}

const AppContext = createContext()

const useApp = () => useContext(AppContext)

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: 'api/v1',
    })

    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error)
    })

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`api/v1/auth/${endPoint}`, currentUser)
            console.log(data.token)
            const { user, location, token } = data
            // const { name, email, lastName, } = user
            // const userData = { name, email, lastName }

            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } })

        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response?.data.msg }
            })
        }
        clearAlert()
    }
    const logoutUser = async () => {
        // await authFetch.get('/auth/logout');
        dispatch({ type: LOGOUT_USER })
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.put('/auth/updateUser', currentUser)

            const { user, location, } = data
            dispatch({
                type: UPDATE_USER_SUCCESS, payload: {
                    user, location,
                }
            })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR, payload: {
                        msg: error.response.data.msg
                    }
                })
            }
        }
        clearAlert()
    }
    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    };
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    };
    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }
    const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = state
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

        if (search) {
            url = url + `&search=${search}`
        }

        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { jobs, totalJobs, numOfPages } = data
            console.log(jobs, 'job from context')
            dispatch({
                type: GET_JOBS_SUCCESS, payload: {
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }
    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } });
    }
    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    }
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });

        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.put(`/jobs/${state.editJob}`, {
                position,
                company,
                jobLocation,
                jobType,
                status
            })

            dispatch({ type: EDIT_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })

        }
        clearAlert()
    }
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch('/jobs/stats')
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                },
            })
        } catch (error) {
            logoutUser()
        }

        clearAlert()
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }
    const getCurrentUser = async () => {
        dispatch({ type: GET_CURRENT_USER_BEGIN });
        try {
            const { data } = await authFetch('/auth/getCurrentUser');
            const { user, location } = data;

            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: { user, location },
            });
        } catch (error) {
            if (error.response.status === 401) return;
            logoutUser();
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, []);
    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, setupUser, logoutUser, updateUser, handleChange, clearValues, createJob, editJob, getJobs, setEditJob, deleteJob, showStats, clearFilters, changePage, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    )
}
export { AppProvider, initialState, useApp }


