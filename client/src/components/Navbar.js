import Wrapper from "../assets/wrappers/Navbar"
import { useApp } from "../contexts/app-context";
import Logo from "./Logo";

const Navbar = () => {
    const { user } = useApp()
    return (
        <Wrapper>
            {/* <Logo /> */}
            <div></div>
            <div className="user-container">
                <p>Hi , {user?.name}</p>
                <button>
                    Logout
                </button>
            </div>
        </Wrapper>
    )
}
export default Navbar