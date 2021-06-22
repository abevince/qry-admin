import * as React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { API_URL } from '../constants'
import { useAuth } from '../context/authContext'

interface TQuestionnaire {
  id: number
  questionnaire: string
  program: string
  for_: string
  status: boolean
  curr_school: string
}
function fetchQuestionnaire(): Promise<TQuestionnaire[]> {
  return fetch(`${API_URL}/questionnaires`)
    .then((res) => res.json())
    .catch((error) => error)
}
const HomePage = () => {
  const { logout } = useAuth()
  const { isLoading, data, error } = useQuery<TQuestionnaire[]>(
    'questionnaires',
    fetchQuestionnaire,
  )

  if (isLoading) {
    return <LoadingScreen />
  }
  if (error || !data) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No questionnaire available
      </div>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center pt-8">
      <div className=" w-full p-2 md:w-2/3 ">
        <div className="w-full flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/aralinks/image/upload/v1623233006/aralinks-logo_rt6b1u.svg"
            alt="Aralinks logo"
            className="w-14 mb-2"
          />
          <button
            onClick={() => logout()}
            className="text-yellow-900 font-medium px-4 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
          >
            Logout
          </button>
        </div>
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id}>
              <Link
                to={`/schools/${item.id}`}
                className="block bg-white py-4 px-5 rounded-t-lg hover:bg-gray-100"
              >
                <p className="text-sm font-medium text-yellow-600 opacity-80">
                  {item.program}
                </p>
                <p className="text-lg text-gray-700 font-medium tracking-wide">
                  {item.questionnaire}
                </p>
              </Link>
              <div className="text-sm font-medium text-gray-700 bg-gray-400 py-1 px-5 rounded-b-lg hover:bg-gray-600 hover:text-white">
                <a
                  href={`${API_URL}/results/csv/${item.id}`}
                  download
                  target="_blank"
                >
                  Download CSV
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
