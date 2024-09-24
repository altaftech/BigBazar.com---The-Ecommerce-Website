import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'


const ProductDetail = () => {
    const [data, setData] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axios.get(`https://akashsir.in/myapi/atecom1/api/api-list-product.php?product_id=${id}`)
            .then(res => setData(res.data.product_list[0]))
            .catch(error => console.error('error fetching product detail:', error));
    }, [id]);


    return (
        <>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Product Detail ❆</p>
            {
                !data.product_name ? (
                    <p className='text-center fs-2' style={{ color: '#735DA5',marginTop:'80px' }}>
                        <img src="/loading.gif" alt="" width={60} /><br />Loading...
                    </p>
                ) :
                    (
                        <div className="container" >
                            <div className="row p-3" style={{ border: '2px solid #DFDFDF', borderRadius: '8px' }}>
                                <div className="col-md-4 text-center">
                                    <img style={{ border: '2px solid #DFDFDF', borderRadius: '8px' }} src={data.product_image} alt={data.product_name} className="img-fluid" />
                                    {data.images?.length > 0 && (
                                        <div className="mt-3 d-flex justify-content-center">
                                            {data.images.map((image, index) => (

                                                <a
                                                    key={index}
                                                    href={image}
                                                    target="_blank"
                                                    rel="noopener noreferrer" // For security purposes
                                                >
                                                    <img
                                                        src={image}
                                                        width={100}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="img-thumbnail me-2"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <h4>{data.product_name}</h4>
                                    <p className="text-success" style={{ fontWeight: '500', fontSize: '20px' }}>Rs. {Number(data.product_price).toLocaleString("en-IN")}.00</p>
                                    <p style={{ fontSize: '18px' }}><span style={{ fontWeight: '500' }}>Subcategory: </span>{data.category?.sub_category_name || "N/A"}</p>
                                    {data?.product_details
                                        ? data.product_details
                                            .replace(/([a-z])([A-Z])/g, '$1\n$2')  // Break camelCase with newlines
                                            .split('\n')                           // Split on newlines after replacement
                                            .map((sentence, index) => (
                                                <p key={index} style={{ color: '#6C757D', fontSize: '15px' }}>{sentence.trim()}</p>  // Render each sentence inside a <p> tag
                                            ))
                                        : <p>No product details available</p>
                                    }
                                    {/* Buttons */}
                                    <div className="d-flex">
                                        <button className="btn btn-success me-2">Add Cart</button>
                                        <button className="btn btn-info">Add Wishlist</button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Review Section */}
                            <div className="mt-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h2>List Product Review</h2>
                                <h4>No Record Found.</h4>
                                <button className="btn btn-primary">Add Product Review</button>
                            </div>
                        </div>
                    )}
        </>
    )
}

export default ProductDetail

