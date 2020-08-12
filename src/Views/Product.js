import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader'

function Product() {
    let { id } = useParams()
    const url = `https://5f2a73bf6ae5cc001642289f.mockapi.io/products/${id}`
    const [product, setProduct] = useState({
        loading: false,
        data: null, 
        error: false
    })

    let content = null

    useEffect(() => {
        setProduct({
            loading: true, 
            data: null,
            error: false
        })

        axios.get(url)
            .then(response => {
                setProduct({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setProduct({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url])

    if(product.error){
        content = <p>There was an error please refresh or try again later.</p>
    }
    
    if(product.loading){
        content = <Loader/>
    }

    if(product.data){
        content =         
            <div>
                <img src={product.data.image} alt='something random'/>
                <h1 className="font-bold text-2xl mb-3">{product.data.name}</h1>
                <div className="font-bold text-xl mb-3">
                    Price: $ {product.data.price}
                </div>
                <div>
                    Description: {product.data.description}
                </div>
            </div>        
    }

    return(
        <div>
            {content}
        </div>
    )

    
}

export default Product