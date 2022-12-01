import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo } from "../components"
import Alert from "../components/Alert"
import FormRow from "../components/FormRow"
import { useApp } from "../contexts/app-context"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, setupUser } = useApp()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }

    if (isMember) {
      setupUser({ currentUser, endPoint: "login", alertText: "Login Successful! Redirecting..." })

    }
    else {
      setupUser({ currentUser, endPoint: "register", alertText: "User Created! Redirecting..." })
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {!values.isMember && (<FormRow type="text" name="name" value={values.name}
          handleChange={handleChange}
        />)}
        <FormRow type="email" name="email" value={values.email}
          handleChange={handleChange}
        />
        <FormRow type="password" name="password" value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}> {values.isMember ? "Login" : "Register"}</button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}

          <button type="button" className="member-btn" onClick={toggleMember} >

            {values.isMember ? "Register" : "Login"}
          </button>
        </p>

      </form>


    </Wrapper>
  )
}

export default Register