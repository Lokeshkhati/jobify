import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { Navbar, Sidebar, SmallSidebar } from "../../components"

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <Sidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}
export default SharedLayout