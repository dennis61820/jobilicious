import { FaAlignLeft } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'
import ThemeToggle from './ThemeToggle'
import LogoutContainer from './LogoutContainer'

const Navbar = () => {
  const { toggleShowSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='toggle-btn'
          onClick={toggleShowSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
