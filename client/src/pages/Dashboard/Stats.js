import { useEffect } from "react"
import { Loading, StatsList, Charts } from "../../components"
import { useApp } from "../../contexts/app-context"

const Stats = () => {

  const { showStats, isLoading, monthlyApplications } = useApp()

  useEffect(() => {
    showStats()
    console.log('lokesh++')
  }, [])

  if (isLoading) return <Loading center />
  return (
    <>

      <StatsList />
      {monthlyApplications.length > 0 && <Charts />}
    </>
  )
}
export default Stats