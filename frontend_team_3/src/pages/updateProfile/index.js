import React, { useState,useEffect } from "react";
import { useSelector} from 'react-redux';
import "./style.css";
import SidaNav2 from "../../pages/showReq/sideBar/index";
import hero from "../../assets/images/colored_background.jpg";
import Trush from "@iconscout/react-unicons/icons/uil-trash";
import Add from "@iconscout/react-unicons/icons/uil-plus-circle";
import Clud from "@iconscout/react-unicons/icons/uil-cloud-upload";
import Cam from "@iconscout/react-unicons/icons/uil-camera";
import Calendr from "@iconscout/react-unicons/icons/uil-calender";
import Mail from "@iconscout/react-unicons/icons/uil-fast-mail";
import { Localhost } from '../../config/api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import woman from "../../assets/images/woman2.png";

const { Dragger } = Upload;

// ====================================================

// ================================================

const UpdateProfile = () => {
    axios.defaults.withCredentials =true;
    const user = useSelector(state=> state.currentUser)
    console.log(user)
   
      const userId = user?._id
      const userRole = user?.role
      const baseURL = "http://localhost:5000/";
      const [data, setData]= useState({})
     const [editedData, setEditedData] = useState({ avatar: ""}); 
    // const [editedSkills, setEditedSkills] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    
    //   });
//////////////////////////////////////////////////////FETCH DATA 
useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (userRole ==="mentee"){
            const response = await axios.get('http://localhost:5000/api/v1/mentorProfile/user/'+`${userId}`
        
        );
        setData(response.data);
        setEditedData(response.data);
        console.log(editedData._id)
   
        
        }else if (userRole ==="mentor"){
            const response = await axios.get('http://localhost:5000/api/v1/menteeProfile/user/'+`${userId}`
              
        
        );
        setData(response.data); 
        setEditedData(response.data); // Set initial editedData to fetched data
    
       console.log(editedData._id)
    
      
    }} catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

////////////////////////Upload Part////////////////////////////////////
// const avatarURL = baseURL + editedData.avatar.replace("\\", "/");
        useEffect(()=>{
            const storedAvatar = localStorage.getItem("avatar");
            if (storedAvatar) {
            setEditedData((prevData) => ({ ...prevData, avatar: storedAvatar }));}
        },[]);
        let avatarURL;

        if (editedData && editedData.avatar && (editedData.avatar instanceof Blob || editedData.avatar instanceof File)) {
        avatarURL = URL.createObjectURL(editedData.avatar);
        } else if (editedData && editedData.avatar) {
        // If editedData.avatar is defined but not a Blob or File, attempt to replace backslashes with forward slashes
        const sanitizedAvatar = editedData.avatar.replace(/\\/g, "/");
        avatarURL = baseURL + sanitizedAvatar;
        } else {
        // Handle the case where editedData.avatar is not a valid object or undefined
        // You might want to set a default avatar URL or handle this case differently
        avatarURL = {woman};
        }

