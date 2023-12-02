import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authProvider } from '../../Context/AuthContext';

const Navbar = () => {
  const {user, logOut, handleTheme} = useContext(authProvider);

    return (
        <div className='mx-24 mt-5 max-sm:mx-5'>
            <div className="navbar ">
                <div className="navbar-start">
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                      <li><Link to='/'>Home</Link></li>
                      <li><Link to='/available'>Available</Link></li>
                      <li><Link to='/blog'>Blog</Link></li>
                      {
                        user?.uid && <li><Link to='/dashboard'>Dashboard</Link></li>
                      }
                    </ul>
                  </div>
                  <Link to='/'><img className='w-2/4' src="/media/logo.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/available'>Available</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                    {
                        user?.uid && <li><Link to='/dashboard'>Dashboard</Link></li>
                      }
                  </ul>
                  <p className=''><input onClick={handleTheme} type="checkbox" className="toggle" /></p>
                </div>
                <div className="navbar-end">
                  {
                    user?.uid? <Link onClick={logOut} className="btn">Logout</Link>:
                    <Link to='/login' className="btn">Login</Link>
                  }
                  
                </div>
            </div>
        </div>
    );
};

export default Navbar;