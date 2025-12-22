import axios from "axios";


const axiosInstance = axios.create({
    baseURL:'https://blood-bank-server-six.vercel.app'
})

const useAxios =()=>{
    return axiosInstance
}
export default useAxios