import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Localhost } from "../../config/api";
import { loginFailure } from "../../features/user";
import { mentor1, } from "../../assets/index";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function MentorInLocation() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [getMentor, setGetMentor] = useState([]);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMentors = async () => {
      // if (!user.tokens[0]) {
      //   console.log("please login first");
      //   dispatch(loginFailure());
      // }
      await axios
        .get(`${Localhost}/api/v1/mentorProfile`, { withCredentials: true })
        .then((res) => {
          setGetMentor(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMentors();
  }, []);
  return (
    <>
      <div className="top-mentors">
        <Container>
          <h2>Mentors in your location</h2>
          <Row>
            <Slider {...settings} className="slider">
              {getMentor.map((men) => {
                return (
                  <div className="mentorlocation">
                    <div className="top-ment-info">
                      <Image src={mentor1} />
                      {/* <div className="rate">
                          <p>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#f9d03b" }}
                            />
                            4.5
                            <span>(340 reviews)</span>
                          </p>
                        </div> */}
                    </div>

                    <div className="mentor-details">
                      <h4>{men.user.name}</h4>
                      <p>{men.designation}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default MentorInLocation;
