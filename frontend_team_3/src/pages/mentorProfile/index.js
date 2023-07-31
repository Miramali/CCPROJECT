
// /* eslint-disable jsx-a11y/anchor-is-valid */
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

const Mentor = ({ options, choose, setChoose }) => {
    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState({
        lookingFor: choose,
        designation: 'Computer Science',
        expertise: [{ name: '' }],
        currentCompany: '',
        yearsOfExperence: 0,
        location: ''
    })
    const [errors, setErros] = useState({
        expertise: false,
        currentCompany: false,
        experience: false,
        location: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginStart());
        const addNewMentor = async () => {
            try {
                await axios.post(`${Localhost}/api/v1/mentorProfile`, profile, { withCredentials: true })
                const userInfo = { ...user, role: 'mentee' }
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
        if (profile.location && profile.currentCompany) addNewMentor()
        else console.log('all info are required', profile.currentCompany, profile.location)
    };

    const handleFocusInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({ ...prev, [name]: false }));
    };

    const handleBlurInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({
            ...prev,
            [name]: e.target.value.trim().length === 0,
        }));
    };

    return (
        <div>
            <div className="page-content">
                <form className="content" onSubmit={handleSubmit}>
                    <div className="head">
                        <h2>Profile information</h2>
                        <p>Help us by answering questions to get you started</p>
                    </div>
                    <div className="row">
                        <div className=" col-sm-6">
                            <div className="p-3 draft ">
                                <h4 className="title">I'm looking for a</h4>
                                <div className="down-arrow">
                                    <BiSolidDownArrow />
                                </div>
                                <select
                                    className="data"
                                    placeholder="select type"
                                    value={choose}
                                    onChange={
                                        e => setChoose(e.target.value)
                                    }
                                    style={{ background: "transparent" }}
                                >
                                    {options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-3 draft">
                                <h4 className="title">My designation is</h4>
                                <div className="down-arrow">
                                    <BiSolidDownArrow />
                                </div>

                                <select
                                    className="data"
                                    placeholder="select type"
                                    onChange={
                                        e => setProfile({ ...profile, designation: e.target.value })
                                    }
                                    style={{ background: "transparent" }}
                                >
                                    <option value='Computer Science' className="choose1">Computer Science</option>
                                    <option value='Engineering' className="choose1">Engineering</option>
                                    <option value='Artificial Intelligence' className="choose2">Artificial Intelligence</option>
                                    <option value='Computer Programming' className="choose2">Computer Programming</option>
                                </select>
                            </div>
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.expertise ? "input-error" : ""}`}
                                    name="expertise"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    onChange={
                                        e => setProfile({ ...profile, expertise: [{ name: e.target.value }] })
                                    }
                                    placeholder={errors.expertise ? "Input text" : "Expertise"}
                                />
                                {errors.expertise && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.currentCompany ? "input-error" : ""}`}
                                    name="currentCompany"
                                    type="text"
                                    value={profile.curre}
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    onChange={
                                        e => setProfile({ ...profile, currentCompany: e.target.value })
                                    }
                                    placeholder={
                                        errors.currentCompany ? "Input text" : "Current Company"
                                    }
                                />
                                {errors.currentCompany && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.experience ? "input-error" : ""}`}
                                    name="experience"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    onChange={
                                        e => setProfile({ ...profile, yearsOfExperence: parseInt(e.target.value) })
                                    }
                                    placeholder={
                                        errors.experience ? "Input number" : "Years of experience"
                                    }
                                />
                                {errors.experience && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                            <div className="p-3 draft">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="button1">
                                <label htmlFor="upload-file" type="button" className="upload">
                                    Upload resume
                                </label>
                                <input
                                    type="file"
                                    id="upload-file"
                                    accept=".pdf"
                                    onChange={
                                        e => setFile(e.target.files[0])
                                    }
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
                                    Uploading your resume is not a must, but it helps those who
                                    are looking for specific qualification
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="button1 end  btn-1 ">
                                <button type="button" className="submit" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Mentor;






/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from "react";
// import { BiSolidDownArrow } from "react-icons/bi";
// import { GiCancel } from "react-icons/gi";
// import { BiError } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { Localhost } from "../../config/api";
// import { loginFailure, loginStart, loginSuccess } from "../../features/user";

// const Mentor = ({ options, choose, setChoose }) => {
//     const user = useSelector(state => state.currentUser)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [file, setFile] = useState(null);
//     const [profile, setProfile] = useState({
//         lookingFor: choose,
//         designation: 'Computer Science',
//         expertise: [{ name: '' }],
//         currentCompany: '',
//         yearsOfExperence: 0,
//         location: ''
//     })
//     const [errors, setErros] = useState({
//         expertise: false,
//         currentCompany: false,
//         experience: false,
//         location: false,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(loginStart());
//         const addNewMentor = async () => {
//             if (!user.tokens[0]) {
//                 console.log('please login first')
//                 dispatch(loginFailure());
//             }
//             // const config ={headers: {'Authorization': `Bearer ${user.tokens[0]}`}}
//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${user.tokens[0]}`,
//                 },
//             };
//             try {
//                 await axios.post(`${Localhost}/api/v1/mentorProfile`, profile, config)
//                 const userInfo = { ...user, role: 'mentee' }
//                 dispatch(loginSuccess(userInfo));
//                 if (file) {
//                     const formData = new FormData();
//                     formData.append('cv', file);
//                     await axios.post(`${Localhost}/api/v1/cv/upload/${user._id}`, formData, config)
//                 }
//                 navigate("/")
//             } catch (e) {
//                 dispatch(loginFailure());
//                 console.log('unable create profile: ' + e)
//             }