// const avatarURL = baseURL + editedData.avatar?.replace("\\", "/");
//////////////////////////////////////////////////////////////
    const [file, setFile] = useState(null);

      const handleFileChange2 = (info) => {
      const fileList = [...info.fileList];
      if (fileList.length > 0) {
        setFile(fileList[0].originFileObj);
      }
    };
  
    const handleUpload = async () => {
      if (!file || !userId) {
        return;
      }
  
      const formData = new FormData();
      formData.append('cv', file)
     
  
      try {
        const response = await axios.post(
          `${Localhost}/api/v1/cv/upload/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
           
            },
          }
        );
  
        if (response.status === 200) {
          console.log('CV uploaded successfully');
          
        } else {
          console.log('CV upload failed');
        }
      } catch (error) {
        console.log('Error uploading CV:', error);
        
        }
    };
    ////////////////////////END UPLOAD PART///////////////////////
const profileId=editedData?._id

    /////////////////////////////////////////////////////
    // logic start  to edit Simple Data-----------
    function handleEdit(field, value) {
        console.log("Setting " + field + ":", value);
        setEditedData((prevData) => ({
          ...prevData,
          [field]: value,
        
        }));
      };
      const handleImageChange = async (e) => {

        const avatar = e.target.files[0];
        if (!avatar) {
            console.log("No file selected");
            return;
          }
        
        const formData = new FormData();
       formData.append('avatar', avatar)
       console.log(profileId)
      

      try {
        const response = await axios.post
            // ('http://localhost:5000/api/v1/menteeProfile/'+`${profileId}`,
            ('http://localhost:5000/api/v1/cv/upload/avatar/'+`${profileId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            
            },
          }
        );
        
  
        if (response.status === 200) {
          console.log('Avatar uploaded successfully');
          setEditedData((prevData) => ({
            ...prevData,
                        
            avatar: response.data.avatarPath,
            }));
          
            localStorage.setItem('avatar', response.data.avatarPath);

        } else {
          console.log('avatar upload failed');
        }
      } catch (error) {
        console.log('Error uploading avatar:', error);
        
        }
        console.log(editedData)
    }

      const handleImageClick = () => {
        // Trigger the hidden file input when the image is clicked
        const fileInput = document.getElementById("avatar-input");
        fileInput.click();
      };
      /////////////////////////END IMAGE  AVATAR UPLOAD /////////////////////////////////////////////
      
      ///////////////////////////////SKILL  and Expertise PART to edit with index///////////

      const handleFieldChange = (field, index, value) => {
        setEditedData((prevData) => {
          const updatedData = { ...prevData };
        
        if (field === "expertise") {
           
            updatedData.expertise[index] = { ...updatedData.expertise[index], ...value };

          } else {
            updatedData[field][index] = value;
          }
          return updatedData;
        });
      };
    
      // Function to handle editing of skills or expertise
      const handleEditData = (index) => {
        setEditingIndex(index);
      };
    
      // Function to handle saving the edited skill or expertise
      const handleSaveData = () => {
        setEditingIndex(-1); // Reset editingIndex to stop editing mode
        
      };
    
      const handleKeyDown = (index, e, field) => {
        if (e.key === 'Enter') {
          handleSaveData(index);
        }
      };
      

         ///////////////////////////////////
      const handleDeleteRow = (index) => {
    setEditedData((prevData) => {
      const newExpertise = [...prevData.expertise];
      newExpertise.splice(index, 1);
      return {
        ...prevData,
        expertise: newExpertise,
      };
    });
  };
  const generateUniqueId = () => {
    // Use the uuidv4() method to generate a unique ID
    const uniqueId = uuidv4();
    return uniqueId;
  };
  const handleAddRow = () => {
    setEditedData((prevData) => ({
      ...prevData,
      expertise: [
        ...prevData.expertise,
        {
          id: generateUniqueId(), // Generate a unique ID for the new expertise item
          name: '',
          from: '',
          to: '',
        },
      ],
    }));
  };
     
//::::::::::::::::::::://////////end expertise////////////////////////////:

