import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tooltip from './Tooltip';


const Navbar = () => {
  const [search, setSearch] = useState('')
  const [imguid, setImguid] = useState('')
  const [name, setName] = useState('')
  const isLoggedIn = localStorage.getItem('is_login')
  const uid = localStorage.getItem('uid')
  const navigate = useNavigate();


  useEffect(() => {
    axios.post(`https://akashsir.in/myapi/atecom1/api/api-user-profile.php?user_id=${uid}`)
      .then(res => { setImguid(res.data.user_photo); setName(res.data.user_name) })
      .catch(error => console.error(error))
  }, [uid])
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <nav class="navbar sticky-top">
        <div class="logo">
          <Link to={"/"} class="navbrand"><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#ff7b00"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" /></svg> BigBazar</Link>
        </div>

        <form class="d-flex marginR">
          <input class="p-2 inputsearch" type="search" placeholder="Search Products here" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Link to={`/search-product/${search}`}><button class="px-2 py-2 button" type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff7b00"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button></Link>
        </form>

        <div className='navdiv'>
          <Link to={"/home"}>Home</Link>          <Link to={"/category"}>Category</Link>
          <Link to={"/subcategory"}>Subcategory</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/cart"}>Cart</Link>
          {isLoggedIn ? (<div class="flex-shrink-0 dropdown">
            <Link href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle nohover" data-bs-toggle="dropdown" aria-expanded="false">
              <Tooltip text={`Hello, ${name}`}>
                <img src={imguid ? imguid : "user.png"} alt="My Account" width="50" height="50" class="rounded-circle" style={{ color: 'white', }} data-toggle="tooltip" data-placement="bottom" />
              </Tooltip>
            </Link>
            <ul class="dropdown-menu mx-0 border-0 shadow w-220px dropdown-menu-lg-end" data-bs-theme="light">
              <li className="bgcolor py-1">
                <Link className="dropdown-item nostyle mx-3" aria-current="page" to="/profile" style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <img src="profile.png" alt="" width={18} /> &nbsp;&nbsp;Profile
                </Link>
              </li>
              <li className="bgcolor py-1">
                <Link className="dropdown-item nostyle mx-3" aria-current="page" to="/order" style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <img src="order.png" alt="" width={18} /> &nbsp;&nbsp;My Order
                </Link>
              </li>
              <li className="bgcolor py-1">
                <Link className="dropdown-item nostyle mx-3" aria-current="page" to="/wishlist" style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <img src="wishlist.png" alt="" width={18} /> &nbsp;&nbsp;My Wishlist
                </Link>
              </li>
              <li className="bgcolor py-1">
                <Link className="dropdown-item nostyle mx-3" aria-current="page" to="/review" style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <img src="review.png" alt="" width={18} /> &nbsp;&nbsp;My Review
                </Link>
              </li>
              <li className="bgcolor py-1">
                <Link className="dropdown-item nostyle mx-3" aria-current="page" to="/changepassword" style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <img src="chpass.png" alt="" width={18} /> &nbsp;&nbsp;Change Password
                </Link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button className="logout-button dropdown-item btncolor" aria-current="page" to="" onClick={() => { handleLogout() }} style={{ display: 'flex', alignItems: 'center', fontWeight: '500', color: 'red' }}>
                  <img src="logout.png" alt="" width={18} className="logout-img" /> &nbsp;&nbsp;Logout
                </button>
              </li>
            </ul>

          </div>) : (<div><button type="button" class="btn btn-success" style={{ fontSize: '20px', color: '#F0F0F0', background: '#FF7B00', borderTopRightRadius: '0', borderBottomRightRadius: '0', border: 'none', fontWeight: '500' }} onClick={() => navigate('/login')}>&nbsp;Login&nbsp;</button><button type="button" class="btn btn-primary me-2" style={{ fontSize: '20px', color: '#FF7B00', background: '#F0F0F0', border: 'none', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', fontWeight: '500' }} onClick={() => navigate('/signup')}>Sign up</button></div>)}
        </div>
      </nav>
    </>
  )
}

export default Navbar

