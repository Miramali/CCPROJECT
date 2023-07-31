import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Localhost } from '../../config/api';
import { Error, Success } from '../../components/Toast';
import Logo from '../../components/logo';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${Localhost}/api/v1/forgetPassword`,
                { email },
                {
                    withCredentials: true,
                }
            );
            Success(response.data)
        } catch (error) {
            Error('The email is Error')
        }
    };

    return (
        <>
            <Logo />
            <div className="container1">
                <h3>Forget Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group1">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='btn'>Send</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </>
    );
};

export default ForgetPassword;
