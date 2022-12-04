import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/app-context";
import Loading from "./Loading";

function RequiresAuth({ children }) {
    const { user, userLoading } = useApp();


    // if (userLoading) return <Loading />

    return user ? (
        <> {children}</>
    ) : (
        <Navigate to="/landing" />
    );
}

export default RequiresAuth;
