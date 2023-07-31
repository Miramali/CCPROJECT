import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import { Localhost } from '../../config/api';
import { useParams } from 'react-router';
import axios from 'axios';
import { Error, Success } from '../../components/Toast';
import Logo from '../../components/logo';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState('');
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${Localhost}/api/v1/resetPassword/${id}/${token}`,
                { password: newPassword },
                { withCredentials: true }
            );
            Success(response.data)
            navigate("/login");
        } catch (e) {
            Error(e.message)
        }
    };

    return (
        <>
            <Logo />
            <div className="container1">
                <h3>Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group1">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Send</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
