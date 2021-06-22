import * as React from 'react'

interface TResult {
  content: string
  _count: number
}
export interface TMultiChoiceResult {
  question_id: number
  question: string
  type_id: number
  position: number
  result: TResult[]
}
interface MultiChoiceResultProps {
  data: TMultiChoiceResult
}

const MultiChoiceResult = ({ data }: MultiChoiceResultProps) => {
  return (
    <li className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={2}
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider"
            >
              {data.question}
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.result.map((res) => (
            <tr key={res.content} className="bg-white">
              <td className="px-6 py-2 w-9/12 whitespace-nowrap text-sm font-medium text-gray-500">
                {res.content}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-700">
                {res._count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  )
}

export default MultiChoiceResult
