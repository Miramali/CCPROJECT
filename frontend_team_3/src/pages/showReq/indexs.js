import React, { useEffect, useState } from "react";
import "./style.css";
import SidaNav2 from "./sideBar";
import Mony from "@iconscout/react-unicons/icons/uil-dollar-alt";
import Location from "@iconscout/react-unicons/icons/uil-location-point";
import Time from "@iconscout/react-unicons/icons/uil-clock";
import Exp from "@iconscout/react-unicons/icons/uil-bag";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Localhost } from "../../config/api";
import { faClock, faDollarSign, faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import Comments from '../comments/Comments'

function ShowReqest() {
  const { id } = useParams();
  const [data, setData] = useState([])

  useEffect(() => {
    const getReq = async () => {
      try {
        const response = await axios.get(`${Localhost}/api/req/request/${id}`, {
          withCredentials: true,
        });
        setData(Array.isArray(response.data) ? response.data : [response.data]);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getReq();
  }, [id]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="opp color-gray px-5 pt-5">
      {data &&
        data.map((item) => (
          <>
            <div className={`box py-2 right-green-title text-white`}>
              <span>{"mentoring request"} </span>
            </div>
            <div className="mb-5 text-capitalize">
              <h3 className="fw-bold">{item.title}</h3>
              {item.hired ? (
                <h4 className="fw-bold">
                  Get mentored by :{" "}
                  <span className="data1">Belal Shwani</span>
                </h4>
              ) : (
                ""
              )}
            </div>
            <div className="lh-base des">
              <p>{item.description}</p>
            </div>

            <div className="d-flex flex-wrap my-3 text-capitalize">
              {/* {item.hired && (<p className='info1 my-2 '>
                            <span className='me-1'><FontAwesomeIcon icon={faFileCsv} className='fa-2xl' /> certificate :</span>
                            <span className='data1'>{item.certificate}</span>
                        </p>)} */}

              <p className="info1 my-2">
                <span className="me-1">
                  <Location icon={faLocationDot} className="fa-2xl" />{" "}
                  location :
                </span>
                <span className="data1">{item.location}</span>
              </p>
              {/* </div> */}
              {/* {item.hired ? (
                            <p className='info1 my-2'>
                                <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> might get hired :</span>
                                <span className='data1'> yes</span>
                            </p>
                        ) : (
                            item.opp_experise && (<p className='info1 my-2'>
                                <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> experise :</span>
                                <span className='data1'> yes</span>
                            </p>))
                        } */}
              <p className="info1 my-2">
                <span className="me-1">
                  <Mony icon={faDollarSign} className="fa-2xl" /> paid :
                </span>
                <span className="data1">{item.paid.amount} sdg / H</span>
              </p>

              <p className="info1 my-2">
                <span className="me-1">
                  <Time icon={faClock} className="fa-2xl" /> duration :
                </span>
                <span className="data1">{item.duration}</span>
              </p>
            </div>

            <div className="">
              {/* <div>
                            <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "requirements" : "i'm looking for help with"}</h4>
                            <ul>
                                {item.requirements.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div> */}
              <div className="Left-Request-Top-left-parags-1 py-2">
                <h6 className="py-1 blue-color">I'm looking for help with</h6>
                <ul>
                  <li>
                    {item.helpWith.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}{" "}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="data1 text-capitalize fw-bold">
                  requirements
                </h4>
                <ul>
                  {item.requirements.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="Left-Request-Top-left-parags-3 py-2">
                <h6 className="py-1 blue-color">I have a background about</h6>
                <ul>
                  <li>
                    {item.haveBgWith.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </li>
                </ul>
              </div>
              {/* <div>
                            <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "expected outcome" : "i have a background about"}</h4>
                            <ul>
                                {item.expected_outcome.map((q, i) => <li key={i}>{q}</li>)}
                            </ul> */}
              {/* </div> */}
            </div>
          </>
        ))}
      <div className="Left-Request-Bottm m-2 ">
        <Comments id={id} />
      </div>
    </div>
  );
}


export default ShowReqest;

