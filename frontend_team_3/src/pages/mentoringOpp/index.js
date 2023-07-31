import React, { useState } from "react";
import "./style.css";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { loginFailure, loginStart } from "../../features/user";
import { Localhost } from "../../config/api";
import { Link } from "react-router-dom";
import { Error, Success } from "../../components/Toast";
import MyNavbar from "../../components/layout/navbar/Navbar";

const MentoringOpportunityForm = () => {
  const [OppId, setOppId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [certificate, setCertificate] = useState(true)
  const [duration, setDuration] = useState(0)
  const [location, setLocation] = useState('cairo')
  const [getHired, setGetHired] = useState(true)
  const [paid, setPaid] = useState(true)
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [responsibilities, setResponsibilities] = useState('')
  const [requirements, setRequirements] = useState('')
  const [expOutcome, setExpOutcome] = useState('')
  const [progress, setProgress] = useState('')
  const [acceptedBy, setAcceptedBy] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  console.log(user);

  const body = { title: title, description, duration, location, certificate, location, getHired, paid: { isPaid: paid, amount, currency }, responsibilities, requirements, expOutcome }

  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(loginStart());
    const addNewOPP = async () => {
      // try {
      await axios
        .post(`${Localhost}/api/opp/opp`, body, { withCredentials: true })
        .then((res) => {
          setOppId(res.data._id);
          Success("ADD OPPERTUNITY SUCCESSFULLY");
        })
        .catch((error) => {
          dispatch(loginFailure());
          Error("FAILED TO ADD OPPERTUNITY" + error);
        });

    }
    addNewOPP()
  };
  return (
    <div className="parent">
      {/* <MyNavbar/> */}
      <div className="container">
        <div className="row">
          <div className="div1 d-none d-lg-block col-lg-2">
            <span>
              <Link to={`/ShowOpp/${OppId}`}>View Mentoring Opportunity</Link>
            </span>
            <span>Settings</span>
            <span>Terms and Privacy</span>
            <br />
            <br />
            <span>
              Post a new opportunity &nbsp;
              <a href="#">
                <FaPlusSquare className="add-opp" />
              </a>
            </span>
          </div>
          <div className="div2 col-lg-10">
            <section className="mentoring-opportunity">
              <div className="mentoring-opportunity-container">
                <div className="mentoring-opportunity-div1">
                  <p style={{ fontSize: '19px', padding: '5px', color: '#fff' }}>Mentoring opportunity</p>
                </div>
                <form className="mentoring-opportunity-form w-md-100">
                  <label className="mentor-oppor-label">
                    Mentoring opportunity title
                  </label>
                  <input
                    className="mentor-oppor-input mentor-input1 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="mentor-oppor-label d-none d-lg-block">
                    Opportunity Description
                  </label>
                  <textarea
                    className="mentor-oppor-input border-bottom border-warning-subtle border-2 d-none d-lg-block"
                    cols="88"
                    rows="1"
                    placeholder="example"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="certi">
                    <label className="mentor-oppor-label1">Certificate</label>
                    <select className="mentor-oppor-input1 mentor-select1 border-bottom border-warning-subtle border-2" onChange={(e) => setCertificate(e.target.value)}>
                      <option value={true}>Awarded</option>
                      <option value={false}>NOT Awarded</option>
                      <option value={true}>Awarded</option>
                    </select>
                    <label className="mentor-oppor-label1">Duration</label>
                    <select className="mentor-oppor-input1 mentor-select2 border-bottom border-warning-subtle border-2" onChange={(e) => setDuration(e.target.value)}>
                      <option value={3}>3 months</option>
                      <option value={2}>2 months</option>
                      <option value={1}>1 months</option>
                    </select>
                  </div>
                  <br />
                  <label className="mentor-oppor-label1">Location &nbsp;</label>
                  <select className="mentor-oppor-input1 mentor-select3 border-bottom border-warning-subtle border-2" onChange={(e) => setLocation(e.target.value)}>
                    <option value='Remote'>Remote</option>
                    <option value='onsite'>onsite</option>
                  </select>
                  <span className="mentor-span0">Might get hired</span>
                  <input
                    className="form-check-input mgh-inp mgh-inp1"
                    type="checkbox"
                    onChange={(e) => setGetHired(e.target.checked)}
                  ></input>
                  <span className="checkboxtexr"></span>
                  <br />
                  <br />
                  <div className="paidDiv">

                    <label className="mentor-oppor-label1 paid">Paid</label>
                    <input
                      className="form-check-input mgh-inp mgh-inp2"
                      type="checkbox"
                      onChange={(e) => setPaid(e.target.checked)}
                    ></input>
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    <div className="d-inline-block par-opp">
                      <label className="mentor-oppor-span lab-1">Amount</label>
                      <input
                        className="mentor-oppor-input1 mentor-input2 border-bottom border-warning-subtle border-2"
                        type="number"
                        placeholder="example"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="d-inline-block par-opp">
                      <label className="mentor-oppor-span">Currency</label>
                      <select className="mentor-oppor-input1 mentor-select4 border-bottom border-warning-subtle border-2" onChange={(e) => setCurrency(e.target.value)}>
                        <option value='usd'>USD</option>
                        <option value='pound'>POUND</option>
                        <option value='kwd'>KWD</option>
                      </select>
                    </div>
                  </div>
                  <label className="mentor-oppor-label">Responsibilities</label>
                  <input
                    className="mentor-oppor-input1 mentor-input4 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setResponsibilities(e.target.value)}

                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <label className="mentor-oppor-label">Requirements</label>
                  <input
                    className="mentor-oppor-input1 mentor-input5 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setRequirements(e.target.value)}

                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <label className="mentor-oppor-label">Expected Outcome</label>
                  <input
                    className="mentor-oppor-input1 mentor-input6 border-bottom border-warning-subtle border-2"
                    type="text"
                    placeholder="example"
                    onChange={(e) => setExpOutcome(e.target.value)}

                  />
                  <a href="#">
                    {/* <i className="fas fa-plus-square"></i> */}
                    <FaPlusSquare className="add-opp" />
                  </a>
                  <div className="sub-btn">
                    <Link to={`ShowOpp/`} >

                      <input
                        className="mentor-submit"
                        type="submit"
                        value="Publish"
                        onClick={handleSubmit}
                      />
                    </Link>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringOpportunityForm;
