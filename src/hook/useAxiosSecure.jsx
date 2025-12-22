import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";




const axiosSecure = axios.create({
    baseURL: 'https://blood-bank-server-six.vercel.app',
});

const useAxiosSecure = () => {
    const {user}=use(AuthContext)
   useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        const resInterceptor = axiosSecure.interceptors.response.use(response=>{
            return response
        },(err=>{
            console.log(err)
            return Promise.reject(err)
        }))


        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
     }, [user?.accessToken])
     return axiosSecure
}

export default useAxiosSecure