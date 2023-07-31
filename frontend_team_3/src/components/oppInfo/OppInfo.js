import React, { useEffect, useState } from 'react'
import Comments from '../comments/Comments'
import UserInfo from '../userInfo/UserInfo'
import Opp from '../opp/Opp'
import axios from 'axios'
import { Localhost } from '../../config/api'
import { useParams } from 'react-router-dom'

const OppInfo = () => {

  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getOpp = async () => {
      try {
        const response = await axios.get(`${Localhost}/api/opp/opp/${id}`, {
          withCredentials: true,
        });
        setData(Array.isArray(response.data) ? response.data : [response.data]);
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
    <div>
      {
        <>
          {data.map(item => <Opp item={item} key={item.title} />)}
          <div className='user'>
            <UserInfo key={data.title} />
            <Comments />
          </div>
        </>
      }
    </div>
  )
}

export default OppInfo