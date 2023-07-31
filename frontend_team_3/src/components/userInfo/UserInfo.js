// import React from 'react'
// import { NavLink } from 'react-router-dom'
// const UserInfo = ({ item }) => {
//   const hired = item.opp.map(e => e.hired)

//   return (
//     <div className='mb-2 userinfo px-5 pt-5'>
//       {/*user information  */}
//       <h4 className='data1 text-capitalize fw-bold mb-4'>about {item.name}</h4>
//       <div className='bg-white p-4 radius d-flex flex-column-reverse flex-md-column'>
//         <div className='box-info d-flex flex-wrap mt-3  text-capitalize'>
//           <div className='info1 my-2 d-flex flex-column'>
//             <p className=' d-flex flex-column'>
//               <span className='data1 mb-2'>name  </span>
//               <span>{item.name}</span>
//             </p>
//             {
//               hired ? (
//                 <p className=' my-2 d-flex flex-column'>
//                   <span className='data1 mb-2'>job title</span>
//                   <span>{item.job_title}</span>
//                 </p>
//               ) : ''

//             }

//             {
//               hired ? (
//                 <p className=' my-2 d-flex flex-column'>
//                   <span className='data1 mb-2'>company</span>
//                   <span>{item.company}</span>
//                 </p>
//               ) : ''
//             }
//           </div>
//           <div className='info1 my-2 d-flex flex-column'>
//             <p className=' my-2 d-flex flex-column'>
//               <span className='data1 mb-2'>phone Number  </span>
//               <span>{item.phoneNumber}</span>
//             </p>
//             <p className='my-2 d-flex flex-column'>
//               <span className='data1 mb-2'>email  </span>
//               <span>{item.email}</span>
//             </p>

//           </div>

//           <div className='info1 my-2 d-flex flex-column'>
//             <ul className=' my-2 ms-0 d-flex flex-column'>
//               <span className='data1 mb-2'> experise  </span>
//               {item.experise.map((e, i) => <li key={i}>{e}</li>)}
//             </ul>
//           </div>
//         </div>
//         {/* user avatar */}
//         <div className='d-flex justify-content-between flex-column-reverse flex-md-row'>
//           <p className='w-75 user-des'>{item.des}</p>
//           <div className='d-flex flex-column align-items-center justify-content-center userAvatar'>
//             <img src={item.user_img} alt="avatar" width="100" height="100" className="rounded-circle shadow-1-strong mb-3" />
//             <NavLink to="/external" className='profileBtn px-4 py-2 rounded-pill' style={{
//               backgroundColor: 'darkgray',
//               color: '#000000d6',
//               fontWeight: '500'
//             }}>view profile</NavLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserInfo



import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import './style.css'
import { useParams } from 'react-router-dom'
import { Localhost } from '../../config/api'

const Info = ({ item }) => {
  const [data, setData] = useState([])
  const [datainfo, setDataInfo] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const getOpp = async () => {
      try {
        const response = await axios.get(`${Localhost}/api/opp/opp/${id}`, {
          withCredentials: true,
        });
        setData([response.data[0].profile]);
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
    <>
      <div className='mb-2 userinfo px-5 pt-5'>
        {data && data.map((item) => (
          <div className='bg-white p-4 radius d-flex flex-column-reverse flex-md-column'>
            <div className='box-info d-flex flex-wrap text-capitalize'>
              <div className='info1 my-2 d-flex flex-column'>
                <div className='flex'>
                  <p className=' d-flex flex-column'>
                    <span className='data1 mb-2'>job title</span>
                    <span>{item.designation}</span>
                  </p>
                  <p className=' d-flex flex-column'>
                    <span className='data1 mb-2'>location</span>
                    <span>{item.location}</span>
                  </p>

                  <div className='info1 d-flex flex-column'>
                    <ul className=' my-2 ms-0 d-flex flex-column'>
                      <span className='data1 mb-2'> experise  </span>
                      {item.expertise.map((e, i) => <li key={i}>{e.name}</li>)}
                    </ul>
                  </div>

                  {
                    datainfo.map((item) => (
                      <>
                        <p className='my-2 d-flex flex-column'>
                          <span className='data1 mb-2'>email  </span>
                          <span>{item.email}</span>
                        </p>
                        <p className='my-2 d-flex flex-column'>
                          <span className='data1 mb-2'>Name  </span>
                          <span>{item.name}</span>
                        </p>
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='flex1'>
        </div>
      </div>
    </>
  )
}
export default Info