//////////////////////////////////////////////////////////////////////////////////////////////////
  
  console.log(profileId, editedData)

    const handleSave1 = async () => {
        
         const updatedProfileData = {
            ...editedData,
            
            
               };
        console.log(updatedProfileData);
       
        
      
        // Perform an API call to save the edited data to the backend
        try {
            if(userRole==="mentee"){
          const response = await axios.patch(
            'http://localhost:5000/api/v1/mentorProfile/'+`${profileId}`, // Replace with your API endpoint for updating the profile data
            
            updatedProfileData
            
          );
          if (response.status === 200) {
            console.log('Profile data updated successfully');
            // Optionally, update the fetchedData state to reflect the changes
            setEditedData(updatedProfileData);
            console.log(updatedProfileData);

            handleUpload();
            toast.success('Profile Data Updated successfully!', {
                position: 'top-center',
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  minWidth: '200px', 
                  maxWidth: '400px', 
                },
              });
          } else {
            console.log('Profile data update failed');
            toast.error('Failed on updating Profile. Please  try again.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  minWidth: '200px', // Set the minimum width for the toast box
                  maxWidth: '400px', // Set the maximum width for the toast box
                },
              });
          }
        } else if(userRole==="mentor"){
            const response = await axios.patch(
                'http://localhost:5000/api/v1/mentorProfile/'+`${profileId}`, // Replace with your API endpoint for updating the profile data
                updatedProfileData               
              );
              if (response.status === 200) {
                console.log('Profile data updated successfully');
                setEditedData(updatedProfileData);
                console.log(updatedProfileData);

                handleUpload();
                toast.success('Profile Data Updated successfully!', {
                    position: 'top-center',
                    autoClose: 3000, // Close the toast after 3 seconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: {
                      minWidth: '200px', 
                      maxWidth: '400px', 
                    },
                  });
              } else {
                console.log('Profile data update failed');
              }
          }
                } catch (error) {
                console.log('Error updating profile data:', error);
                toast.error('Failed on updating Profile. Please  try again.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: {
                    minWidth: '200px', // Set the minimum width for the toast box
                    maxWidth: '400px', // Set the maximum width for the toast box
                    },
                });
        }
      };
      
       const handleSave = () => {
        setEditedData(editedData); // Save the edited data back to the main data state
       setEditingIndex(-1);
      
    };

    // -----------------------above is old ----------------------  //
       
    return (
       <>
       {data.lookingFor==="mentee" ? (
      
        <div className="PersonalInfo d-flex p-1 w-100 m-auto">
            <div className="left-pernav d-sm-flex d-none">
                <SidaNav2 />
            </div>{" "}
            {/** end left-pernav */}
            <div className="mdl-box-personal p-1">
                <div className="personal-top m-auto p-sm-1 p-0">
                    <div className="personal-top-img p-sm-1 p-0 ">
                        <img className="w-100" src={hero} alt="" />
                    </div>
                    <div className="per-box d-flex flex-row-reverse align-items-start gap-2 m-auto p-sm-1 p-0  ">
                        <button className="border-0 p-sm-2 p-1 text-white">message</button>
                        <div className="info-top d-flex flex-column align-items-center ">
                            <div className="gryCircl">
                                 <input
                                id="avatar-input"
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }} // Hide the input element with CSS
                                />

                                {/* Display the avatar */}
                                {avatarURL ? (
                                typeof editedData.avatar === "string" ? (
                                    <img
                                    src={avatarURL}
                                    alt="Avatar"
                                    className="gryCircl"
                                    onClick={handleImageClick}
                                    />
                                ) : (
                                    <img
                                    // src={URL.createObjectURL(editedData.avatar)}
                                    src={avatarURL}
                                    alt="Avatar"
                                    className="gryCircl"
                                    onClick={handleImageClick}
                                    />
                                )
                                ) : (
                                <div className="gryCircl" onClick={handleImageClick}>
                                    <div
                                    className="default-avatar" // Add a CSS class to style the div as an avatar
                                    style={{
                                        backgroundImage: editedData.avatar
                                        ? `url(${editedData.avatar instanceof File ? URL.createObjectURL(editedData.avatar) : editedData.avatar})`
                                        : `url(${woman})`, // Assuming `woman` is the URL to the default avatar image
                                    }}
                                    ></div>
                                </div>
                                )}
                                {" "}
                                <div className="CamSqr d-sm-none d-block">
                                    {" "}
                                    <Cam className="icon" />{" "}
                                </div>{" "}
                            </div> 

                            <h4 className="pt-sm-4 pt-2">{data.user?.name}</h4>
                            <p className="pb-1 m-0">{data?.designation}</p>
                            <h6 className="p-0 m-0 text-white">{userRole}</h6>
                            <div className="iconsBoxBtm d-sm-none d-flex">
                                <Calendr className="icon" /> <Mail className="icon" />{" "}
                            </div>
                        </div>{" "}
                        {/** end per-box */}
                    </div>{" "}
                    {/** end personal-top */}
                </div>{" "}
                {/** end mdl-box-personal */}
                <div className="personal-med my-4">
                    <div className="ul-list-per-med d-flex  ">
                        <ul className="d-flex">
                            <li className="">personal information</li>
                            <li className="">additional information</li>
                        </ul>
                    </div>
                    <div className="form-per-med">
                        <form action="">
                            <div className="form-per-med-box d-flex flex-column w-100 mt-4 p-4 justify-content-between align-items-center">
                                <div className="form-per-med-box-top d-sm-flex d-block justify-content-between w-100 align-items-center">
                                    <div className="form-per-med-left d-flex flex-column m-1 ">
                                        <label htmlFor="">name</label>
                                        <input type="text" 
                                        value={editedData.name || user?.name || ""}
                                        onChange={(e) => handleEdit("name", e.target.value)} />
                                        <label htmlFor="">Designation</label>
                                        <input type="text" 
                                        value={editedData.designation || data?.designation || ""}
                                        onChange={(e) => handleEdit("designation", e.target.value)} />
                                    </div>{" "}
                                    {/** end form-per-med-left */}
                                    <div className="form-per-med-right d-flex flex-column m-1">
                                        <label htmlFor="">phone number</label>
                                        <input type="phone" placeholder="055121515" />
                                        <label htmlFor="">email</label>
                                        <input type="email" 
                                        value={editedData.email || user?.email || ""}
                                        onChange={(e) => handleEdit("email", e.target.value)} />
                                    </div>{" "}
                                    {/** end form-per-med-right */}
                                </div>{" "}
                                {/** end form-per-med-box-top */}
                                {/* Mentor side  */}
                                
                                
                                <div className="form-per-med-box-btm2 d-sm-flex d-block w-100 justify-content-between align-items-center ">
                                    <div className="form-per-med-left-2 flex-column d-flex m-1  ">
                                        <label htmlFor="">Location</label>
                                        <input type="text" 
                                        value={editedData.location || data.location || ""}
                                        onChange={(e) => handleEdit("location", e.target.value)} />
                                    </div>{" "}
                                    {/** end form-per-med-left-2 */}
                                    <div className="form-per-med-right-2 d-flex flex-column m-1">
                                        
                                        <label htmlFor="">job description</label>
                                        <input type="text" 
                                        value={editedData.designation || data.designation || ""}
                                        onChange={(e) => handleEdit("designation", e.target.value)} />
                                    </div>{" "}
                                    {/** end form-per-med-right-2  */}
                                </div>
                                {/* ////////////////////////////////////////////////////// */}
                                <div className="form-per-med-box-btm3 d-sm-flex flex-column d-none w-100 justify-content-between align-items-center ">
                            <div className="form-per-med-left-3 w-100 d-flex justify-content-between ">
                                <div className="form-per-Boxx">
                                    <label htmlFor="" className="W-50 my-4">
                                        experience
                                    </label>
                                </div>
                                <div className="right-leb w-50 d-flex  ">
                                <label htmlFor="" className=" w-50">
                                    from
                                </label>
                                <label htmlFor="" className=" w-50">
                                    to
                                </label>
                            </div>
                    
                            </div>
                                </div>
                                {/*  end mentor web */}
                                 {/** end form-per-med-box-btm2 */}

     {/** right-lab */}

 {/** end form-per-med-left-2 */}
 {editedData.expertise?.map((item, index) => (
    <div
      className="form-per-med-med-3 w-100 d-flex justify-content-between align-items-center"
      key={index}
    >
      <div className="boxx w-50">
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => handleFieldChange('expertise', index, { ...item, name: e.target.value })}
          onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
          autoFocus
        />
      </div>
      <div className="input-box d-flex w-25">
        <input
          type="number"
          value={item.from || ''}
          onChange={(e) => handleFieldChange('expertise', index, { ...item, from: parseInt(e.target.value) })}
          onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
        />
      </div>
      <div className="input-box d-flex w-25">
        <input
          type="number"
          value={item.to || ''}
          onChange={(e) => handleFieldChange('expertise', index, { ...item, to: parseInt(e.target.value) })}
          onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
        />
         <div className="icon-box">
        {editedData.expertise?.length === 1 ? (
          <>
            <Add className="icon" onClick={()=> handleAddRow()} />
            <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
          </>
        // ) : index === editedData.expertise?.length - 1 ? (
            ) : index === editedData.expertise?.length - 1 ? (
          <>
            <Add className="icon" onClick={()=> handleAddRow()} />
            <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
          </>
        ) : (
          <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
        )}
      </div>
      </div>
    </div>
  ))}
  

