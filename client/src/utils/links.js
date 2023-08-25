import { FaChartBar } from "react-icons/fa"
import { MdQueryStats } from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import { ImProfile } from "react-icons/im"

export const links = [
    {
        id: 2, text: 'all jobs ', path: "/", icon:
            <MdQueryStats />

    },
    {
        id: 1, text: 'stats', path: "stats", icon: <FaChartBar />

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