//         }
//         if (profile.location && profile.currentCompany) addNewMentor()
//         else console.log('all info are required', profile.currentCompany, profile.location)
//     };

//     const handleFocusInput = (e) => {
//         const { name } = e.target;
//         setErros((prev) => ({ ...prev, [name]: false }));
//     };

//     const handleBlurInput = (e) => {
//         const { name } = e.target;
//         setErros((prev) => ({
//             ...prev,
//             [name]: e.target.value.trim().length === 0,
//         }));
//     };

//     return (
//         <div>
//             <div className="page-content">
//                 <form className="content" onSubmit={handleSubmit}>
//                     <div className="head">
//                         <h2>Profile information</h2>
//                         <p>Help us by answering questions to get you started</p>
//                     </div>
//                     <div className="row">
//                         <div className=" col-sm-6">
//                             <div className="p-3 draft ">
//                                 <h4 className="title">I'm looking for a</h4>
//                                 <div className="down-arrow">
//                                     <BiSolidDownArrow />
//                                 </div>
//                                 <select
//                                     className="data"
//                                     placeholder="select type"
//                                     value={choose}
//                                     onChange={
//                                         e => setChoose(e.target.value)
//                                     }
//                                     style={{ background: "transparent" }}
//                                 >
//                                     {options?.map((option) => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="p-3 draft">
//                                 <h4 className="title">My designation is</h4>
//                                 <div className="down-arrow">
//                                     <BiSolidDownArrow />
//                                 </div>

//                                 <select
//                                     className="data"
//                                     placeholder="select type"
//                                     onChange={
//                                         e => setProfile({ ...profile, designation: e.target.value })
//                                     }
//                                     style={{ background: "transparent" }}
//                                 >
//                                     <option value='Computer Science' className="choose1">Computer Science</option>
//                                     <option value='Engineering' className="choose1">Engineering</option>
//                                     <option value='Artificial Intelligence' className="choose2">Artificial Intelligence</option>
//                                     <option value='Computer Programming' className="choose2">Computer Programming</option>
//                                 </select>
//                             </div>
//                             <div className="p-3 draft">
//                                 <input
//                                     className={`data ${errors.expertise ? "input-error" : ""}`}
//                                     name="expertise"
//                                     type="text"
//                                     onFocus={handleFocusInput}
//                                     onBlur={handleBlurInput}
//                                     onChange={
//                                         e => setProfile({ ...profile, expertise: [{ name: e.target.value }] })
//                                     }
//                                     placeholder={errors.expertise ? "Input text" : "Expertise"}
//                                 />
//                                 {errors.expertise && (
//                                     <div className="input-error-icon">
//                                         <BiError />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="col-sm-6">
//                             <div className="p-3 draft">
//                                 <input
//                                     className={`data ${errors.currentCompany ? "input-error" : ""}`}
//                                     name="currentCompany"
//                                     type="text"
//                                     onFocus={handleFocusInput}
//                                     onBlur={handleBlurInput}
//                                     onChange={
//                                         e => setProfile({ ...profile, currentCompany: e.target.value })
//                                     }
//                                     placeholder={
//                                         errors.currentCompany ? "Input text" : "Current currentCompany"
//                                     }
//                                 />
//                                 {errors.currentCompany && (
//                                     <div className="input-error-icon">
//                                         <BiError />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="p-3 draft">
//                                 <input
//                                     className={`data ${errors.experience ? "input-error" : ""}`}
//                                     name="experience"
//                                     type="text"
//                                     onFocus={handleFocusInput}
//                                     onBlur={handleBlurInput}
//                                     onChange={
//                                         e => setProfile({ ...profile, yearsOfExperence: parseInt(e.target.value) })
//                                     }
//                                     placeholder={
//                                         errors.experience ? "Input number" : "Years of experience"
//                                     }
//                                 />
//                                 {errors.experience && (
//                                     <div className="input-error-icon">
//                                         <BiError />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="p-3 draft">
//                                 <input
//                                     className={`data ${errors.location ? "input-error" : ""}`}
//                                     name="location"
//                                     type="text"
//                                     onFocus={handleFocusInput}
//                                     onBlur={handleBlurInput}
//                                     onChange={
//                                         e => setProfile({ ...profile, location: e.target.value })
//                                     }
//                                     placeholder={errors.location ? "Input text" : "Location"}
//                                 />
//                                 {errors.location && (
//                                     <div className="input-error-icon">
//                                         <BiError />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-sm-6">
//                             <div className="button1">
//                                 <label htmlFor="upload-file" type="button" className="upload">
//                                     Upload resume
//                                 </label>
//                                 <input
//                                     type="file"
//                                     id="upload-file"
//                                     accept=".pdf"
//                                     onChange={
//                                         e => setFile(e.target.files[0])
//                                     }
//                                 />
//                                 <div className="d-flex justify-content-between">
//                                     {file && (
//                                         <>
//                                             <p className="file-name">{file.name}</p>
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-sm text-sm-start text-danger"
//                                                 onClick={() => setFile(null)}
//                                             >
//                                                 <GiCancel />
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                                 <p className="explanation">
//                                     Uploading your resume is not a must, but it helps those who
//                                     are looking for specific qualification
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="col-sm-6">
//                             <div className="button1 end  btn-1 ">
//                                 <button type="button" className="submit" onClick={handleSubmit}>
//                                     Submit
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Mentor;