{/* * end form-per-med-box-btm3 */}
{/* --------------mobl st */}
<div className="form-per-med-box-btm5-res d-sm-none d-flex w-100 flex-column justify-content-between  ">
 <div className="form-per-med-left-5 flex-column d-flex  ">
     <label htmlFor="" className="W-100">
         experience
     </label>

     {editedData.expertise?.map((item, index) => (
         <div
             className="exp-box5 d-flex w-100 flex-column justify-content-between align-items-end my-3 "
             key={index}
         >
             <div className="exp-inpt5 d-flex w-100 justify-content-center align-items-center ">
                 <input
                     type="text"
                     className=" w-100"
                     value={item.name|| ''}
                     onChange={(e) => handleFieldChange('expertise', index, { ...item, name: e.target.value  })}
                     onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
                 />
                                <div className="icon-box">
                        {editedData.expertise?.length === 1 ? (
                        <>
                            <Add className="icon" onClick={()=> handleAddRow()} />
                            <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
                        </>
                        // ) : index === editedData.expertise?.length - 1 ? (
                            ) : index === editedData.expertise?.length - 1 ? (
                        <>
                            <Add className="icon" onClick={()=> handleAddRow()} />
                            <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
                        </>
                        ) : (
                        <Trush className="icon" onClick={() => handleDeleteRow(item.id)} />
                        )}
                    </div>
             </div>
             <div className="exp-btm-box d-flex gap-2 w-100 my-2">
                 <div className="exp-btm-bo-left d-flex  flex-column">
                     <label htmlFor="" className=" mb-2">
                         from
                     </label>
                     <input
                         type="number"
                          value={item.from || ''}
                         onChange={(e) => handleFieldChange('expertise', index, { ...item, from: parseInt(e.target.value) })}
                         onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
                         className="p-2"
                     />
                 </div>
                 <div className="exp-btm-bo-right  d-flex flex-column">
                     <label htmlFor="" className="  mb-2">
                         to
                     </label>
                     <input
                         type="number"
                         value={item.to || ''}
                         onChange={(e) => handleFieldChange('expertise', index, { ...item, to: parseInt(e.target.value) })}
                         onKeyDown={(e) => handleKeyDown(index, e, 'expertise')}
                         className="p-2"
                     />
                 </div>
             </div>
         </div>
     ))}
 </div>
 {/** end form-per-med-left-5*/}
