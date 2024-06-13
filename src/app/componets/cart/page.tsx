'use client'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Modelcom from '../model/page';
import {useApiStore} from '@/stores/dataStore'
import Shipping from '../../shipping/page';
import Image from 'next/image';
// import { useRouter } from 'next/router';


type Props = {}

function cartdata() {
    const [cartproduct, Setcartproduct] = useState<any>()
    const [isModalopen, setModalOpen] = useState(false);
    const [shippingmodel, setShippingmodel] = useState(false);
    const loading = useRef<any>()

    const cartdetail = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/posts`)
            fetchApiData()
            console.log(response.data);
            Setcartproduct(response.data)
        } catch (error) {
            console.error("Add to cart fail", error)
        }
    }

    const handleDelete = async (id: any) => {
        console.log(id, "IDDDDDDD")
        try {
            console.log(id, "IIIIIIIIIIIII");
            const response = await axios.delete(`http://localhost:4000/posts/${id}`)
            console.log(response);
            Setcartproduct(cartproduct.filter((item: any) => item.id != id))
            fetchApiData()
            setModalOpen(false);
            return response
        } catch (error) {
            console.error("Delete to cart fail....", error)
        }
    }

    const { apiData, fetchApiData }: any = useApiStore();
    console.log(apiData, "zustand api data");

    const addquntity = (index: any) => {
        const updatequntyity = cartproduct.map((obj: any, id: any) =>
            id === index ? { ...obj, quntity: obj.quntity + 1 } : obj
        );
        Setcartproduct(updatequntyity);
    }

    const subquntity = (index: any) => {
        const updatequntyity = cartproduct.map((obj: any, id: any) =>
            id === index ? { ...obj, quntity: obj.quntity > 1 ? obj.quntity - 1 : obj.quntity } : obj
        );
        Setcartproduct(updatequntyity);
    }
    console.log(cartproduct, "TTTTT");

    const quantityUpdate = async (id: number, que: number) => {
        try {
            const response = await axios.patch(`http://localhost:4000/posts/${id}`, {
                quntity: que + 1
            })
            // console.log(response.data);
            // Setcartproduct(response.data)
        } catch (error) {
            console.error("Add to cart fail", error)
        }
    }

    const overallTotalPrice = cartproduct?.reduce((total: any, cartquntity: any) => total + cartquntity.quntity * cartquntity.price, 0);
    var overallDecimalPrice = Math.floor(overallTotalPrice * 100) / 100;

    useEffect(() => {
        if (loading.current) return;
        loading.current = true;
        cartdetail();
    }, []);
    return (
        <div>
            <div className="h-auto bg-gray-100 pt-20">
                <Link href='/home' type="button" className=" w-40 text-white bg-gradient-to-br ml-36 mt-8 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2"><ArrowBackIcon /> Back to Home</Link>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {cartproduct?.map((cartproduct: any, id: any) => {

                            return (<div key={id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img
                                    src={cartproduct?.image}
                                    alt="product-image"
                                    className="w-full h-36 rounded-lg sm:w-40"
                                />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {cartproduct?.category}
                                        </h2>
                                        <b className="mt-1 text-xs text-blue-500">Category:-{cartproduct?.category}</b>
                                        <p className="mt-1 text-xs text-gray-700"><b>Description:-</b>{cartproduct?.title}</p>

                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span onClick={() => {
                                                subquntity(id)
                                                quantityUpdate(cartproduct.id, cartproduct.quntity)
                                            }} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                {" "}
                                                -{" "}
                                            </span>
                                            <input
                                                className="h-8 w-12 border bg-white text-center text-xs outline-none"
                                                type="number"
                                                defaultValue={cartproduct.quntity}
                                                value={cartproduct.quntity}
                                                min={1}
                                            />
                                            <span onClick={() => {
                                                addquntity(id)
                                                quantityUpdate(cartproduct.id, cartproduct.quntity)

                                            }} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                {" "}
                                                +{" "}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">${cartproduct?.price}</p>

                                            <svg
                                                // onClick={() => handleDelete(cartproduct.id)}
                                                onClick={() => setModalOpen(true)}

                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            {isModalopen && (
                                                <Modelcom onClose={() => setModalOpen(false)} ondelete={() => handleDelete(cartproduct.id)} >
                                                    <h2>Modal Title</h2>
                                                    <p>This is modal content.</p>
                                                </Modelcom>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                        )}

                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6  md:mt-0 md:w-1/3 shadow-xl">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">$124</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$4.99</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${overallDecimalPrice} USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button onClick={() => setShippingmodel(true)} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 px-4 font-medium text-blue-50 hover:bg-blue-600">
                            Shipping out
                        </button>
                    </div>
                </div>
            </div>
            {shippingmodel && <Shipping onClose={() => setShippingmodel(false)} />}

        </div>
    )
}

export default cartdata;