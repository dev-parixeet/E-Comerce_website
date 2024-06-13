"use client"
import React, { useEffect, useState } from 'react'
import PacmanLoader
    from "react-spinners/PacmanLoader";
import axios from 'axios'
import Link from 'next/link';
import {getwishlist, wishlist} from '@/stores/dataStore';
import Slider from '../componets/slider/page';
import {removewishlist} from '@/stores/dataStore';



const HomePage = (Loading: any, color: any) => {
    const [product, SetProduct] = useState<any>()
    const [loading, setLoading] = useState(true);
    const [homecartproduct, Sethomecartproduct] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products?sort=desc`);
            SetProduct(response.data);
            setLoading(false)
            console.log(response.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const AddtoCart = async (id: any, selectproduct: any) => {
        const filtered = homecartproduct?.filter((tem: any) => tem.id == id);
        if (filtered.length > 0) {
            const updatevalue = filtered.map((item: any) => {
                return item.id == id ? { ...item, quntity: item.quntity + 1 } : item
            });
            try {
                const response = await axios.put(`http://localhost:4000/posts/${id.toString()}`, updatevalue[0]);
                console.log('Updated post:', response.data);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        } else {
            try {
                selectproduct.quntity = 1;
                selectproduct.id = selectproduct.id.toString()
                const response = await axios.post(`http://localhost:4000/posts`, selectproduct);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    const cartdetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/posts`)
            console.log(response.data, "DDDDDDD");
            Sethomecartproduct(response.data)

        } catch (error) {
            console.error("Add to cart fail", error)
        }
    }

    useEffect(() => {
        fetchData();
        cartdetails();
        getApiData();
    }, []);

    const getRatingColor = (index: any, rating: any) => {
        return index < rating ? "text-yellow-300" : "text-red-400 ";
    };
    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const { apiData, postApiData }: any = wishlist();
    console.log(apiData, "wishlist data posted");

    const { remove, unlike }: any = removewishlist();
    console.log("Remove list from ", remove);


    const whishlistdata = (id: any, product: any) => {
        console.log(product, "product");

        // if (apiData?.filter((item1: any) => item1.id == product.id)) {
        //     console.log(product.id,"product.id");

        //     unlike(product.id);
        // }
        postApiData(product);
        getApiData();
    }
    const removedwhishlistdata = (id: any, product: any) => {
        console.log(product.id, "productIDDDDDDDDDDDD");
        unlike(product.id);
        getApiData();
    }

    const { getdata, getApiData }: any = getwishlist();
    console.log("getdata", getdata);
  
   

    return (
        <div>
            {loading ? (
                <p className='text-2xl flex justify-center my-5 mt-24'><PacmanLoader color='lime' /></p>
            ) : (
                <>
                    <div className='w-full px-5'>
                        <Slider />
                    </div>
                    <div className='pt-5 w-full flex justify-center flex-wrap gap-8'>

                        {product?.map((product: any, id: number) => (<div key={id} className='md:flex p-4 lg:flex-row w-96 text-lime-800'>

                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className='w-full flex justify-end p-4'>
                                    {getdata?.filter((item1: any) => item1.id == product.id).length > 0 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => removedwhishlistdata(id, product)} viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500">
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                        </svg>

                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => whishlistdata(id, product)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-black">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>

                                    }
                                    {/* <svg onClick={() => whishlistdata(id, product)} className={`h-8 w-8`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> */}
                                </div>
                                <a href="#">
                                    <img className="p-8 rounded-t-lg h-72 w-72 shadow-md max-w-xs transition duration-500 ease-in-out hover:scale-110" src={product.image} alt="product image" />
                                </a>
                                <div className="px-5 pb-5">
                                    <a href="#">
                                        <h4 className="pt-3 text-xl font-semibold tracking-tight text-lime-600 dark:text-white">{product.category.slice(0, 20)}</h4>
                                        <h6 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{product.description.slice(0, 60)}</h6>
                                    </a>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-4 h-4 ${getRatingColor(index, product.rating.rate)}`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 ">{product.rating.rate}</span>
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white mx-14">${product.price}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        {/* <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span> */}
                                        <Link onClick={() => AddtoCart(product.id, product)} href='/cart' className="text-white bg-black hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to Cart</Link>
                                        <Link href={`/product/${product.id}`} className="text-white bg-lime-700 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Show Product</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className='flex justify-end xl:mr-6'>
                        <svg className="h-14 w-14 text-white bg-blue-500 hover:text-black rounded-full p-3" onClick={() => backToTop()} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                        </svg>
                    </div>

                </>
            )}
        </div>
    )
}

export default HomePage