</div>
{/** end form-per-med-box-btm5-res */}
{/* ------------------mobl end */}
{/* /////////////////////////////////////////////////////////////////////////////////: */}


                                {/** end form-per-med-left-4 */}
                                <div className="form-per-med-left-5 col-md-12  my-4">
                                    <label htmlFor="" className="W-100 ">
                                        Upload CV
                                    </label>
                                    <div className="form-per-med-left-5-btmBox d-flex flex-colum justify-content-center align-items-center">
                                        <div className="icons-text d-flex flex-column w-100 justify-content-center align-items-center my-2">
                                            <div className="icons flex-colum d-flex flex-colum justify-content-center align-items-center my-2 ">
                                                {/* <Arr className="ic2" /> */}
                                                <Clud className="ic1" />
                                            </div>
                                            <div className="upload-box d-flex p-1 m-2 flex-colum justify-content-center align-items-center ">
                                                {/* <Upload.Dragger className='upld-ic' >      */}
                                                <Dragger
        accept=".jpeg, .png , .gif , .mp4 , .ai , .psd , .word , .ppt ,.pdf"
        className="upld-ic"
        fileList={[]}
        onChange={handleFileChange2}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Dragger>
                                            </div>
                                            {/** end upload-box */}
                                            <p>
                                                supported formates : JPEG , PNG , GIF , MP4 , AI , PSD ,PDF
                                                Word , PPT{" "}
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/** end form-per-med-left-5-btmBox */}
                                </div>{" "}
                                {/** end form-per-med-left-5 */}
                                <Button className='p-2 text-white d-flex justify-content-center align-items-end border-0 '  onClick={() => { handleSave1();  }} >SAVE</Button>
                               
                            </div>{" "}
                            {/** end form-per-med-box */}
                        </form>
                    </div>{" "}
                    {/** end form-per-med */}
                </div>{" "}
                {/** end personal-med */}
            </div>{" "}
            {/** end container-box */}
            <div className="messages3">
                <div
                    className="col-lg-3  col-12  message-part mb-5 "
                    id="message-items"
                >
                    <div
                        className="search-bar  d-lg-flex  d-none mt-4 "
                        style={{ width: "fit-content" }}
                    >
                        <input
                            type="search"
                            placeholder="search direct messages"
                            id="message-search"
                            onkeyup="searching()"
                        />
                        <i className="fa-solid fa-magnifying-glass magnifying-glass-1"></i>
                    </div>

                    <div className="message " id="Message">
                        <div
                            className="message-img mt-3  "
                            style={{ width: "70px", height: "70px" }}
                        >
                            <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                        </div>

                        <div className="message-body">
                            <h5 className="small fw-bold">Balqees Hamdy </h5>
                            <p className="small message-p">
                                econmoicc dollar is more exciting
                                <a href="#">
                                    {" "}
                                    <i
                                        className="fa-solid fa-trash-can d-md-none d-block"
                                        id="trash"
                                        job="delete"
                                    ></i>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="message message2  " id="Message">
                        <div
                            className="message-img mt-2  "
                            style={{ width: "70px", height: "70px" }}
                        >
                            <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                        </div>

                        <div className="message-body">
                            <h5 className="small fw-bold">Mona Maher</h5>
                            <p className="small message-p">
                                econmoicc dollar is more exciting
                                <a href="#">
                                    <i
                                        className="fa-solid fa-trash-can  d-md-none d-block"
                                        id="trash"
                                        job="delete"
                                    ></i>
                                </a>
                            </p>
                        </div>

                        <div className="message message2" id="Message">
                            <div
                                className="message-img mt-3  "
                                style={{ width: "70px", height: "70px" }}
                            >
                                <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                            </div>

                            <div className="message-body">
                                <h5 className="small fw-bold">Salma Ahmad</h5>
                                <p className="small message-p">
                                    econmoicc dollar is more exciting
                                    <a href="#">
                                        <i
                                            className="fa-solid fa-trash-can d-md-none d-block"
                                            id="trash"
                                            job="delete"
                                        ></i>
                                    </a>
                                </p>
                            </div>

                            <button
                                className="message-button  mt-3 mb-4 col-lg-11 col-11"
                                id="message-button"
                                onclick="sending_newmessage()"
                            >
                              
                                New Message <i className="fa-solid fa-envelope"></i>
                            </button>
                            <div className="message_content " id="message_content">
                                <input
                                    type="text"
                                    className="textbox ml-10"
                                    placeholder="To : "
                                    id="To"
                                />

                                <input className="input-text" id="bodyy" />
                                <button type="submit" id="send_message" className="mb-3">
                                    Send <i className="fa-solid fa-envelope"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       ):(
        <div className="PersonalInfo d-flex p-1 w-100 m-auto">
            <div className="left-pernav d-sm-flex d-none">
                <SidaNav2 />
            </div>{" "}
            {/** end left-pernav */}
            <div className="mdl-box-personal p-1">
                <div className="personal-top m-auto p-sm-1 p-0">
                    <div className="personal-top-img p-sm-1 p-0 ">
                        <img className="w-100" src={hero} alt="" />
                    </div>
                    <div className="per-box d-flex flex-row-reverse align-items-start gap-2 m-auto p-sm-1 p-0  ">
                        <button className="border-0 p-sm-2 p-1 text-white">message</button>
                        <div className="info-top d-flex flex-column align-items-center ">
                            <div className="gryCircl">
                            {console.log("Avatar URL:", editedData.avatar)}
                            {console.log("Avatar type:", typeof editedData.avatar)}

                                {/* image  */}    
                                                                
                                        <input
                                        id="avatar-input"
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }} // Hide the input element with CSS
                                        />

                                        {/* Display the avatar */}
                                        {avatarURL ? (
                                        typeof editedData.avatar === "string" ? (
                                            <img
                                            src={avatarURL}
                                            alt="Avatar"
                                            className="gryCircl"
                                            onClick={handleImageClick}
                                            />
                                        ) : (
                                            <img
                                            // src={URL.createObjectURL(editedData.avatar)}
                                            src={avatarURL}
                                            alt="Avatar"
                                            className="gryCircl"
                                            onClick={handleImageClick}
                                            />
                                        )
                                        ) : (
                                        <div className="gryCircl" onClick={handleImageClick}>
                                            <div
                                            className="default-avatar" // Add a CSS class to style the div as an avatar
                                            style={{
                                                backgroundImage: editedData.avatar
                                                ? `url(${editedData.avatar instanceof File ? URL.createObjectURL(editedData.avatar) : editedData.avatar})`
                                                : `url(${woman})`, // Assuming `woman` is the URL to the default avatar image
                                            }}
                                            ></div>
                                        </div>
                                        )}
                                      {" "}
                                <div className="CamSqr d-sm-none d-block">
                                    {" "}
                                    <Cam className="icon" />{" "}
                                    {/* end image */}
                                </div>{" "}
                            </div>

                            <h4 className="pt-sm-4 pt-2">{user?.name}</h4>
                            <p className="pb-1 m-0">{data.designation}</p>
                            <h6 className="p-0 m-0 text-white">{userRole}</h6>
                            <div className="iconsBoxBtm d-sm-none d-flex">
                                <Calendr className="icon" /> <Mail className="icon" />{" "}
                            </div>
                        </div>{" "}
                        {/** end per-box */}
                    </div>{" "}
                    {/** end personal-top */}
                </div>{" "}
                {/** end mdl-box-personal */}
                <div className="personal-med my-4">
                    <div className="ul-list-per-med d-flex  ">
                        <ul className="d-flex">
                            <li className="">personal information</li>
                            <li className="">additional information</li>
                        </ul>
                    </div>
                    <div className="form-per-med">
                        <form action="">
                            <div className="form-per-med-box d-flex flex-column w-100 mt-4 p-4 justify-content-between align-items-center">
                                <div className="form-per-med-box-top d-sm-flex d-block justify-content-between w-100 align-items-center">
                                    <div className="form-per-med-left d-flex flex-column m-1 ">
                                        <label htmlFor="">name</label>
                                        <input type="text" 
                                        value={editedData.name || user?.name || ""}
                                        onChange={(e) => handleEdit("name", e.target.value)}/>

                                        <label htmlFor="">Designation</label>
                                        <input type="text" 
                                        value={editedData.designation || data?.designation || ""}
                                        onChange={(e) => handleEdit("designation", e.target.value)}
                                       
                                         />
                                    </div>{" "}
                                    {/** end form-per-med-left */}
                                    <div className="form-per-med-right d-flex flex-column m-1">
                                        <label htmlFor="">phone number</label>
                                        <input type="phone" placeholder="055121515"
                                        value={editedData.phone || data.phone|| ""}
                                        onChange={(e) => handleEdit("phone", e.target.value)} />
                                        <label htmlFor="">email</label>
                                        <input type="email" 
                                        value={editedData.email || user?.email || ""}
                                        onChange={(e) => handleEdit("email", e.target.value)} />
                                    </div>{" "}
                                    {/** end form-per-med-right */}
                                </div>{" "}
                                {/** end form-per-med-box-top */}
                                {/* Mentor side  */}
                                
                                
                                <div className="form-per-med-box-btm2 d-sm-flex d-block w-100 justify-content-between align-items-center ">
                                    <div className="form-per-med-left-2 flex-column d-flex m-1  ">
                                        <label htmlFor="">Location</label>
                                        <input type="text" 
                                         value={editedData.location || data.location || ""}
                                         onChange={(e) => handleEdit("location", e.target.value)} />
                                    </div>{" "}
                                   
                                    {/** end form-per-med-right-2  */}
                                </div>
                               
                                
                                <div className="form-per-med-left-4 col-md-12 my-4 my-sm-2">
                                    <label htmlFor="" className="W-100">
                                        Skills
                                    </label>
                                    <div className="form-per-med-left-4-btmBox  d-flex">
                                        <ul className="d-flex list-0 list-none">
                                        {editedData.skills?.map((skill, index) => (
                                        <li key={index}>
                                            {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={skill || ''}
                                                onChange={(e) => handleFieldChange('skills', index, e.target.value)}
                                                onBlur={() => handleSave()}
                                                onKeyDown={(e) => handleKeyDown(index, e, 'skills')}
                                                autoFocus
                                            />
                                            ) : (
                                            <span onClick={() => handleEditData(index)}>{skill}</span>
                                            // <button onClick={addNewSkill}>Add Skill</button>
                                            )}
                                        </li>
                                        ))}
                                           <li>
                                           {editingIndex === editedData.skills?.length ? (
    <input
        type="text"
        value={editedData.skills[editingIndex] || ''}
        onChange={(e) => handleFieldChange('skills', editingIndex, e.target.value)}
        onBlur={() => handleSaveData()}
        onKeyDown={(e) => handleKeyDown(editingIndex, e, 'skills')}
        autoFocus
    />
    ) : (
    <span onClick={() => setEditingIndex(editedData.skills.length)}>Add Skill</span>
    )}
                                           </li>
    
                                            
                                            
                                        </ul>
                                    </div>{" "}
                                    {/** end form-per-med-left-4-btmBox */}
                                </div>{" "}

                                {/** end form-per-med-left-4 */}
                                <div className="form-per-med-left-5 col-md-12  my-4">
                                    <label htmlFor="" className="W-100 ">
                                        Upload CV
                                    </label>
                                    <div className="form-per-med-left-5-btmBox d-flex flex-colum justify-content-center align-items-center">
                                        <div className="icons-text d-flex flex-column w-100 justify-content-center align-items-center my-2">
                                            <div className="icons flex-colum d-flex flex-colum justify-content-center align-items-center my-2 ">
                                                {/* <Arr className="ic2" /> */}
                                                <Clud className="ic1" />
                                            </div>
                                            <div className="upload-box d-flex p-1 m-2 flex-colum justify-content-center align-items-center ">
                                                {/* <Upload.Dragger className='upld-ic' >      */}
                                                <Dragger
        accept=".jpeg, .png , .gif , .mp4 , .ai , .psd , .word , .ppt ,.pdf"
        className="upld-ic"
        fileList={[]}
        onChange={handleFileChange2}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Dragger>
                                            </div>
                                            {/** end upload-box */}
                                            <p>
                                                supported formates : JPEG , PNG , GIF , MP4 , AI , PSD ,PDF
                                                Word , PPT{" "}
                                            </p>
                                        </div>
                                    </div>{" "}
                                    {/** end form-per-med-left-5-btmBox */}
                                </div>{" "}
                                {/** end form-per-med-left-5 */}
                                <Button className='p-2 text-white d-flex justify-content-center align-items-end border-0 ' onClick={() => { handleSave1(); handleUpload(); }}>SAVE</Button>
                               
                            </div>{" "}
                            {/** end form-per-med-box */}
                        </form>
                    </div>{" "}
                    {/** end form-per-med */}
                </div>{" "}
                {/** end personal-med */}
            </div>{" "}
            {/** end container-box */}
            <div className="messages3">
                <div
                    className="col-lg-3  col-12  message-part mb-5 "
                    id="message-items"
                >
                    <div
                        className="search-bar  d-lg-flex  d-none mt-4 "
                        style={{ width: "fit-content" }}
                    >
                        <input
                            type="search"
                            placeholder="search direct messages"
                            id="message-search"
                            onkeyup="searching()"
                        />
                        <i className="fa-solid fa-magnifying-glass magnifying-glass-1"></i>
                    </div>

                    <div className="message " id="Message">
                        <div
                            className="message-img mt-3  "
                            style={{ width: "70px", height: "70px" }}
                        >
                            <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                        </div>

                        <div className="message-body">
                            <h5 className="small fw-bold">Balqees Hamdy </h5>
                            <p className="small message-p">
                                econmoicc dollar is more exciting
                                <a href="#">
                                    {" "}
                                    <i
                                        className="fa-solid fa-trash-can d-md-none d-block"
                                        id="trash"
                                        job="delete"
                                    ></i>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="message message2  " id="Message">
                        <div
                            className="message-img mt-2  "
                            style={{ width: "70px", height: "70px" }}
                        >
                            <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                        </div>

                        <div className="message-body">
                            <h5 className="small fw-bold">Mona Maher</h5>
                            <p className="small message-p">
                                econmoicc dollar is more exciting
                                <a href="#">
                                    <i
                                        className="fa-solid fa-trash-can  d-md-none d-block"
                                        id="trash"
                                        job="delete"
                                    ></i>
                                </a>
                            </p>
                        </div>

                        <div className="message message2" id="Message">
                            <div
                                className="message-img mt-3  "
                                style={{ width: "70px", height: "70px" }}
                            >
                                <img src="" alt="" style={{ width: "50px", height: "50px" }} />
                            </div>

                            <div className="message-body">
                                <h5 className="small fw-bold">Salma Ahmad</h5>
                                <p className="small message-p">
                                    econmoicc dollar is more exciting
                                    <a href="#">
                                        <i
                                            className="fa-solid fa-trash-can d-md-none d-block"
                                            id="trash"
                                            job="delete"
                                        ></i>
                                    </a>
                                </p>
                            </div>

                            <button
                                className="message-button  mt-3 mb-4 col-lg-11 col-11"
                                id="message-button"
                                onclick="sending_newmessage()"
                            >
                                {" "}
                                New Message <i className="fa-solid fa-envelope"></i>
                            </button>
                            <div className="message_content " id="message_content">
                                <input
                                    type="text"
                                    className="textbox ml-10"
                                    placeholder="To : "
                                    id="To"
                                />

                                <input className="input-text" id="bodyy" />
                                <button type="submit" id="send_message" className="mb-3">
                                    Send <i className="fa-solid fa-envelope"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       )}
        </>
    );
};


export default UpdateProfile;
