import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/app-context";

function RequiresAuth({ children }) {
    const { user } = useApp();

    return user ? (
        children
    ) : (
        <Navigate to="/landing" />
    );
}

export default RequiresAuth;
