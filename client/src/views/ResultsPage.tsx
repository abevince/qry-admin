import * as React from 'react'
import { useParams } from 'react-router-dom'
import Results from '../components/Results'
interface TParams {
  questId: string
  schoolId: string
}

const ResultPage = () => {
  const params = useParams<TParams>()
  if (!params.questId || !params.schoolId) {
    return <div>404</div>
  }
  return (
    <Results questId={parseInt(params.questId)} schoolId={params?.schoolId} />
  )
}

export default ResultPage
