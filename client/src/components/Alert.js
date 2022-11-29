import { useApp } from "../contexts/app-context"

const Alert = () => {
    const { alertType, alertText } = useApp()
    return (
        <div className={`alert alert-${alertType}`} >{alertText} </div>
    )
}

export default Alert