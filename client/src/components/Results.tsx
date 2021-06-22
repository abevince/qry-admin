import * as React from 'react'
import MultiChoiceResult, { TMultiChoiceResult } from './MultiChoiceResult'
import RankResult, { TRankResult } from './RankResult'
import { API_URL } from '../constants'
import LoadingScreen from './LoadingScreen'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

interface Props {
  questId: number
  schoolId: string
}
interface TSchool {
  id: number
  schoolname: string
  schoolid: string
  program: string
  status: boolean
}
interface TQuestionnaire {
  id: number
  questionnaire: string
  program: string
  for_: string
  status: boolean
  curr_school: string
}

interface TResult {
  questionnaire?: TQuestionnaire
  school?: TSchool
  result: (TMultiChoiceResult | TRankResult | null)[]
}
function fetchResult(questId: number, schoolId: string): Promise<TResult> {
  return fetch(`${API_URL}/results/${questId}/${schoolId}`)
    .then((res) => res.json())
    .catch((error) => error)
}
function Results({ questId, schoolId }: Props) {
  const { isLoading, data, error } = useQuery<TResult>(
    ['result', questId, schoolId],
    () => fetchResult(questId, schoolId),
  )

  if (isLoading) {
    return <LoadingScreen />
  }
  if (error) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No data available
      </div>
    )
  }
  if (!data) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No data available
      </div>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center">
      <div className="fixed bg-gray-200 w-full pt-4 p-2 md:w-2/3">
        <h1 className="text-2xl font-medium text-gray-800 flex flex-col">
          {data.school?.schoolname}
          <span className="text-base font-light">{data.school?.schoolid}</span>
        </h1>
        <p className="text-gray-700 mt-2">
          {data.questionnaire?.questionnaire}
        </p>
        <Link
          to={`/schools/${questId}`}
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
      <ul className="w-full p-2 md:w-2/3 space-y-4 mt-28">
        {data?.result.map((item) => {
          if (item?.type_id === 3 || item?.type_id === 4) {
            return (
              <MultiChoiceResult
                key={item.question_id}
                data={item as TMultiChoiceResult}
              />
            )
          } else if (item?.type_id === 6) {
            return (
              <RankResult key={item?.question_id} data={item as TRankResult} />
            )
          } else if (!item) {
            return null
          }
        })}
      </ul>
    </div>
  )
}

export default Results
