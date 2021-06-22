import * as React from 'react'

interface TInnerResult {
  content: string
  _count: number
}

interface TResult {
  question: string
  result: TInnerResult[]
}
interface TColumns {
  id: number
  question_id: number
  content: string
  value: number
}
export interface TRankResult {
  question_id: number
  question: string
  type_id: number
  position: number
  columns: TColumns[]
  result: TResult[]
}

interface RankResultProps {
  data: TRankResult
}

const RankResult = ({ data }: RankResultProps) => {
  return (
    <li className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
        {data.question}
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50"></thead>
        <thead className="bg-gray-50">
          <tr>
            <th></th>
            {data.columns.map((res) => (
              <th
                key={res.id}
                scope="col"
                className="px-4 py-3 text-left text-xs font-light text-gray-700"
              >
                {res.content}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.result.map((res) => (
            <tr key={res.question} className="bg-white">
              <td className="px-4 py-2 w-1/2 whitespace-pre-wrap text-sm font-medium text-gray-500">
                {res.question}
              </td>
              {res.result.map((count) => (
                <td
                  key={count.content}
                  className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-700"
                >
                  {count._count}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  )
}

export default RankResult
