import { useEffect, useState } from "react"
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
  const [values, setValues] = useState(initialState)
  // global state and useNavigate
  const { isLoading, showAlert, displayAlert } = useApp()

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
    console.log(values)
  }

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

        <button type="submit" className="btn btn-block"> {values.isMember ? "Login" : "Register"}</button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}

          <button type="button" className="member-btn" onClick={toggleMember}>

            {values.isMember ? "Register" : "Login"}
          </button>
        </p>

      </form>


    </Wrapper>
  )
}

export default Register