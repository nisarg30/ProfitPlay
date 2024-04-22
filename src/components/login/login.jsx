import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; // Import Axios
import './login.css'; // Import CSS file for styles
import '@fortawesome/fontawesome-free/css/all.css';
import BackendLink from '../../datasource/backendlink';
import { useAuthorization } from '../../context/Authcontext';

const Login = () => {
    const history = useNavigate();
    const { isLoggedIn, login, logout, setWatchlists} = useAuthorization();
    const [isActive, setIsActive] = useState(false);

    const [remail, rsetEmail] = useState('');
    const [rusername, rsetUsername] = useState('');
    const [rpassword, rsetPassword] = useState('');
    const [rconfpass, rsetConfPass] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Error states
    const [registerError, setRegisterError] = useState('');
    const [loginError, setLoginError] = useState('');

    // Regular expressions for email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // Validation for login inputs
        if (!username || !password) {
            setLoginError('Email and password are required');
            return; 
        }
        try {
            const response = await axios.post(BackendLink.login, { username, password });
            console.log('Login successful!');
            if( response.status === 200 ) {
                console.log(response.data.token);
                setWatchlists(response.data.data !== null ?  response.data.data: []);
                login(response.data.token);
                history('../orders');
            } else if(response.status === 403 ) {
                setLoginError('Invalid email or password');
            }else if(response.status === 404 ) {
                setLoginError('User does not exist');
            }else {
                setLoginError('Something went wrong');
            }
        } catch (error) {
            console.error('Login failed!', error);
            setLoginError('Invalid email or password');
        }
        setPassword('');
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        // Validation for registration inputs
        if (!remail || !rusername || !rpassword || !rconfpass) {
            setRegisterError('All fields are required');
        } else if (!emailRegex.test(remail)) {
            setRegisterError('Invalid email format');
        } else if (!passwordRegex.test(rpassword)) {
            setRegisterError('Password must contain at least one digit, one lowercase and one uppercase letter, and be between 6 and 20 characters');
        } else if (rpassword !== rconfpass) {
            setRegisterError('Passwords do not match');
        } else {
            const response = await axios.post(BackendLink.reg, { username: rusername, password: rpassword, email : remail });
            if( response.status === 200 ) {
                setRegisterError('You have registered successfully');
                setTimeout(() => {
                    setIsActive(false);
                }, 3000);
            } else if(response.status === 403 ) {
                setRegisterError('Invalid email or password');
            }else if(response.status === 404 ) {
                setRegisterError('User does not exist');
            }else {
                setRegisterError('Something went wrong');
            }
        }
        rsetConfPass('')
        rsetPassword('');
    };

    return (
        <div className="semi-cont">
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" value={rusername} onChange={(e) => rsetUsername(e.target.value)}/>
                        <input type="email" placeholder="Email" value={remail} onChange={(e) => rsetEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" value={rpassword} onChange={(e) => rsetPassword(e.target.value)}/>
                        <input type="password" placeholder="Confirm Password" value={rconfpass} onChange={(e) => rsetConfPass(e.target.value)}/>
                        <div className="error" style={{color : 'red'}}>{registerError}</div>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <a href="#">→ Forget Your Password? </a>
                        <div className="error" style={{color : 'red'}}>{loginError}</div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of the site features</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of the site features</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
