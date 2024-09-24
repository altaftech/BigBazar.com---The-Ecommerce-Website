import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";


const Subcategory = () => {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get(id 
            ? `https://akashsir.in/myapi/atecom1/api/api-list-subcategory.php?category_id=${id}` 
            : 'https://akashsir.in/myapi/atecom1/api/api-list-subcategory.php'
          )
            .then(res => setData(res.data.sub_category_list))
            .catch(error => console.error('error fetching categories:', error))
    }, [id]) 

    return (
        <>
            <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Subcategory List ❆</p>
            {
                data.length === 0 ? (
                    <p className='text-center fs-2' style={{ color: '#735DA5',marginTop:'80px' }}>
                        <img src="/loading.gif" alt="" width={60} /><br />Loading...
                    </p>
                ) :
                    (
                        
                            <div style={{ maxWidth: '100%', boxSizing: 'border-box', display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "center", gap: '10px', margin: '8px' }}>
                                {
                                    data.map((value, index) => (

                                        <div style={{ "margin": "5px", "display": "inline-block", border: "1px solid #D2D2D2", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)", overflow: "hidden", borderRadius: "0.25rem" }} key={index}>
                                            <div style={{ "width": "230px", "height": "230px", "display": "flex", "justifyContent": "center", "alignItems": "center", "overflow": "hidden", borderBottom: '1px solid #D2D2D2' }}>
                                                <img alt="gallery" src={value.sub_category_image} width={200} />
                                            </div>
                                            <div class="card-body pt-2" style={{ width: '230px', background: '#F7F7F7', display: 'flex', flexDirection: 'column', }}>
                                                <h5 class="card-title text-center" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', textOverflow: 'ellipsis', '-webkit-box-orient': 'vertical', color: '#4a5760' }}>{value.sub_category_name}</h5>
                                                <Link to={`/products/${value.sub_category_id}`} class="btn btn-primary btn-sm mx-auto my-3" style={{background:'#FF7B00',borderColor:'#FF7B00',width: '180px'}}>View Products</Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    
                    )}
        </>
    )
}

export default Subcategory


