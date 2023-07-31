import { Route, Routes } from "react-router-dom"
import Wizard from "../components/mneteeProfORmentorProf"
import MentoringOpportunities from "../components/mentorOpp/MentoringOpportunities"
import MentoringRequest from "../components/mentorOpp/MentoringRequest"
import Profile from "../pages/Profile/Profile"

import {
    Login, Resgister, ContactUs, MentoringOpportunityForm,
    ResetPassword, Selectlist, ShowReqest, ShowOpp, SearchMentor,
    Opportunities, Requests, MentorReqForm, UpdateProfile, SearchMentee, NotFound, Home, ForgetPassword,
} from "../pages"
import { Header } from "antd/es/layout/layout"

const Routerl = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Resgister />} />
            <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/Profiles" element={<Wizard />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            
            <Route path='' element={<Selectlist />}>
                <Route path='/mentor' element={<SearchMentor />} />
                <Route path='/mentee' element={<SearchMentee />} />
                <Route path='/opp' element={<Opportunities />} />
                <Route path='/reqs' element={<Requests />} />
            </Route>
            
            <Route path="/ShowReq/:id" element={<ShowReqest />} />
            <Route path="/ShowOpp/:id" element={<ShowOpp />} />
            <Route path="/PostRequest" element={<MentorReqForm />} />
            <Route path="/PostOpp" element={<MentoringOpportunityForm />} />
            <Route path="/mentoroppapp" element={<MentoringOpportunities />} />
            <Route path="/mentorreqapp" element={<MentoringRequest />} />
            <Route path="/external" element={<Profile />} />
            <Route path='/edituser' element={<UpdateProfile />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}


export default Routerl