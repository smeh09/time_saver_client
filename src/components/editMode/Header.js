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
            <Link className='nav-link' to='/about'>About</Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' to='/authenticate?type=sign_up'>Sign up</Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' to='/authenticate?type=sign_in'>Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}