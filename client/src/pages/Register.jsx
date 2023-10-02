import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components'
import { Link, Form, redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration successful')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow tpye='text' name='lastName' textLabel='last name' />
        <FormRow type='email' name='email' />
        <FormRow type='text' name='location' />
        <FormRow type='password' name='password' />
        <SubmitBtn formBtn />
        <p>
          Already a member? <Link to='/login'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
