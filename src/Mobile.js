import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import Swal from 'sweetalert2'
import axios from 'axios';



const Mobile = () => {
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [OTP, setOTP] = useState(''); // To store OTP input
    const [otpSent, setOtpSent] = useState(false); // To track if OTP was sent
    const [isDisabled, setIsDisabled] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const navigate = useNavigate()

    const handleChange = (event) => {
        const { value } = event.target;
        const filteredValue = value.replace(/\D/g, '');
        setMobile(filteredValue);
    };

    const validate = () => {
        const phonePattern = /^\d{10}$/;

        if (!phonePattern.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return false; // Return false if validation fails
        } else {
            setError('');
            return true; // Return true if validation passes
        }
    }
    const OTPValid = () => {
        const OtpPattern = /^\d{6}$/;

        if (!OtpPattern.test(OTP)) {
            setError2('Please enter a valid 6-digit OTP.');
            return false; // Return false if validation fails
        } else {
            setError2('');
            return true; // Return true if validation passes
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            const data = new FormData()
            data.append('user_mobile', mobile)
            axios.post('https://akashsir.in/myapi/atecom1/api/api-otp-login.php', data)
                .then(res => {
                    const receivedOTP = res.data.mobile_otp
                    const userObject = res.data.message
                    if (userObject === 'Mobile Number Not Registered') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Mobile Number Not Registered',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                    else {
                        setOtpSent(true); // Set OTP sent state to true
                        Swal.fire({
                            text: userObject.slice(0, 8),
                            title: receivedOTP,
                            icon: "success"
                        });
                    }
                })
                .catch(error => {
                    alert("Error during Sending OTP :" + error);
                    console.error('Error during Sending OTP :', error)
                })
                .finally(() => setIsSubmitting(false));
        }
    };
    const ResendOTP = (event) => {
        event.preventDefault();
        setIsDisabled(true);
        setSeconds(30);

        // Start countdown
        const countdown = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Re-enable the button after 30 seconds
        setTimeout(() => {
            clearInterval(countdown); // Stop the countdown
            setIsDisabled(false);     // Enable the button
            setSeconds(0);            // Reset the timer
        }, 30000);

        if (validate()) {
            const data = new FormData()
            data.append('user_mobile', mobile)
            axios.post('https://akashsir.in/myapi/atecom1/api/api-otp-resend.php', data)
                .then(res => {
                    const receivedOTP = res.data.mobile_otp
                    const userObject = res.data.message
                    if (userObject === 'Mobile No Not Matched With System') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Mobile Number Not Registered',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                    else {
                        setOtpSent(true); // Set OTP sent state to true
                        Swal.fire({
                            text: userObject.slice(0, 8),
                            title: receivedOTP,
                            icon: "success"
                        });
                    }
                })
                .catch(error => {
                    alert("Error during Sending OTP :" + error);
                    console.error('Error during Sending OTP :', error)
                })
        }
    }
    // Handle OTP input change
    const handleOTPChange = (event) => {
        setOTP(event.target.value);
    };

    // Handle OTP verification with the API
    const handleOTPVerification = () => {
        if (OTPValid()) {
            setIsSubmitting(true);
            const data = new FormData();
            data.append('user_mobile', mobile);
            data.append('mobile_otp', OTP); // Send the entered OTP to the API
            axios.post('https://akashsir.in/myapi/atecom1/api/api-otp-verify.php', data)
                .then(res => {
                    const userObject = res.data.message;
                    if (userObject === 'You Have Successfully Logged In') {
                        Swal.fire({
                            title: 'OTP Verified',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        localStorage.setItem("uid", res.data.user_id)
                        localStorage.setItem("is_login", true)
                        navigate('/home')
                    } else {
                        Swal.fire({
                            title: 'Invalid OTP',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    alert("Error during OTP Verification: " + error);
                    console.error('Error during OTP Verification:', error);
                })
                .finally(() => setIsSubmitting(false));
        }
    };
    return (
        <>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Login ❆</p>
            < div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h3 className='my-4'>Log in with Mobile No.</h3>
                <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                    <input type="text" class="form-control" style={{ width: '300px' }} maxlength="10" value={mobile} onChange={handleChange} name="mobile" placeholder='Mobile no.' />{error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} <br />
                    {!otpSent && (
                        <button type="submit" className="p-1 btn btn-success w-100" style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }}>{isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Sending...</span>) : (<span>Get OTP</span>)}</button>
                    )}
                    {otpSent && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    type="button"
                                    className={`p-1 btn btn-primary w-30 ${isDisabled ? 'blur' : ''}`}
                                    onClick={ResendOTP}
                                    disabled={isDisabled}
                                >
                                    {isDisabled ? `Resend OTP (${seconds}s)` : "Resend OTP"}
                                </button>
                            </div>
                            <h3 className='my-4' style={{ textAlign: 'center' }}>Verify your OTP</h3>

                            <input
                                type="text"
                                className="form-control mt-3"
                                style={{ width: '300px' }}
                                maxLength="6"
                                value={OTP}
                                onChange={handleOTPChange}
                                placeholder='Enter OTP'
                            />{error2 && <div style={{ color: 'red', marginTop: '10px' }}>{error2}</div>} <br />
                            <button
                                type="button"
                                className="p-1 btn btn-primary w-100 mt-3"
                                onClick={handleOTPVerification}
                                style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }}>
                                {isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Verifying...</span>) : (<span>Verify OTP</span>)}
                            </button>
                        </>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '3.5' }}>
                        <hr style={{ backgroundColor: '#DEE2E6', width: '45%', display: 'inline-block' }} />&nbsp;&nbsp;<span style={{ color: '#C7C8C9', }}>Or</span>&nbsp;&nbsp;<hr style={{ backgroundColor: '#DEE2E6', width: '45%', display: 'inline-block' }} />
                    </div>
                    <p className='text-center'>Login with <Link to={'/login'} className='onhover' style={{ textDecoration: 'none', color: '#0D6EFD' }}>Email</Link></p>
                    <p className='text-center'>New to BigBazar? <Link to={'/signup'} className='onhover' style={{ textDecoration: 'none', color: '#0D6EFD' }}>Sign up</Link></p>
                </form>
            </div>
        </>
    )
}

export default Mobile

