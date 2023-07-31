import React from 'react'
import logo from '../../assets/images/logo.png'
import './style.css'


const Logo = ({style}) => {
    return (
        <img src={logo} alt="" className="logo" style={style}/>
    )
}

export default Logo
