import { createContext, useContext, useReducer } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions'
import reducer from './reducer'

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
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

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, useApp }