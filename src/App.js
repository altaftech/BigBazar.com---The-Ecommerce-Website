import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';
import Category from './Category';
import Subcategory from './Subcategory';
import Products from './Products';
import Cart from './Cart';
import Login from './Login';
import ProductDetail from './ProductDetail';
import Searchproduct from './Searchproduct';
import Mobile from './Mobile';
import Signup from './Signup';
import Forgotpassword from './Forgotpassword';
import Navbar from './Navbar';
import Profile from './Profile';
import Order from './Order';
import Wishlist from './Wishlist';
import Review from './Review';
import Changepassword from './Changepassword';
import Editprofile from './Editprofile';

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/subcategory' element={<Subcategory />} />
          <Route path='/subcategory/:id' element={<Subcategory />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='/search-product/:search' element={<Searchproduct />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/mobile' element={<Mobile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<Editprofile />} />
          <Route path='/order' element={<Order />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/review' element={<Review />} />
          <Route path='/changepassword' element={<Changepassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App


