import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
  const error = useRouteError()
  console.log(error)
  return <h4>Error....Error....Does not Compute...</h4>
}

export default ErrorElement
