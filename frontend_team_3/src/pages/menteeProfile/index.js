
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import './style.css'
import { Localhost } from "../../config/api";
import { loginFailure, loginStart, loginSuccess } from "../../features/user";
import { Error, Success } from "../../components/Toast";

const Mentee = ({ options, choose, setChoose }) => {
    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState({
        lookingFor: choose,
        designation: 'Computer Science',
        availableForHiring: false,
        skills: [],
        location: ''
    })
    const [errors, setErros] = useState({
        skills: false,
        location: false,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginStart());
        const addNewMentee = async () => {

            try {
                await axios.post(`${Localhost}/api/v1/menteeProfile`, profile, { withCredentials: true });
                const userInfo = { ...user, role: 'mentor' }
                if (file) {
                    const formData = new FormData();
                    formData.append('cv', file);
                    await axios.post(`${Localhost}/api/v1/cv/upload/${user._id}`, formData, { withCredentials: true })

                }
                dispatch(loginSuccess(userInfo));
                navigate("/", { replace: true })
                Success('PROFILE Added SUCCESSFULLY');
            } catch (e) {
                dispatch(loginFailure());
                Error('UNABLE TO CREATE PROFILE' + e)
            }
        }
        if (profile.location !== "" && profile.skills !== []) addNewMentee()
        else console.log('all info are required', profile.location, profile.skills)
    };

    const handleFocusInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({ ...prev, [name]: false }));
    };

    const handleBlurInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({
            ...prev,
            [name]: e.target.value.trim()?.length === 0,
        }));
    };

    return (
        <div>
            <div className="page-content">
                <div className="content">
                    <div className="head">
                        <h2 className="head__title">Profile information</h2>
                        <p>Help us by answering questions to get you started</p>
                    </div>
                    <div className="grid-row">
                        <div className="p-3 draft draft-order1">
                            <h4 className="title">I'm looking for a</h4>
                            <div className="down-arrow">
                                <BiSolidDownArrow />
                            </div>

                            <select
                                className="data"
                                id="products"
                                placeholder="select type"
                                value={choose}
                                onChange={
                                    e => setChoose(e.target.value)
                                }
                                style={{ background: 'transparent' }}
                            >
                                {options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-3 draft  draft-order2">
                            <h4 className="title">My designation is</h4>
                            <div className="down-arrow">
                                <BiSolidDownArrow />
                            </div>

                            <select className="data"
                                placeholder="select type"
                                style={{ background: 'transparent' }}
                                onChange={e => setProfile({
                                    ...profile, designation: e.target.value
                                })} >
                                <option className="choose2">Computer science</option>
                                <option className="choose1">Engineering</option>
                                <option className="choose2">Artificial Intelligence</option>
                                <option className="choose2">Computer programming</option>
                            </select>
                        </div>
                        <div className="tempalte draft-order3">
                            <label htmlFor="upload-file" type="button" className="upload">
                                Upload resume
                            </label>
                            <input
                                type="file"
                                id="upload-file"
                                accept=".pdf"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <div className="d-flex justify-content-between">
                                {file && (
                                    <>
                                        <p className="file-name">{file.name}</p>
                                        <button
                                            type="button"
                                            className="btn btn-sm text-sm-start text-danger"
                                            onClick={() => setFile(null)}
                                        >
                                            <GiCancel />
                                        </button>
                                    </>
                                )}
                            </div>
                            <p className="explanation">
                                Uploading your resume is not a must, but it helps those who are
                                looking for specific qualification
                            </p>
                        </div>
                        <div className="p-3 draft grid-draft draft-order4">
                            <label className="hire">
                                <h4 className="title-text">Available for hiring</h4>
                                <input className="data check"
                                    type="checkbox"
                                    onChange={e => setProfile({ ...profile, availableForHiring: true })}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div className="p-3 draft draft-order5">
                            <input
                                className={`data ${errors.skills ? "input-error" : ""}`}
                                name="skills"
                                type="text"
                                onFocus={handleFocusInput}
                                onBlur={handleBlurInput}
                                onChange={
                                    e => setProfile({ ...profile, skills: [e.target.value] })
                                }
                                placeholder={errors.skills ? "Input text" : "Skills"}
                            />
                            {errors.skills && (
                                <div className="input-error-icon">
                                    <BiError />
                                </div>
                            )}
                        </div>

                        <div className="p-3 draft draft-order6">
                            <input
                                className={`data ${errors.location ? "input-error" : ""}`}
                                name="location"
                                type="text"
                                onFocus={handleFocusInput}
                                onBlur={handleBlurInput}
                                onChange={
                                    e => setProfile({ ...profile, location: e.target.value })
                                }
                                placeholder={errors.location ? "Input text" : "Location"}
                            />
                            {errors.location && (
                                <div className="input-error-icon">
                                    <BiError />
                                </div>
                            )}
                        </div>
                        <div className="handle"></div>
                        <div className="button1 end">
                            <button type="button" className="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentee;
