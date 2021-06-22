import * as React from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { API_URL } from '../constants'
interface TUser {
  id: number
  token: string
  user_type: number
  name: string
  schoolid: string
  quest_id: number
}
interface TParams {
  questId: string
  schoolId: string
}

function fetchRespondents(questId: number, schoolId: string): Promise<TUser[]> {
  return fetch(`${API_URL}/respondents/${questId}/${schoolId}`)
    .then((res) => res.json())
    .catch((error) => error)
}

const RespondentsPage = () => {
  const params = useParams<TParams>()
  const location = useLocation()
  const { schoolName } = location.state as { schoolName: string }

  const { isLoading, data, error } = useQuery<TUser[]>(
    ['respondents', params.questId, params.schoolId],
    () => fetchRespondents(parseInt(params.questId), params.schoolId),
  )

  if (!params.questId || !params.schoolId) {
    return <div>404</div>
  }
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
    <div className="bg-gray-200 min-h-screen w-full flex justify-center">
      <div className="fixed bg-gray-200 w-full pt-4 p-2 md:w-2/3">
        <h1 className="text-xl font-medium text-gray-700">Respondents</h1>
        <h3 className="text-2xl font-medium text-gray-800 flex flex-col">
          <span className="text-base font-light">{schoolName}</span>
        </h3>
        <p className="text-gray-700 mt-2">
          {`${data.length} ${
            parseInt(params.questId) === 6 ? 'Students' : 'Teachers'
          } answered the questionnaire`}
        </p>
        <Link
          to={`/schools/${parseInt(params.questId)}`}
          className="absolute right-4 top-4 rounded-full bg-red-500 text-gray-100 px-2 py-2 text-sm hover:bg-red-600 active:bg-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      <ul className="w-full p-2 md:w-2/3 space-y-2 mt-28">
        {data.map((user) => (
          <li className="block bg-white rounded-lg py-2 px-2 text-lg">
            <span className="text-gray-700 font-medium">{user.name}</span>
            <span className="pl-2 text-gray-500"> {user.token}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default RespondentsPage
