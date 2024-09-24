import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import './App.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const validate = () => {
        let errors = {};
        if (!formData.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid format, hint: example@gmail.com";

        if (!formData.password) errors.password = "Password is required";
        // You can add more password rules here (e.g., minimum length)

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (validate()) {
            const data = new FormData()
            data.append('user_email', formData.email)
            data.append('user_password', formData.password)
            axios.post('https://akashsir.in/myapi/atecom1/api/api-login.php', data)
                .then(res => {
                    const userObject = res.data
                    if (userObject && userObject.user_name) {
                        localStorage.setItem('username', userObject.user_name)
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        localStorage.setItem("uid", res.data.user_id)
                        localStorage.setItem("is_login", true)
                        navigate('/home')
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Login Failed',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(error => {
                    alert("Error during Login:" + error);
                    console.error('Error during login', error)
                })
                .finally(() => setIsSubmitting(false));
        }
    }
    return (
        <>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Login ❆</p>
            < div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h3 className='my-4'>Log in to your account</h3>
                <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                    <input type="text" class="form-control" style={{ width: '300px' }} name="email" placeholder='EMAIL' value={formData.email} onChange={handleChange} />{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} <br />
                    <div style={{ position: 'relative', width: '300px' }}>
                        <input type={showPassword ? "text" : "password"} class="form-control" style={{ width: '300px' }} name="password" placeholder='PASSWORD' value={formData.password} onChange={handleChange} />
                        <span
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#FF7B00' }}>
                            {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" /></svg>}
                        </span>
                    </div>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    <Link to={'/forgot-password'} style={{ textDecoration: 'none', color: '#0D6EFD', lineHeight: '3.5', marginLeft: '160px' }} className='onhover'>Forgot password?</Link><br />
                    <button type="submit" className="p-1 btn btn-success w-100" style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }}>{isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Logging in...</span>) : (<span>Log In</span>)}</button>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '3.5' }}>
                        <hr style={{ backgroundColor: '#DEE2E6', width: '45%', display: 'inline-block' }} />&nbsp;&nbsp;<span style={{ color: '#C7C8C9', }}>Or</span>&nbsp;&nbsp;<hr style={{ backgroundColor: '#DEE2E6', width: '45%', display: 'inline-block' }} />
                    </div>
                    <p className='text-center'>Login with <Link to={'/mobile'} className='onhover' style={{ textDecoration: 'none', color: '#0D6EFD' }}>OTP</Link></p>
                    <p className='text-center'>New to BigBazar? <Link to={'/signup'} className='onhover' style={{ textDecoration: 'none', color: '#0D6EFD' }}>Sign up</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login

