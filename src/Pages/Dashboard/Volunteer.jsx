import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import useAxios from '../../hook/useAxios';

const Volunteer = () => {
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const axiosInstance = useAxios()
   
    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
            .then(res => (setDistricts(res.data.districts)))
    }, [])
    const handleAddvolunteer = async(e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const fullName = e.target.fullName.value;
        const photoURL = e.target.photoURL;
        const file = photoURL.files[0];
        const blood = e.target.blood.value
        const district = e.target.district.value
        const upazila = e.target.upazila.value



        const res = await axios.post(`https://api.imgbb.com/1/upload?key=4ef5a5f7c97e1a04cc960bb3d1e91b93`, { image: file }, {
            headers: {
                "Content-Type": 'multipart/form-data',

            }
        })
        const mainPhotoUrl = res.data.data.display_url;
        const formData = {
            email,
            fullName,
            mainPhotoUrl,
            blood,
            district,
            upazila,
            role: 'volunteer'
        }
       
        axiosInstance.post('/addVolunteers',formData)
          .then(res=>{
            console.log(res.data)
            toast.success("Volunteer Added")
            
          })
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-all">
            <div className="rounded-2xl shadow-2xl p-8 w-[420px] border bg-white dark:bg-gray-800 dark:border-gray-700 transition-all">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
                    Add As Volunteer
                </h2>

                <form onSubmit={handleAddvolunteer} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="font-medium text-gray-800 dark:text-gray-200">Full Name</label>
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-medium text-gray-800 dark:text-gray-200">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="font-medium text-gray-800 dark:text-gray-200">Photo URL</label>
                        <input
                            name="photoURL"
                            type="file"
                            placeholder="Enter your photo URL"
                            className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>
                    <label className="font-medium text-gray-800 dark:text-gray-200">Choose Role</label>
                    <select name="blood" defaultValue="Choose Blood Group" className="select">
                        <option disabled={true}>Choose Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>

                    </select>
                    {/* for district */}
                    <select name="district" defaultValue="Select your district" className="select">
                        <option disabled={true}>Select your district</option>
                        {
                            districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)
                        }
                    </select>
                    {/* for upazila */}
                    <select name="upazila" defaultValue="Select your Upazila" className="select">
                        <option disabled={true}>Select your Upazila</option>
                        {
                            upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)
                        }
                    </select>

                    


                    <button
                        type="submit"
                        className="w-full text-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Add Volunteer
                    </button>


                </form>



            </div>
        </div>
    );
};

export default Volunteer;