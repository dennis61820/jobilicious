import { useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Loader, Navbar, SmallSidebar } from '../components'
import { useState, createContext, useContext } from 'react'
import customFetch from '../utils/customFetch'

const DashboardContext = createContext()

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setISDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setISDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }
  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out....')
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleShowSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isLoading ? <Loader /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
