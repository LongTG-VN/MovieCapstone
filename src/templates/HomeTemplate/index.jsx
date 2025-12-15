import React from 'react'
import NavbarComponent from '../../components/_component/NavbarComponent'
import FooterComponent from '../../components/_component/FooterComponent'
import { Outlet } from 'react-router-dom'

const HomeTemplate = () => {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponent/>
    </>
   
  )
}

export default HomeTemplate