import customFetch from '../utils/customFetch'
import { Link, Form, redirect, useNavigate } from 'react-router-dom'
import { Logo, FormRow, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/auth/login', data)
      queryClient.invalidateQueries()
      toast.success('login successful')
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const Login = () => {
  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('enjoy the demo')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h1>Login</h1>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn formBtn />
        <button className='btn btn-block' type='button' onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
