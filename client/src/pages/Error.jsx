import img from '../assets/images/not-found.svg'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h1>page not found</h1>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <div>
      <h1>Danger Will Robinson! Danger!</h1>
      <Link to='/'>back to safety</Link>
    </div>
  )
}

export default Error
