import { FcGoogle } from "react-icons/fc";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        axios.get('./upazila.json')
            .then(res => setUpazilas(res.data.upazilas))

        axios.get('./district.json')
            .then(res => (setDistricts(res.data.districts)))
    }, [])
    const navigate = useNavigate();
    const { registerWithEmailPassword, setUser, user, handleGoogleSignIn } =
        useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const fullName = e.target.fullName.value;
        const photoURL = e.target.photoURL;
        const file = photoURL.files[0];
        const blood = e.target.blood.value
        const district = e.target.district.value
        const upazila = e.target.upazila.value


        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) return alert("less than 6 characters");
        if (!uppercase.test(password)) return alert("Need an Uppercase");
        if (!lowercase.test(password)) return alert("Need a Lowercase");

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=4ef5a5f7c97e1a04cc960bb3d1e91b93`, { image: file }, {
            headers: {
                "Content-Type": 'multipart/form-data',

            }
        })
        const mainPhotoUrl = res.data.data.display_url;
        const formData = {
            email,
            password,
            fullName,
            mainPhotoUrl,
            blood,
            district,
            upazila

        }
        console.log(formData)

        if (res.data.success == true) {
            registerWithEmailPassword(email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: fullName,
                        photoURL: mainPhotoUrl,
                    })
                        .then(() => {
                            setUser(userCredential.user);
                            axios.post("https://blood-bank-server-six.vercel.app/users", formData)
                                .then(res => {
                                    console.log(res.data)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                            navigate("/");
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
        }
    };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then((result) => {
                setUser(result.user);
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-red-50 dark:bg-gray-800 transition-all">
  <div className="rounded-2xl shadow-lg p-8 w-[420px] border bg-white dark:bg-gray-700 dark:border-gray-600 transition-all">
    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 via-rose-300 to-red-400 bg-clip-text text-transparent mb-6">
      Create Your Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">Full Name</label>
        <input
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-500 focus:ring focus:ring-rose-200 outline-none"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-500 focus:ring focus:ring-rose-200 outline-none"
          required
        />
      </div>

      {/* Photo URL */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">Photo URL</label>
        <input
          name="photoURL"
          type="file"
          placeholder="Enter your photo URL"
          className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-500 focus:ring focus:ring-rose-200 outline-none"
        />
      </div>

      <label className="font-medium text-gray-700 dark:text-gray-200">Choose Role</label>
      <select name="blood" defaultValue="Choose Blood Group" className="select select-bordered w-full rounded-lg">
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

      {/* District */}
      <select name="district" defaultValue="Select your district" className="select select-bordered w-full rounded-lg">
        <option disabled={true}>Select your district</option>
        {districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)}
      </select>

      {/* Upazila */}
      <select name="upazila" defaultValue="Select your Upazila" className="select select-bordered w-full rounded-lg">
        <option disabled={true}>Select your Upazila</option>
        {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
      </select>

      {/* Password */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-500 focus:ring focus:ring-rose-200 outline-none"
          required
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full text-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-rose-400 via-pink-300 to-red-400 hover:from-red-400 hover:via-pink-300 hover:to-rose-400 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Register
      </button>

      {/* Google Login */}
      <button
        type="button"
        onClick={googleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 mt-2 font-semibold text-gray-800 dark:text-gray-200 rounded-lg border dark:border-gray-500 shadow-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </form>

    {/* Redirect to Login */}
    <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
      Already have an account?{" "}
      <Link
        to={"/login"}
        className="text-pink-500 dark:text-pink-300 font-semibold hover:underline"
      >
        Login
      </Link>
    </p>
  </div>
</div>

    );
};

export default Register;
