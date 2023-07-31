import React, { useEffect, useState } from "react";
import './style.css'
import Form from "react-bootstrap/Form";
import { Accordion, Badge, Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import invite from "../../assets/images/invite.jpg";
import initialDetails from "../../components/homepage/mentoringdata";
import RequestsFilter from "../../components/homepage/RequestsFilters";
import Search from "./search/Search";
import MentorInLocation from "../../components/homepage/MentorLocation";
import { Link } from "react-router-dom";
import { Localhost } from "../../config/api";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../../features/user";

const Home = () => {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${Localhost}/api/v1/subscribe`,
        { email: input },
        // {
        //   // withCredentials: true,
        // }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to send email initaivion');
    }
  }
  
  const getUser = async () => {
    try {
      const url = `http://localhost:5000/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      dispatch(loginSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  });

  return (
    <>
      <div id="home">
        <div className="main">
          <div className="mentor-search" style={{ marginTop: '6%' }}>
            <Container>
              <Row>
                <Col>
                  <div className="mentor-bg">
                    <div className="best-mentor">
                      <h2 className="my-3">
                        Get Connected to the best mentors
                      </h2>
                      <p className="mb-3">
                        Book and meet over 3,458+ mentors for 1:1 mentorship in
                        our global community
                      </p>
                      <Search details={initialDetails} />
                      <a href='#'><p className="my-3" style={{ borderBottom: '1px dashed gainsboro' }}>Learn more about mentor and mentee</p></a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          {/* <TopMentor /> */}
          <div className="recent-oppurtunities">
            <Container>
              <h2>Recent mentoring oppurtunities</h2>
              <Row>
                <Col lg={6}>
                  <div className="mentor-opportunities">
                    <div className="ment-opp-head d-flex justify-content-between">
                      <div className="pb-3">
                        <h6>Website UI design implementaion</h6>
                        <p>
                          get mentored By :<span>Karem mohamed</span>
                        </p>
                      </div>
                      <div className="ment-opp-req">
                        <Button className="d-block mb-2">Request</Button>{" "}
                        <Button className="d-block mb-2">View</Button>{" "}
                      </div>
                    </div>
                    <div className="tags mb-4">
                      <Stack direction="horizontal" gap={2} className="mb-2">
                        <Badge>Certificate</Badge>
                        <Badge>Remote</Badge>
                        <Badge>Open Duration</Badge>
                      </Stack>
                      <Stack direction="horizontal" gap={2}>
                        <Badge>Paid</Badge>
                        <Badge>Might get hired</Badge>
                      </Stack>
                    </div>
                    <p>
                      Looking for someone who's intrested in project managment
                      related tasks
                      <br />
                      and who's eagre to gain knowledge andhave fun during the
                      experience !
                    </p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mentor-opportunities">
                    <div className="ment-opp-head d-flex justify-content-between">
                      <div className="pb-3">
                        <h6>Website UI design implementaion</h6>
                        <p>
                          get mentored By :<span>Karem mohamed</span>
                        </p>
                      </div>
                      <div className="ment-opp-req ">
                        <Button className="d-block mb-2">Request</Button>{" "}
                        <Button className="d-block mb-2">View</Button>{" "}
                      </div>
                    </div>
                    <div className="tags mb-4">
                      <Stack direction="horizontal" gap={2} className="mb-2">
                        <Badge>Certificate</Badge>
                        <Badge>Remote</Badge>
                        <Badge>Open Duration</Badge>
                      </Stack>
                      <Stack direction="horizontal" gap={2}>
                        <Badge>Paid</Badge>
                        <Badge>Might get hired</Badge>
                      </Stack>
                    </div>
                    <p>
                      Looking for someone who's intrested in project managment
                      related tasks
                      <br />
                      and who's eagre to gain knowledge andhave fun during the
                      experience !
                    </p>
                  </div>
                </Col>
              </Row>
              <Link to="opp" className="more"><h5 className=" pt-5">More opportunities</h5></Link>
            </Container>
          </div>
          <div className="invite-mentor">
            <Container>
              <Row className="flex-md-row flex-column-reverse">
                <Col lg={5} className="ps-0 order-lg-1 ">
                  <Image src={invite} alt="Invite" />
                </Col>
                <Col lg={7} className=" order-lg-2">
                  <div className="invite-sec">
                    <h4>
                      Know someone who will <br />
                      make a good mentor?
                    </h4>
                    <p>Invite them to join!</p>
                    <div className="mail-invite">
                      <Form.Control
                        type="memaila"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Email Address"
                      />
                      <button onClick={handleClick}>Invite</button>
                      {message && <p>{message}</p>}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="open-requests">
            <div className="open-requests">
              <Container>
                <Row>
                  <RequestsFilter />
                </Row>
                <Link to='/reqs' className="more"><h5 className=" pt-5">More requests</h5></Link>
              </Container>
            </div>
          </div>
          <div className="faq">
            <Container>
              <Row>
                <Col lg={6}>
                  <h2>Having any questions ?</h2>
                  <p className="mb-lg-0 mb-5">Take a look at our FAQ</p>
                </Col>
                <Col lg={6}>
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How much does it cost to be a mentor?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What is a no-show? What is a no-show policy?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        How long is the review process for a mentor application?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Is the timezone in my booking reflected correctly?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        How do i change my email address?
                      </Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Container>
          </div>
          <MentorInLocation />
        </div>
      </div>
    </>
  );
}

export default Home;
