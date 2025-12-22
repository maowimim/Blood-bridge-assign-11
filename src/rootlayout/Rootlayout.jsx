import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';

const Rootlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Rootlayout;