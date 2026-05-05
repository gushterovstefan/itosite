import { useParams } from 'react-router-dom'
import { IndustryDetail } from './Industries.jsx'

export default function IndustryRoute() {
  const { slug } = useParams()
  return <IndustryDetail slug={slug} />
}
