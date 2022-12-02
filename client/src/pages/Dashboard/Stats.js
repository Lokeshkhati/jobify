import { useEffect } from "react"
import { Loading, StatsList } from "../../components"
import Charts from "../../components"
import { useApp } from "../../contexts/app-context"

const Stats = () => {

  const { showStats, isLoading, monthlyApplications } = useApp()

  useEffect(() => {
    showStats()
  }, [])b

  isLoading && <Loading />

  return (
    <>

      <StatsList />
      {monthlyApplications.length > 0 && <Charts />}
    </>
  )
}
export default Stats