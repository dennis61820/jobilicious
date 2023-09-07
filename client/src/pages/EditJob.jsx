import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData, useParams } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader = async ({ params }) => {
  console.log(params.id)
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/dashboard/all-jobs')
  }
}
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success('Job updated')
    // return redirect('/dashboard/all-jobs')
    return null
  } catch (error) {
    toast.error(error?.response?.data.msg)
    return error
  }
}

const editJob = () => {
  const params = useParams()
  console.log(params.id)
  const { job } = useLoaderData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return <Wrapper>Edit Job Page</Wrapper>
}

export default editJob
