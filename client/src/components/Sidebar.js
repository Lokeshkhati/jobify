import Wrapper from "../assets/wrappers/Sidebar"
import Logo from "./Logo"
import Logout from "./Logout"
import NavLinks from "./NavLinks"

const Sidebar = () => {
    return (
        <Wrapper>
            <main className="sidebar-container">
                <Logo />
                <NavLinks />
                <Logout />
            </main>
        </Wrapper>
    )
}
export default Sidebar