import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      {/* navbar */}

      <Outlet />
    </>
  )
}

export default HomeLayout
