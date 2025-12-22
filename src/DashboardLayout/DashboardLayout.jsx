import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Component/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Aside></Aside>
            <div className='ml-64 flex-1 overflow-y-auto p-6 bg-gray-100'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;