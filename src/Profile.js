import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'


const Profile = () => {
  const [data, setData] = useState({})
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uid = localStorage.getItem('uid')
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(`https://akashsir.in/myapi/atecom1/api/api-user-profile.php?user_id=${uid}`)
      .then(res => { console.log(res.data); setData(res.data) })
      .catch(error => console.error(error))
  }, [uid])
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility
  };
  const handleChange = (e) => {
    setIsSubmitting(true);
    const file = e.target.files[0];
    const formdata = new FormData()
    formdata.append('user_id', uid)
    formdata.append('user_photo', file)
    axios.post('https://akashsir.in/myapi/atecom1/api/api-user-photo-change.php', formdata)
      .then(res => {
        togglePopup()
        console.log('Your image updated successfully');
        if (res.data.flag === '1') {
          Swal.fire({
            icon: 'success',
            title: 'Your image updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {

            navigate(0);
          }, 1000);
        }
        else if (res.data.message === 'Sorry, only JPG, JPEG, PNG files are allowed.') {
          togglePopup()
          Swal.fire({
            icon: 'error',
            title: 'Sorry, only JPG, JPEG, PNG files are allowed.',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (res.data.message === 'Sorry, Your File too large. File must be less than 2 mb.') {
          togglePopup()
          Swal.fire({
            icon: 'error',
            title: 'Sorry, Your File too large. File must be less than 2 mb.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(error => {
        console.error(error)

      })
      .finally(() => setIsSubmitting(false));
  }
  return (
    <>
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "20px",
          width: "800px",
          fontFamily: "Arial, sans-serif",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          margin: "20px auto"
        }}
      >
        <h2 style={{ fontSize: "28px", color: "#735DA5", textAlign: 'center', textDecoration: 'underline' }}>
          Personal info
        </h2>
        <div
          style={{
            display: "block",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >

          <div style={{ borderTop: "1px solid #e0e0e0", display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
            <p style={{ fontWeight: "500", color: "#202124", marginBottom: '0' }}>Profile picture</p>
            <div style={{ display: 'flex', justifyContent: '', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
              <img
                className='mt-1'
                src={data.user_photo ? data.user_photo : "profile.png"}
                alt=""
                style={{
                  borderRadius: "50%",
                  border: "2px solid #e0e0e0",
                  height: "70px",
                  width: "70px",
                  cursor: "pointer",
                }}
                onClick={togglePopup}
              />
              <button onClick={togglePopup} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', color: '#FF7B00', background: '#C2E7FF', borderRadius: '20px', padding: '0 10px', fontSize: '14px' }}><img src="edit2.png" alt="" width={18} />Edit Photo</button></div></div>
        </div>

        {/* Popup for profile picture */}
        {isPopupVisible && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                position: "relative",
                width: "400px",
              }}
            >
              <button
                className='hovbtn'
                onClick={togglePopup}
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: '5px',
                  borderRadius: '30px',
                }}
              >
                <img src="close.png" alt="Close" width={30} />
              </button>
              <h4 style={{ color: '#5F6368', textAlign: 'center' }}>BigBazar Account</h4>
              <p style={{ fontSize: '22px', fontWeight: "500", color: "#1F1F1F", marginTop: "25px", marginBottom: '0', textAlign: 'start' }}>
                Profile picture
              </p>
              <small style={{ color: '#444746' }}>A picture helps people to recognise you and lets you know when you’re signed in to your account</small>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={data.user_photo ? data.user_photo : "profile.png"}
                  alt="Full Profile"
                  style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                  className='m-3'
                />
              </div>
              <label for="files" className='form-control mx-auto' style={{ textAlign: 'center', fontSize: '20px', color: '#001D35', cursor: 'pointer', background: '#C2E7FF', width: '250px', borderRadius: '30px' }}>{isSubmitting ? (<span><img src="loading.gif" alt="" width={30} /> Saving...</span>) : (<span><img src="edit1.png" alt="" width={30} /> Change Picture</span>)}</label>
              <input type="file" id="files" name="photo" className='form-control' style={{ width: '360px', display: 'none' }} onChange={handleChange} />
            </div>
          </div>
        )}



        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
            padding: "10px 0",
          }}
        >
          <p style={{ color: "#202124", fontWeight: "500" }}>Name</p>
          <p style={{ color: "#5f6368" }}>{data.user_name}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
            padding: "10px 0",
          }}
        >
          <p style={{ color: "#202124", fontWeight: "500" }}>Gender</p>
          <p style={{ color: "#5f6368", textTransform: 'capitalize' }}>{data.user_gender}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
            padding: "10px 0",
          }}
        >
          <p style={{ color: "#202124", fontWeight: "500" }}>Email</p>
          <p style={{ color: "#5f6368" }}>{data.user_email}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
            padding: "10px 0",
          }}
        >
          <p style={{ color: "#202124", fontWeight: "500" }}>Phone</p>
          <p style={{ color: "#5f6368" }}>{data.user_mobile}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >
          <p style={{ color: "#202124", fontWeight: "500" }}>Address</p>
          <p style={{ color: "#5f6368" }}>{data.user_address}</p>
        </div>
      </div>
      <div style={{
        display:'flex',
        justifyContent:'center',
          width: "800px",
          margin: "20px auto"
        }}>
        <button onClick={() => navigate('/changepassword')} className='mx-auto px-5' style={{ border: 'none', fontSize: '28px', color: 'white', background: 'green', display: 'flex', alignItems: 'center', borderRadius: '10px' }}><img src="chpassw.png" alt="" width={30} /> &nbsp;Change Password</button>
        <button onClick={() => navigate('/editprofile')} className='mx-auto px-5' style={{ border: 'none', fontSize: '28px', color: 'white', background: '#FF7B00', display: 'flex', alignItems: 'center', borderRadius: '10px' }}><img src="edit.png" alt="" width={30} /> &nbsp;Edit Profile</button>
      </div>
    </>
  )
}

export default Profile
