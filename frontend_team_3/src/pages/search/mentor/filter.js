import React, { useEffect, useState } from 'react';
import '../style.css'
import img0 from '../../../assets/images/computer-g8dee30bb2_1280.jpg'
import img1 from "../../../assets/images/computer-g8dee30bb2_1280.jpg"
import img2 from "../../../assets/images/cellular-g87a5ca821_1280.jpg"
import { BiSolidStar } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure } from '../../../features/user';
import axios from 'axios';
import { Localhost } from '../../../config/api';

const FilterMenotrs = (props) => {
    const [filterMentor, setFilterMentor] = useState([]);
    const user = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMentors = async () => {

            await axios
                .get(`${Localhost}/api/v1/mentorProfile`, { withCredentials: true })
                .then((res) => {
                    setFilterMentor(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getMentors();
    }, []);
    let filterProductList = filterMentor.filter((mentor) => {
        let rating = mentor;
        props.arrValue.forEach((item, index) => {
            if (item) {
                if (index + 1 === 6) {
                    rating = mentor
                }
                else {
                    rating |= Math.ceil(mentor.rating) === index + 1
                }
            }
        })
        return (rating) && mentor.location === props.locvalue;
    })
    return (
        <>
            {
                filterProductList.map((mentorOne) => {
                    return <div className='col-md-4 col-12 pt-4' key={mentorOne._id}>
                        {/* Mentor Persons */}
                        <div className={`mentorPersons mentorPersons position-relative`}>
                            <img src={img0} />
                            <div className=' info bg-white d-inline-flex  justify-content-center align-items-center rounded position-absolute bottom-0 start-0 ms-2 mb-2 p-1'>
                                <BiSolidStar className='text-main-color  text-small' />
                                <span className='fw-bold  text-small'>{mentorOne.rating}</span>
                                <span className='text-muted text-small '>({mentorOne.reveiew} reveiews)</span>
                            </div>
                        </div>
                        {/* Mentor Info */}
                        <div>
                            <p className='my-2 fw-bold'>{mentorOne.user.name}</p>
                            <p className='text-muted text-small'>{mentorOne.title}</p>
                        </div>
                    </div>
                })
            }
        </>
    );
}

export default FilterMenotrs;