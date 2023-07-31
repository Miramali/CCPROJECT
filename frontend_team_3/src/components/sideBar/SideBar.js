import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './sideBar.css'
import { Link, useParams } from 'react-router-dom'

const SideBar = () => {
  const { id } = useParams()
  return (
    <div className='pt-5'>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Link to={`/EditOpp/${id}`} className='color-link text-decoration-none'>edit mentoring opportuiny</Link>
        <Link to="/setting" className='color-link text-decoration-none'>setting</Link>
        <Link to="/terms-and-privacy" className='color-link text-decoration-none'>terms and privacy</Link>
        <Link to="/PostOpp" className='color-link text-decoration-none d-flex justify-content-between align-items-center mt-5'>
          post new opportuiny
          <FontAwesomeIcon icon={faPlus} className='btn p-1' style={{
            marginRight: '60px',
            backgroundColor: '#007580',
            fontSize: '10px',
            color: 'white'
          }} />
        </Link>
      </Nav>

    </div>
  )
}

export default SideBar