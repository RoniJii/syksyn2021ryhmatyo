import React from 'react'
import Cards from '../Cards';
import Karuselli from '../Karuselli';
import '../../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Products from './Products';
import { Link } from 'react-router-dom';

///urlin tuonti ei toimi edelleenkään..

export default function Home({url, category, addToCart}) {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (category !== null) {
            const address = ('http://localhost/syksynprojekti2021/products/getproducts.php/' + category.id);
            console.log(address)
            axios.get(address)
            .then((response) => {
                const json = response.data;
                setProducts(json);
            }).catch(error =>{
                if (error.response === undefined) {
                    alert(error);
                } else {
                    alert(error.response.data.error);
                }
            })
        }
    }, [category, url])

    return (
        <div className='container-fluid' style={{marginTop: '100px'}}>
        <h3>{category?.name}</h3>
        {products.map(product => (
            <div key={product.id}>
                <Link
                 to={{
                    pathname: '/products',
                    state: {
                      id: product.id,
                      name: product.name,
                    }
                }}
                >
                {product.name}

                </Link>
                <img src= {url + 'images/kahvi12'} alt={product.name}/>
                 <button className='btn btn-dark' type='button' onClick={e => addToCart(product)}>Add</button>
               
            </div>
        ))}
        <Karuselli/>
        <Cards/>
        </div>
    )
}