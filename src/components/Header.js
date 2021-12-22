import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';

export default function Header({ title }) {
  return (
    <header>
      <Link to='/' id='title'>
        {title}
      </Link>
      <nav>
        <ul id='nav-list'>
          <li className='nav-list-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' to='/about'>About</Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' to='/authenticate?type=sign_in'>Sign up/in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}