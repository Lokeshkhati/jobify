import { FormRow, FormRowSelect, Alert } from "../../components"
import { useApp } from "../../contexts/app-context"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
const AddJob = () => {
  const { isLoading, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, handleChange, clearValues, createJob, editJob } = useApp()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (event) => {
    const { name, value } = event.target
    handleChange({ name, value })
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>
          {isEditing ? 'edit job' : "add job"}
        </h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow type="text" name="position" value={position}
            handleChange={handleJobInput}
          />
          <FormRow type="text" name="company" value={company}
            handleChange={handleJobInput}
          />
          <FormRow type="text" labelText="location" name="jobLocation" value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type' 
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button className="btn btn-block submit-btn" disabled={isLoading}>Submit</button>
            <button className="btn btn-block clear-btn" onClick={(e) => {
              e.preventDefault()
              clearValues()
            }}>clear</button>
          </div>

        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob