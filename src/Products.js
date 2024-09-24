import axios from "axios";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'

const Products = () => {
    const [data, setData] = useState([])
    const { id } = useParams()


    useEffect(() => {
        axios.get(id
            ? `https://akashsir.in/myapi/atecom1/api/api-list-product.php?sub_category_id=${id}`
            : 'https://akashsir.in/myapi/atecom1/api/api-list-product.php')
            .then(res => setData(res.data.product_list))
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [id])

    return (
        <>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Product List ❆</p>
            {
                data.length === 0 ? (
                    <p className='text-center fs-2' style={{ color: '#735DA5',marginTop:'80px' }}>
                        <img src="/loading.gif" alt="" width={60} /><br />Loading...
                    </p>
                ) :
                    (

                        <div className='mb-3' style={{ maxWidth: '100%', boxSizing: 'border-box', display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "center", gap: '10px', margin: '8px' }}>
                            {
                                data.map((value, index) => (

                                    <div style={{ "margin": "5px", "display": "inline-block", border: "1px solid #D2D2D2", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)", overflow: "hidden", borderRadius: "0.25rem" }} key={index}>
                                        <div style={{ "width": "230px", "height": "230px", "display": "flex", "justifyContent": "center", "alignItems": "center", "overflow": "hidden", borderBottom: '1px solid #D2D2D2' }}>
                                            <img alt="gallery" src={value.product_image} width={200} />
                                        </div>
                                        <div class="card-body pt-2" style={{ width: '230px', background: '#F7F7F7' }}>
                                            <h6 class="card-title mx-3" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', '-webkit-line-clamp': '2', textOverflow: 'ellipsis', '-webkit-box-orient': 'vertical', color: '#4a5760' }}>{value.product_name}</h6>
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

export default Products
