import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Component/Aside';
import Navbar from '../Component/Navbar'
const DashboardLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='flex'>
            <Aside></Aside>
            <div className='ml-64 flex-1 overflow-y-auto p-6 bg-gray-100'>
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default DashboardLayout;