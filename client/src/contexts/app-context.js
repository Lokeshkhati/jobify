import { createContext, useContext, useReducer } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_SUCCESS, SETUP_USER_ERROR, SETUP_USER_BEGIN, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from './actions'
import reducer from './reducer'
import axios from "axios"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token || '',
    userLocation: userLocation || "",
    jobLocation: '',
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", 'part-time', "remote", "internship"],
    jobType: 'full-time',
    statusOptions: ["pending", 'interview', "declined"],
    status: 'pending'
}

const AppContext = createContext()

const useApp = () => useContext(AppContext)

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: 'http://localhost:4000/api/v1',
    })
    authFetch.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error)
    })

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }
    const addToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
        localStorage.setItem("location", location)
    }
    const removeFromLocalStorage = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("location")
    }
    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`http://localhost:4000/api/v1/auth/${endPoint}`, currentUser, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const { user, token, location } = data
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } })

            addToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.put('/auth/updateUser', currentUser)

            const { user, location, token } = data
            dispatch({
                type: UPDATE_USER_SUCCESS, payload: {
                    user, location, token
                }
            })
            addToLocalStorage({ user, token, location })
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
    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, setupUser, logoutUser, updateUser, }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, useApp }