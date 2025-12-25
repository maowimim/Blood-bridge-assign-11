import React, { useEffect, useState } from 'react';


import useAxios from '../../hook/useAxios';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Allusers = () => {
    const axiosInstance = useAxios()
    const [users, setUsers] = useState([])

    const fetchUsers =()=>{
         axiosInstance.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }

    useEffect(() => {
      fetchUsers()
        
    }, [ axiosInstance])

    const handleStatusChange = (email,status)=>{
         useAxiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
           .then(res=>{
            console.log(res.data)
            fetchUsers()
           })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
    
                    {
                        users?.map(user=>
                            <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={user?.mainPhotoUrl}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{user?.fullName}</div>
                                    <div className="text-sm opacity-50">{user?.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                        {user?.role}
                        </td>
                        <td>{user?.status}</td>
                        <th>
                            {
                                user?.status == 'active' ?
                                <button onClick={()=>handleStatusChange(user?.email,'blocked')} className="btn btn-error btn-xs text-white">Blocked</button>
                                : <button onClick={()=>handleStatusChange(user?.email,'active')} className="btn btn-success btn-xs">Active</button>
                               
                                
                            }
                            
                           
                        </th>
                    </tr>
                        )
                    }
                
                  
                </tbody>
               
            </table>
        </div>
    );
};

export default Allusers;