import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useApp } from "../contexts/app-context";
import Logo from "./Logo";

const Navbar = () => {
    const { user } = useApp()
    return (
        <Wrapper>
            <Logo />
            <div className="user-container">
                <p>Hi , {user}</p>
                <button>
                    Da
                </button>
            </div>
        </Wrapper>
    )
}
export default Navbar