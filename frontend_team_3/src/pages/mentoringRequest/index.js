import React, { useState } from "react";
import "./style.css";
import { AiFillPlusSquare } from "react-icons/ai";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { Localhost } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart } from "../../features/user";
import { Error, Success } from "../../components/Toast";
import { ToastContainer } from "react-toastify";
import { FaPlusSquare } from "react-icons/fa";

const MentorReqForm = () => {
    const [id, setId] = useState(null)
    const [requirements, setRequirements] = useState([])
    const [paidChecked, setPaidChecked] = useState(false);
    const [helpWithCount, setHelpWithCount] = useState(0);
    const [requirementsCount, setRequirementsCount] = useState(0);
    const [haveBgWith, setHaveBgWith] = useState([]);
    const [backgroundCount, setBackgroundCount] = useState(0);
    const [title, setTitle] = useState('');
    const [experience, setExperince] = useState([]);
    const [duration, setDuration] = useState('');
    const [values, setValues] = useState(['none', 'with'])
    const [helpWith, setHelp] = useState([]);
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescreption] = useState('');
    const dispatch = useDispatch()
    const body = { paidChecked, helpWithCount, helpWith, haveBgWith, requirements, requirementsCount, backgroundCount, title, description, location, amount, experience, duration }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginStart());

        const addReq = async () => {
            try {
                const res = await axios.post(`${Localhost}/api/req/request`, body, {
                    withCredentials: true,
                });
                setId(res.data._id)
                // console.log(res.data._id)
                Success('added successfully')
            } catch (e) {
                dispatch(loginFailure());
                console.log('unable create prfile: ' + e)
                Error('filed add')
            }
        }
        addReq()
    }
    return (
        <>
            <div className="mentoring-section">
                <div className="left-col">
                    <div
                        className="left-content d-flex flex-column"
                        style={{ gap: "5px" }}
                    >
                        <h5>
                            <Link to={`/ShowReq/${id}`}>View Mentoring Request</Link>
                        </h5>
                        <h5>Settings</h5>
                        <h5>Terms and Privacy</h5>
                        <div>
                            <h5 className="d-inline-block mt-4">Post a new opportunity</h5>
                            <Link
                                className="btn"
                                style={{ color: "#007580" }}
                                to={'/PostOpp'}
                            >
                                <FaPlusSquare className="add-opp" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right-col">
                    <div className="right-content-side">
                        <div className="form-title23">
                            <h5>Mentoring request</h5>
                        </div>
                    </div>
                    <div className="main-content">
                        <form onSubmit={handleSubmit} method="POST" >
                            <div className="main-data">
                                <label htmlFor="request-title" className="label-title ">
                                    Mentoring Request Title
                                </label>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="title"
                                    value={title}
                                    id="request-title"
                                    type="text"
                                    className="input-data first-input"
                                    placeholder="example"
                                />
                            </div>
                            <div className="main-data">
                                <label htmlFor="request-description" className="label-title">
                                    Request Description
                                </label>
                                <input
                                    onChange={(e) => setDescreption(e.target.value)}
                                    name="description"
                                    value={description}
                                    id="description"
                                    type="text"
                                    className="input-data"
                                    placeholder="example"
                                />
                            </div>
                            <div className="select-diagram">
                                <div className="main-data-select">
                                    <label
                                        htmlFor="select-data1"
                                        className="label-title name-input"
                                    >
                                        Location
                                    </label>
                                    <select onChange={(e) => setLocation(e.target.value)}
                                        name="location"
                                        value={location}
                                        id="select-data" className="input-data">
                                        <option value="Remote">Remote</option>
                                        <option value="Onsite">Onsite</option>
                                    </select>
                                </div>
                                <div className="main-data-select">
                                    <label htmlFor="select-data2" className="label-title">
                                        Duration
                                    </label>
                                    <select
                                        onChange={(e) => setDuration(e.target.value)}
                                        name="duration"
                                        value={duration}
                                        id="select-data" className="input-data">
                                        <option value="3">3 months</option>
                                        <option value="6">6 months</option>
                                        <option value="9">9 months</option>
                                        <option value="12">12 months</option>
                                    </select>
                                </div>
                                <div className="main-data-select">
                                    <label
                                        htmlFor="select-data3"
                                        className="label-title name-input"
                                    >
                                        Experince
                                    </label>
                                    <select
                                        onChange={(e) => setExperince(e.target.value)}
                                        name="experience"
                                        value={experience}
                                        id="select-data" className="input-data">
                                        {
                                            values.map((item) => (
                                                <option>{item}</option>
                                            ))
                                        }
                                    </select>
                                    {/* <option value="with">with</option> */}
                                </div>
                            </div>
                            <div className="select-check">
                                <div className="checked-list">
                                    <div className="check1">
                                        <label
                                            htmlFor="input-radio"
                                            className="label-title checked-input name-input check"
                                        >
                                            <span
                                                className="me-2"
                                                onClick={() => setPaidChecked((prev) => !prev)}
                                            >
                                                Paid
                                            </span>
                                            <button
                                                type="button"
                                                className="btn"
                                                style={{ padding: 0, color: "#fed049" }}
                                                onClick={() => setPaidChecked((prev) => !prev)}
                                            >
                                                {paidChecked ? (
                                                    <MdRadioButtonUnchecked />
                                                ) : (
                                                    <MdRadioButtonChecked />
                                                )}
                                            </button>
                                        </label>
                                    </div>
                                </div>

                                <div className="main-data">
                                    <label htmlFor="amount" className="label-title sec-input">
                                        Amount
                                    </label>
                                    <input
                                        onChange={(e) => setAmount(e.target.value)}
                                        name="amount"
                                        value={amount}
                                        id="amount"
                                        // type="text"
                                        className="input-data"
                                        placeholder="example"
                                    />
                                </div>
                                <div className="main-data align-items-center">
                                    <label
                                        htmlFor="select-data4"
                                        className="label-title sec-input"
                                    >
                                        Currency
                                    </label>
                                    <select
                                        onChange={(e) => e.target.value}
                                        name="currency"
                                        id="select-data" className="input-data">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>

                            <div className="main-data">
                                <label htmlFor="help-with" className="label-title">
                                    Looking for help with
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setHelp(e.target.value)}
                                        name="helpWith"
                                        value={helpWith}
                                        id="help-with"
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setHelpWithCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: helpWithCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="help-with" className="label-title">
                                                Looking for help with
                                            </label>
                                            <input
                                                onChange={(e) => e.target.value}
                                                name="helpWith"
                                                id="help-with"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="main-data">
                                <label htmlFor="requirements" className="label-title">
                                    Requirements
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setRequirements(e.target.value)}
                                        name="requirements"
                                        id="requirements"
                                        value={requirements}
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setRequirementsCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: requirementsCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="requirements" className="label-title">
                                                Requirements
                                            </label>
                                            <input
                                                onChange={(e) => (e.target.value)}
                                                name="requirements"
                                                id="requirements"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="main-data">
                                <label htmlFor="background" className="label-title">
                                    I have background
                                </label>
                                <div
                                    className="d-flex"
                                    style={{ gap: "6px", alignItems: "flex-start" }}
                                >
                                    <input
                                        onChange={(e) => setHaveBgWith(e.target.value)}
                                        name="haveBgWith"
                                        id="background"
                                        value={haveBgWith}
                                        type="text"
                                        className="input-data third-input"
                                        placeholder="example"
                                    />
                                    <button
                                        className="btn"
                                        style={{ color: "#007580", padding: 0 }}
                                        type="button"
                                        onClick={() => setBackgroundCount((prev) => prev + 1)}
                                    >
                                        <AiFillPlusSquare />
                                    </button>
                                </div>
                                <div>
                                    {Array.from({ length: backgroundCount }, (_, i) => (
                                        <div div key={i} className="d-flex flex-column">
                                            <label htmlFor="background" className="label-title">
                                                I have background
                                            </label>
                                            <input
                                                onChange={(e) => (e.target.value)}
                                                name="haveBgWith"
                                                id="background"
                                                type="text"
                                                className="input-data third-input"
                                                placeholder="example"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="finish-button">
                                <button className="publish-btn" type="submit">
                                    Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MentorReqForm;