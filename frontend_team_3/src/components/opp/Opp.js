import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv, faLocationDot, faBriefcase, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import '../../pages/showOpp/style.css'
import axios from 'axios'
// import './style.css'
import { Localhost } from '../../config/api'
// import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Opp = () => {
   const [data, setData] = useState([])
   const [dataInfo, setDataInfo] = useState([])
   const { id } = useParams()

   useEffect(() => {
      const getOpp = async () => {
         try {
            const response = await axios.get(`${Localhost}/api/opp/opp/${id}`, {
               withCredentials: true,
            });
            setData(Array.isArray(response.data) ? response.data : [response.data]);
            setDataInfo([response.data[0].owner]);
            console.log(response.data)
         } catch (error) {
            console.log(error);
         }
      };
      getOpp();
   }, [id]);

   if (data.length === 0) {
      return <div>Loading...</div>;
   }

   return (
      <div className='opp color-gray px-5 pt-5'>
         {data && data.map((item) => (
            <>
               <div className={`box ${item.getHired ? "open" : "closed"} px-4 py-2`}>
                  <span>{item.getHired ? "open mentoring opportunity" : "closed mentoring opportunity"} </span>
               </div>
               <div className='mb-5 text-capitalize'>
                  <h3 className='fw-bold'>{item.title}</h3>
                  {dataInfo.map((item) => (
                     <h4 className='fw-bold'>Get mentored by : <span className='data1'>{item.name}</span></h4>
                  ))}
                  <div className='lh-base des'>
                     <p>{item.description}</p>
                  </div>

                  <div className='d-flex flex-wrap my-3 text-capitalize'>
                     {/* <div className='flex'> */}

                     {item.getHired && (<p className='info1 my-2 '>
                        <span className='me-1'><FontAwesomeIcon icon={faFileCsv} className='fa-2xl' /> certificate :</span>
                        <span className='data1'>{item.certificate}</span>
                     </p>)}
                  </div>

                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faLocationDot} className='fa-2xl' /> location :</span>
                     <span className='data1'>{item.location}</span>
                  </p>
                  {item.getHired ? (
                     <p className='info1 my-2'>
                        <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> might get hired :</span>
                        <span className='data1'> yes</span>
                     </p>
                  ) : (
                     item.opp_experise && (<p className='info1 my-2'>
                        <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> experise :</span>
                        <span className='data1'> yes</span>
                     </p>))
                  }
                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faDollarSign} className='fa-2xl' /> paid :</span>
                     <span className='data1'>{item.paid.amount} {item.paid.currency} </span>
                  </p>
                  {/* </div> */}

                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faClock} className='fa-2xl' /> duration :</span>
                     <span className='data1'>{item.duration}</span>
                  </p>
               </div >
               <div>

                  <div className=''>
                     <div>
                        <h4 className='data1 text-capitalize fw-bold'> {item.getHired ? "responsibilities" : "i'm looking for help with"}</h4>
                        <ul>
                           {item.responsibilities.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                     </div>
                  </div>

                  <div>
                     <h4 className='data1 text-capitalize fw-bold'>requirements</h4>
                     <ul>
                        {item.requirements.map((q, i) => <li key={i}>{q}</li>)}
                     </ul>
                  </div>

                  <div>
                     <h4 className='data1 text-capitalize fw-bold'> {item.getHired ? "expected outcome" : "i have a background about"}</h4>
                     <ul>
                        {item.expOutcome.map((q, i) => <li key={i}>{q}</li>)}
                     </ul>
                  </div>
               </div>
            </>
         ))}
      </div>
   )
}


export default Opp