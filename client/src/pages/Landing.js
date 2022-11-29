// import main from "../assets/images/job-hunt.svg"
import { Link } from "react-router-dom"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo } from "../components"
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
                <div>
                    <button>Dark</button>
                </div>
            </nav>

            <div className="container page">
                <div className="info">
                    <h1>Job  <span>tracking</span> app </h1>
                    <p>
                        It removes the mapping between components and styles. This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it.
                    </p>
                    <Link to="/register" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>

                <img src={main} alt="job-hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}



export default Landing