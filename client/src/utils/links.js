import { FaChartBar } from "react-icons/fa"
import { MdQueryStats } from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import { ImProfile } from "react-icons/im"

export const links = [
    {
        id: 1, text: 'stats', path: "/", icon: <FaChartBar />

    },
    {
        id: 2, text: 'all jobs ', path: "all-jobs", icon:
            <MdQueryStats />

    },
    {
        id: 3, text: 'add job', path: "add-job", icon:
            <FaWpforms />

    },
    {
        id: 4, text: 'profile', path: "profile", icon:
            <ImProfile />

    },
]