import Wrapper from "../assets/wrappers/Sidebar"
import { useApp } from "../contexts/app-context"
import Logo from "./Logo"
import NavLinks from "./NavLinks"

const Sidebar = () => {
    const { showSidebar } = useApp()
    return (
        <Wrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
                }
            >
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}
export default Sidebar