import { Link, Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"

const SharedLayout = () => {
    return (
        <Wrapper>
            <nav>
                <Link to='all-jobs'>All Jobs</Link>
                <Link to='add-job'>Add Jobs</Link>
            </nav>
            <Outlet />
        </Wrapper>
    )
}
export default SharedLayout