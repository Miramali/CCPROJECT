// // import React, { useEffect, useLayoutEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
// // import { Localhost } from "../../config/api";
// // import { loginFailure } from "../../features/user";
// // const RequestsFilter = () => {
// //     const [getReq, setGetReq] = useState([]);
// //     const user = useSelector((state) => state.currentUser);
// //     useEffect(() => {
// //         const getRequests = async () => {
// //             await axios
// //                 .get(`${Localhost}/api/req/request`, { withCredentials: true })
// //                 .then((res) => {
// //                     setGetReq(res.data);
// //                     console.log(res.data);
// //                 })
// //                 .catch((error) => {
// //                     console.log(error);
// //                 });
// //         };
// //         getRequests();
// //     }, []);
// //     return (
// //         <>
// //             {
// //                 getReq.slice(0, 2).map((req) => {
// //                     return <div className='col-md-10 col-12 pt-4' key={req.id}>
// //                         <div className='rounded p-4' style={{ backgroundColor: "#e6f2f2" }}>
// //                             <div className='d-flex flex-column  flex-md-row justify justify-content-between '>
// //                                 <div className='info ' style={{ flexBasis: "50%" }}>
// //                                     <h3 className=' fw-bold h5 text-sec-color moblie-font-req'>Front end development</h3>
// //                                     <p className='small fw-bold  '> <span className='text-sec-color w-50'> is looking for a mentor</span></p>
// //                                     <p className='small lh-sm  mt-4 mb-md-3 mb-1'>
// //                                         i'm a recent computer science graduate from khartom university , intrested in front end development and Ui / UX looking for a mentor to guide me through becoming a proficional fornt end developer
// //                                     </p>
// //                                     <p className='fw-bold small'>...Read more</p>
// //                                 </div>
// //                                 <div className='req flex-column-reverse d-flex flex-md-column justify-content-between' style={{ flexBasis: "50%" }}>
// //                                     <div className='text-end moblie-font-req'>
// //                                         <button className='me-2 custom-padding text-respon text-white bg-main-color d-inline-block border-0 small custom-padding rounded-pill'>View details</button>
// //                                         <button className=' bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill'>Mentor</button>
// //                                     </div>
// //                                     <div className='d-flex justify-content-around mb-4 moblie-font-req mt-4 mt-md-0'>
// //                                         <div>
// //                                             <p><span className='text-sec-color fw-bold'>Duration</span> : {req.duration} Month</p>
// //                                             <p><span className='text-sec-color fw-bold'>Looking for a job: </span> {req.lookingJob ? "yes" : "no"}</p>
// //                                         </div>
// //                                         <div className=''>
// //                                             <p> <span className='text-sec-color fw-bold'>Paid</span>: {req.paid.isPaid ? "yes" : "no"}    </p>
// //                                             <p><span className='text-sec-color fw-bold'>Experince</span> : {req.experience}    </p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 })
// //             }
// //         </>);
// // }

// // export default RequestsFilter;













// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { Localhost } from "../../config/api";
// import { loginFailure } from "../../features/user";
const RequestsFilter = () => {
    //     const [getReq, setGetReq] = useState([]);
    //     const user = useSelector((state) => state.currentUser);
    //     const dispatch = useDispatch();
    //     const config = { headers: { Authorization: `Bearer ${user.tokens[0]}` } };
    //     console.log(user.tokens);

    //     useEffect(() => {
    //         const getRequests = async () => {

    //             await axios
    //                 .get(`${Localhost}/api/req/request`, { withCredentials: true })
    //                 .then((res) => {
    //                     setGetReq(res.data);
    //                     console.log(res.data);
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         };
    //         getRequests();
    //     }, []);
    return (
        <div></div>
        //         <>
        //             {
        //                 getReq.slice(0, 2).map((req) => {
        //                     return <div className='col-md-10 col-12 pt-4' key={req.id}>
        //                         <div className='rounded p-4' style={{ backgroundColor: "#e6f2f2" }}>
        //                             <div className='d-flex flex-column  flex-md-row justify justify-content-between '>
        //                                 <div className='info ' style={{ flexBasis: "50%" }}>
        //                                     <h3 className=' fw-bold h5 text-sec-color moblie-font-req'>Front end development</h3>
        //                                     <p className='small fw-bold  '>{req.owner.name} <span className='text-sec-color w-50'> is looking for a mentor</span></p>
        //                                     <p className='small lh-sm  mt-4 mb-md-3 mb-1'>
        //                                         i'm a recent computer science graduate from khartom university , intrested in front end development and Ui / UX looking for a mentor to guide me through becoming a proficional fornt end developer
        //                                     </p>
        //                                     <p className='fw-bold small'>...Read more</p>
        //                                 </div>
        //                                 <div className='req flex-column-reverse d-flex flex-md-column justify-content-between' style={{ flexBasis: "50%" }}>
        //                                     <div className='text-end moblie-font-req'>
        //                                         <button className='me-2 custom-padding text-respon text-white bg-main-color d-inline-block border-0 small custom-padding rounded-pill'>View details</button>
        //                                         <button className=' bg-main-color text-white  text-respon custom-padding small d-inline-block border-0  mt-1  rounded-pill'>Mentor</button>
        //                                     </div>
        //                                     <div className='d-flex justify-content-around mb-4 moblie-font-req mt-4 mt-md-0'>
        //                                         <div>
        //                                             <p><span className='text-sec-color fw-bold'>Duration</span> : {req.duration} Month</p>
        //                                             <p><span className='text-sec-color fw-bold'>Looking for a job: </span> {req.lookingJob ? "yes" : "no"}</p>
        //                                         </div>
        //                                         <div className=''>
        //                                             <p> <span className='text-sec-color fw-bold'>Paid</span>: {req.paid.isPaid ? "yes" : "no"}    </p>
        //                                             <p><span className='text-sec-color fw-bold'>Experince</span> : {req.experience}    </p>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 })
        //             }
        //         </>);
    )
}

export default RequestsFilter;