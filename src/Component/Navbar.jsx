import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router';
import { FaTint } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const handleLogout = () => {
        logout().then(res => console.log(res));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><a>All Request</a></li>
                        <li><a>Search</a></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                </div>


                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <FaTint className="text-red-600 text-2xl animate-pulse" />
                    One <span className="text-red-600">Drop</span> Life
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/allRequest">All Request</Link></li>
                    <li><Link to="/search-request">Search</Link></li>
                    <li><Link to="/donate">Donate</Link></li>
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user&&(<Link to="/dashboard/maindashboard" className="btn btn-active mr-2">
                    Dashboard
                </Link>)
                }

                {
                    user
                        ? <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        : <Link to="/login" className="btn btn-primary">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
