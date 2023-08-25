import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar"
import { useApp } from "../contexts/app-context";
import Logo from "./Logo";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const { user, toggleSidebar, logoutUser } = useApp()
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>

                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    {showLogout && <div >
                        <button type='button' style={{ position: 'absolute' }} onClick={logoutUser}>
                            logout
                        </button>
                    </div>}
                </div>
            </div>
        </Wrapper>
    )
}
export default Navbar