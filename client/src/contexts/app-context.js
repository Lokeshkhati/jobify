import { createContext, useContext, useReducer } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from './actions'
import reducer from './reducer'
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
    jobLocation: ''
}
const AppContext = createContext()

const useApp = () => useContext(AppContext)

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    

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
    const registerUser = async (currentUser) => {
        console.log(currentUser)
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/register', currentUser, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log(response)
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS, payload: {
                    user, token, location
                }
            })
            addToLocalStorage({ user, token, location })
        } catch (error) {
            console.log(error.response)
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response?.data.msg } })
        }
        clearAlert()
    }


    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, useApp }