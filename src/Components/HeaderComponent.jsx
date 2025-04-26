import React from 'react'
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand navbar-dark bg-dark'>
                <a className='navbar-brand' href='www.google.com'>Employee Managemant System</a>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='/employees'>Employee</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' to='/departments'>Department</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent;