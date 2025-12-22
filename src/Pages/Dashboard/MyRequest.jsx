import React, { useEffect, useState } from 'react';

import useAxiosSecure from '../../hook/useAxiosSecure';

const MyRequest = () => {
    const [myRequests, setMyRequests] = useState([])
    const [totalRequests, setTotalRequests] = useState(0)
    const [itemPerPage] = useState(10)
    const [currentpage, setCurrentPage] = useState(1)

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentpage - 1}&size=${itemPerPage}`)
            .then(res => {
                setMyRequests(res.data.request)
                setTotalRequests(res.data.totalRequest)
            })
    }, [axiosSecure, currentpage, itemPerPage])

    const numberOfPage = Math.ceil(totalRequests / itemPerPage)
    const pages = [...Array(numberOfPage).keys()].map(e => e + 1)
    // console.log(myRequests)
    // console.log(totalRequests)
    // console.log(pages)
    const handlePrev=()=>{
        if(currentpage > 1){
            setCurrentPage(currentpage - 1)
        }
    }
    const handleNext = ()=>{
        if(currentpage < pages.length){
            setCurrentPage(currentpage + 1)
        }
    }
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Hospital Name</th>
                            <th>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRequests.map((request,index)=>
                                <tr>
                            <th>{(currentpage - 1) * itemPerPage + index + 1}</th>
                            <td>{request.recipientName}</td>
                            <td>{request.hospital}</td>
                            <td>{request.bloodGroup}</td>
                            
                        </tr>
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-12 gap-4'>
              <button onClick={handlePrev} className="btn">Prev</button>
              {
                pages.map(page=> <button className={`btn ${page == currentpage? 'bg-[#435585] text-white' : ''}`} onClick={()=>setCurrentPage(page)}>{page}</button>)
              }
              <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default MyRequest;