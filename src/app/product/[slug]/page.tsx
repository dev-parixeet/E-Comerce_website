"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import Swipers from '../../componets/slider/swiper';

type Props = {}

export default function ProductDetail({ }: Props) {
    const [showProduct, SetshowProduct] = useState<any>()
    const [cartproduct, Setcartproduct] = useState<any>()
    const path = useParams();
    const slug: any = path.slug
    const [loading, setLoading] = useState<any>(true)


    const singleProduct = async () => {
        try {

            const response = await axios.get(`https://fakestoreapi.com/products/${slug}`);

            SetshowProduct(response.data);
            setLoading(false)
            console.log(response.data, "WWWWWWWWWW");


        } catch (error) {
            console.error('Error singleProduct fetch data:', error);
            setLoading(false);
        }
    };

    const AddtoCart = async () => {
        const filtered = cartproduct?.filter((tem: any) => tem.id == showProduct.id);
        console.log(filtered, "FFFFFF");
        if (filtered.length > 0) {
            const updatevalue = filtered.map((item: any, id: any) => {
                return item.id == showProduct.id ? { ...item, quntity: item.quntity + 1 } : item
            });
            console.log(updatevalue, "UUUUUUU");

            try {
                const response = await axios.put(`http://localhost:4000/posts/${slug}`, updatevalue[0]);
                console.log('Updated post:', response.data);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        } else {
            try {
                showProduct.quntity = 1;
                showProduct.id = showProduct.id.toString()
                const response = await axios.post(`http://localhost:4000/posts`, showProduct);
                console.log(response, "DDDDDgggggg");


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const cartdetail = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/posts`)
            console.log(response.data, "DDDDDDD");
            Setcartproduct(response.data)

        } catch (error) {
            console.error("Add to cart fail", error)
        }
    }

    useEffect(() => {
        singleProduct();
        cartdetail();
    }, []);

    const getRatingColor = (index: number, rating: number) => {
        return index < rating ? "text-yellow-300" : "text-red-400 ";
    };

    const calculateWidth = (rating: any) => {
        if (rating >= 4.1 && rating <= 5) {
            return 100;
        } else if (rating >= 3.1 && rating <= 4) {
            return 80;
        } else if (rating >= 2.1 && rating <= 3.0) {
            return 60;
        } else if (rating >= 1.1 && rating <= 2) {
            return 40;
        } else if (rating >= 0 && rating < 1.1) {
            return 20;
        }
        return 0;
    }

    const userrating = (value1: number, value2: number) => {
        return showProduct?.rating?.rate >= value1 && showProduct?.rating?.rate <= value2 ? `${calculateWidth(showProduct?.rating?.rate)}%` : "0%"
    }

    return (
        <div>
            {loading ? (
                <p className='text-2xl flex justify-center my-5 mt-24'><PacmanLoader color='lime' /></p>
            ) : (
                <div className='flex w-auto h-full pt-32 pb-2 justify-center gap-4'>
                    <a
                        href="#"
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg lg:w-[450px] lg:h-[450px]"
                            src={showProduct?.image}
                            alt=""
                        />
                        <div className="flex flex-col justify-between p-6 mt-1 ml-20 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {showProduct?.title?.slice(0, 50)}
                            </h5>
                            <p className='text-xl font-bold tracking-tight text-blue-600 dark:text-white'>${showProduct?.price}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {showProduct?.description?.slice(0, 50)}
                            </p>
                            <div className="flex items-center mt-2.5 mb-5">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    {[...Array(5)].map((_, index,) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 ${getRatingColor(index, showProduct?.rating?.rate)}`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"

                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{showProduct?.rating?.rate}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500">
                                1,745 global ratings
                            </p>
                            <div className="flex items-center mt-4">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    5 star
                                </a>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded ">
                                    <div className={`h-5 rounded ${showProduct?.rating?.rate >= 4.1 && showProduct?.rating?.rate <= 5 ? "bg-yellow-400" : ""} getRatingColor`} style={{ width: `${calculateWidth(showProduct?.rating?.rate)}%` }} />
                                </div>
                                <span className="text-sm font-medium text-gray-500 ">
                                    {userrating(4.1, 5)}
                                </span>
                            </div>
                            <div className="flex items-center mt-4">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    4 star
                                </a>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded ">
                                    <div className={`h-5 rounded ${showProduct?.rating?.rate >= 3.1 && showProduct?.rating?.rate <= 4 ? "bg-yellow-400" : ""} getRatingColor`} style={{ width: `${calculateWidth(showProduct?.rating?.rate)}%` }} />

                                </div>
                                <span className="text-sm font-medium text-gray-500 ">
                                    {userrating(3.1, 4)}
                                </span>
                            </div>
                            <div className="flex items-center mt-4">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    3 star
                                </a>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                                    <div className={`h-5 rounded ${showProduct?.rating?.rate >= 2.1 && showProduct?.rating?.rate <= 3.0 ? "bg-yellow-400" : ""} getRatingColor`} style={{ width: `${calculateWidth(showProduct?.rating?.rate)}%` }} />
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {userrating(2.1, 3.0)}
                                </span>
                            </div>
                            <div className="flex items-center mt-4">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    2 star
                                </a>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div className={`h-5 rounded ${showProduct?.rating?.rate >= 1.1 && showProduct?.rating?.rate <= 2 ? "bg-yellow-400" : ""} getRatingColor`} style={{ width: `${calculateWidth(showProduct?.rating?.rate)}%` }} />
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    {userrating(1.1, 2)}
                                </span>
                            </div>
                            <div className="flex items-center mt-4">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    1 star
                                </a>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div className={`h-5 rounded ${showProduct?.rating?.rate >= 0.9 && showProduct?.rating?.rate <= 1 ? "bg-yellow-400" : ""} getRatingColor`} style={{ width: `${calculateWidth(showProduct?.rating?.rate)}%` }} />
                                </div>
                                <span className="text-sm font-medium text-gray-500">
                                    {userrating(0.9, 1)}
                                </span>

                            </div>
                            <div className='flex gap-2 ml-[-10px]'> <Link onClick={AddtoCart} href='/cart' className=" mt-7 w-32 text-white bg-black hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Cart</Link>
                            <a href="/" className=" mt-7 w-32 text-white bg-sky-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy Now</a></div>

                        </div>
                    </a>
                </div>
            )}
            <>
                <Swipers />
            </>
        </div>
    )
}