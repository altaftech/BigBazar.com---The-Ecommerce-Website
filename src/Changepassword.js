import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Changepassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const uid = localStorage.getItem('uid')

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('uid')) {
      navigate('/login')
    }
  }, [])

  const validateInputs = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return false;
    } else {
      setError('');
      return true; // Return true if validation passes
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  }
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    if (!validateInputs()) {
      return; // Stop the submission if validation fails
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('user_id', uid)
    data.append('opass', oldPassword)
    data.append('npass', newPassword)
    data.append('cpass', confirmPassword)
    axios.post('https://akashsir.in/myapi/atecom1/api/api-change-password.php', data)
      .then(res => {
        console.log(res.data)
        if (res.data.flag === '1') {
          //alert('Done' + res.data.message)
          Swal.fire({
            icon: 'success',
            title: 'Your password changed successfully',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.clear();
          navigate('/login')
        } else if (res.data.message === 'Old password not match.') {
          Swal.fire({
            icon: 'error',
            title: 'Old password not match',
            showConfirmButton: false,
            timer: 1500
          })
        } else if (res.data.message === 'New and confirm password not match.') {
          Swal.fire({
            icon: 'error',
            title: 'New and confirm password not match.',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Required Field Is Missing',
            showConfirmButton: false,
            timer: 1500
          })
          //alert('Something went wrong'+  res.data.message);
        }
      })
      .catch(error => { alert("Error during change password:" + error); console.error('Error during change password:', error) })
      .finally(() => setIsSubmitting(false));

  };
  return (
    <>
      <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Change Your Password ❆</p>
      < div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
        <h3 className='my-4'>Please Enter Password</h3>
        <form onSubmit={handleChangePassword} style={{ alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px', marginBottom: '10px' }}>
            <input type={showPassword ? "text" : "password"} class="form-control" style={{ width: '300px' }} placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            <span
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#FF7B00' }}>
              {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" /></svg>}
            </span>
          </div>
          <div style={{ position: 'relative', width: '300px', marginBottom: '10px' }}>
            <input type={showPassword2 ? "text" : "password"} class="form-control" style={{ width: '300px' }} placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <span
              onClick={togglePasswordVisibility2}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#FF7B00' }}>
              {showPassword2 ? <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" /></svg>}
            </span>
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <input type={showPassword3 ? "text" : "password"} class="form-control" style={{ width: '300px' }} placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <span
              onClick={togglePasswordVisibility3}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#FF7B00' }}>
              {showPassword3 ? <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" /></svg>}
            </span>
          </div>{error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}<br />

          <button type="submit" className="p-1 btn btn-success w-100" style={{ background: '#FF7B00', borderColor: '#FF7B00', fontSize: '20px', fontWeight: '500' }}>{isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Changing...</span>) : (<span><img src="chpassw.png" alt="" width={30} /> Change Password</span>)}</button> <br /><br />
          <button className='btn btn-success w-100' style={{ border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 20px', borderRadius: '5px', background: '#F0F0F0', color: '#735DA5', fontSize: '20px', fontWeight: '550', width: '300px' }} onClick={() => navigate('/profile')}><img src="back.png" alt="" width={30} /> &nbsp;Back to Profile</button>

        </form>
      </div>

    </>
  )
}

export default Changepassword
