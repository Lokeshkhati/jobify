import { useState } from "react"
import { useApp } from "../../contexts/app-context"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import Alert from "../../components/Alert"
import FormRow from "../../components/FormRow"

const Profile = () => {
  const { user, displayAlert, showAlert, updateUser, isLoading } = useApp()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !email || !location || !lastName) {
      displayAlert()
      return
    }
    updateUser({ name, email, lastName, location })
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} >
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow type="text" name='name' value={name}
            handleChange={(event) => setName(event.target.value)}
          />
          <FormRow type="text" labelText="last name" name='lastName' value={lastName}
            handleChange={(event) => setLastName(event.target.value)}
          />
          <FormRow type="email" name='email' value={email}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <FormRow type="text" name='location' value={location}
            handleChange={(event) => setLocation(event.target.value)}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading} > {isLoading ? "Please wait.." : "Save changes"}</button>

        </div>
      </form>
    </Wrapper>
  )
}
export default Profile