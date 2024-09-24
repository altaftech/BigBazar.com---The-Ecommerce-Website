import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
    const [data, setData] = useState({
        user_name: '',
        user_gender: '',
        user_email: '',
        user_mobile: '',
        user_address: '',
        user_photo: ''
    });
    const [originalData, setOriginalData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const uid = localStorage.getItem('uid');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile data to prefill the form
        axios.post(`https://akashsir.in/myapi/atecom1/api/api-user-profile.php?user_id=${uid}`)
            .then(res => {
                setData(res.data);
                setOriginalData(res.data); // Store the original data
            })
            .catch(error => console.error(error));
    }, [uid]);

    // Handle form input changes
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Validate form inputs
    const validate = () => {
        let tempErrors = {};

        // Name validation
        if (!data.user_name) tempErrors.user_name = 'Name is required';

        // Email validation
        if (!data.user_email) {
            tempErrors.user_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.user_email)) {
            tempErrors.user_email = 'Email is invalid';
        }

        // Phone validation (must be 10 digits)
        if (!data.user_mobile) {
            tempErrors.user_mobile = 'Phone number is required';
        } else if (!/^\d{10}$/.test(data.user_mobile)) {
            tempErrors.user_mobile = 'Phone number must be 10 digits';
        }

        // Address validation
        if (!data.user_address) tempErrors.user_address = 'Address is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Check if any field has been modified
    const isModified = () => {
        return (
            data.user_name !== originalData.user_name ||
            data.user_gender !== originalData.user_gender ||
            data.user_email !== originalData.user_email ||
            data.user_mobile !== originalData.user_mobile ||
            data.user_address !== originalData.user_address
        );
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            const formData = new FormData()
            formData.append('user_id', uid)
            formData.append('user_name', data.user_name)
            formData.append('user_gender', data.user_gender)
            formData.append('user_email', data.user_email)
            formData.append('user_mobile', data.user_mobile)
            formData.append('user_address', data.user_address)
            axios.post('https://akashsir.in/myapi/atecom1/api/api-user-update.php', formData)
                .then(res => {
                    console.log('Profile updated successfully');
                    if (res.data.flag === '1') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Profile Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        localStorage.setItem('username', res.data.user_name)
                        navigate('/profile');
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'All Field Is Required!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error during Updating profile!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .finally(() => setIsSubmitting(false));
        }
    };

    return (
        <>
            <div style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                width: "800px",
                fontFamily: "Arial, sans-serif",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                margin: "20px auto",
                position: 'relative'
            }}> <button style={{ position: 'absolute', bottom: '20px', left: '20px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 20px', borderRadius: '5px', color: '#735DA5', fontWeight: '550' }} onClick={() => navigate('/profile')}><img src="back.png" alt="" width={30} /> &nbsp;Back to Profile</button>
                <h2 style={{ fontSize: "28px", color: "#735DA5", textAlign: 'center', textDecoration: 'underline' }}>
                    Edit Personal Info
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={data.user_name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                            required
                        />
                        {errors.user_name && <p style={{ color: 'red' }}>{errors.user_name}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Gender</label>
                        <select
                            name="user_gender"
                            value={data.user_gender}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="user_email"
                            value={data.user_email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                        />
                        {errors.user_email && <p style={{ color: 'red' }}>{errors.user_email}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="user_mobile"
                            value={data.user_mobile}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                        />
                        {errors.user_mobile && <p style={{ color: 'red' }}>{errors.user_mobile}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Address</label>
                        <input
                            type="text"
                            name="user_address"
                            value={data.user_address}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                        />
                        {errors.user_address && <p style={{ color: 'red' }}>{errors.user_address}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            style={{ border: 'none', fontSize: '18px', color: 'white', background: isModified() ? '#FF7B00' : '#cccccc', padding: '10px 20px', borderRadius: '10px', cursor: isModified() ? 'pointer' : 'not-allowed' }}
                            disabled={!isModified() || isSubmitting}
                        >
                            {isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Saving...</span>) : (<span> Save Changes</span>)}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Editprofile
