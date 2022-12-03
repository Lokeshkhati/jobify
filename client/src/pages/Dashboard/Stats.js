import { useEffect } from "react"
import { Loading, StatsList, Charts } from "../../components"
import { useApp } from "../../contexts/app-context"

const Stats = () => {

  const { showStats, isLoading, monthlyApplications } = useApp()

  useEffect(() => {
    showStats()
  }, [])

  isLoading && <Loading />

  return (
    <>
      <StatsList />
      {monthlyApplications.length > 0 && <Charts />}
    </>
  )
}
export default Stats