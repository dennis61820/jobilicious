import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container-page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            tempore vero nulla perferendis sunt maxime nam magnam porro dolore
            officiis, tenetur, magni animi! Amet, consequatur.
          </p>
          <Link to='/register' className='btn register-link'>
            register
          </Link>
          <Link to='/login' className='btn'>
            login / demo
          </Link>
        </div>
        <img src={main} alt='main img' className='main-img img' />
      </div>
    </Wrapper>
  )
}

export default Landing
