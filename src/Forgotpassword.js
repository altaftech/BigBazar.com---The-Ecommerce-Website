import axios from 'axios';
import React,{useState} from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import './App.css'


const Forgotpassword = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            const data = new FormData()
            data.append('user_email', formData.email)
            axios.post('https://akashsir.in/myapi/atecom1/api/api-user-forgot-password.php', data)
                .then(res => {
                    const userObject = res.data.message
                    if (userObject === 'No Record found') {
                        Swal.fire({
                            icon: 'error',
                            title: 'No Record found',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            title: userObject,
                            showConfirmButton: true,
                            
                        })
                    }
                })
                .catch(error => {
                    alert("Error during password fetching:" + error);
                    console.error('Error during password fetching', error)
                })
                .finally(() => setIsSubmitting(false));
        }
    }
  return (
    <>
       <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Get Your Password ❆</p>
            < div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h4 className='my-4'>Please enter your email!</h4>
                <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                    <input type="text" class="form-control" style={{ width: '300px' }} name="email" placeholder='EMAIL' value={formData.email} onChange={handleChange} />{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} <br />
                    
                    {/* <input type="submit" className="p-1 btn btn-success w-100" value="Check Password" style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }} /> */}
                    <button type="submit" className="p-1 btn btn-success w-100" style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }}>{isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Getting...</span>) : (<span>Get Password</span>)}</button>
                    <hr style={{ background: '#DEE2E6', marginTop: '25px' }} />
                    <p className='text-center'>Back to <Link to={'/login'} className='onhover' style={{ textDecoration: 'none', color: '#0D6EFD' }}>Log in</Link></p>
                </form>
            </div>
    </>
  )
}

export default Forgotpassword
