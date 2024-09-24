import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://akashsir.in/myapi/atecom1/api/api-random-product-list.php')
            .then(res => setData(res.data.product_list))
            .catch(error => console.error('error fetching products:', error))
    }, [])

    return (
        <>
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="5" aria-label="Slide 6"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="slide1.jpeg" class="d-block w-100" alt="carouselImage1" />
                    </div>
                    <div class="carousel-item">
                        <img src="slide2.jpeg" class="d-block w-100" alt="carouselImage2" />
                    </div>
                    <div class="carousel-item">
                        <img src="slide3.jpeg" class="d-block w-100" alt="carouselImage3" />
                    </div>
                    <div class="carousel-item">
                        <img src="slide4.jpeg" class="d-block w-100" alt="carouselImage4" />
                    </div>
                    <div class="carousel-item">
                        <img src="slide5.jpeg" class="d-block w-100" alt="carouselImage5" />
                    </div>
                    <div class="carousel-item">
                        <img src="slide6.jpeg" class="d-block w-100" alt="carouselImage6" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Shop Now ❆</p>

            {
                data.length === 0 ? (
                    <p className='text-center fs-2' style={{ color: '#735DA5',marginTop:'80px' }}>
                        <img src="/loading.gif" alt="" width={60} /><br />Loading...
                    </p>
                ) :
                    (
                        <div className='mb-3' style={{ maxWidth: '100%', boxSizing: 'border-box', display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: '10px' }}>
                            {
                                data.map((value, index) => (
                                    <div style={{ "margin": "5px", "display": "inline-block", border: "1px solid #D2D2D2", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)", overflow: "hidden", borderRadius: "0.25rem" }} key={index}>
                                        <div style={{ "width": "230px", "height": "230px", "display": "flex", "justifyContent": "center", "alignItems": "center", "overflow": "hidden", borderBottom: '1px solid #D2D2D2' }}>
                                            <img alt="gallery" src={value.product_image} width={200} />
                                        </div>
                                        <div class="card-body pt-2" style={{ width: '230px', background: '#F7F7F7' }}>
                                            <h6 class="card-title mx-3" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', color: '#4a5760' }}>{value.product_name}</h6>
                                            <p class="card-text mx-3 my-3" style={{ fontWeight: '500' }}>Rs. {Number(value.product_price).toLocaleString("en-IN")}.00</p>
                                            <Link to={`/product-detail/${value.product_id}`} class="btn btn-primary btn-sm mx-3 mb-3" style={{background:'#FF7B00',borderColor:'#FF7B00'}}>View Detail</Link>
                                        </div>
                                    </div>


                                ))
                            }
                        </div>
                    )}
        </>
    )
}

export default Home
