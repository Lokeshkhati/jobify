import Wrapper from "../assets/wrappers/Sidebar"
import Logout from "./Logout"
import NavLinks from "./NavLinks"

const Sidebar = () => {
    return (
        <Wrapper>
            <main className="sidebar-container">
                <NavLinks />
                <Logout />
            </main>

        </Wrapper>
    )
}
export default Sidebar