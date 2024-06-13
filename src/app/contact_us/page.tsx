"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";

type Props = {}


const ContactUs = (props: Props) => {

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .trim()
            .required("Firstname is Required"),
        lastname: Yup.string()
            .required("Lastname is Required"),
        email: Yup.string()
            .email("Invalid Email Adrees")
            .required("email Address is Required"),
        number: Yup.string()
            .required("Enter vallid Phone number"),
        subject: Yup.string()
            .required("Describe Your Subject")
    })

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            number: "",
            subject: ""
        },

        validationSchema: validationSchema,

        onSubmit: async (values: any, errors: any) => {
            // console.log(values, "vvvvvvvv")
            try {
                const response = await axios.post(`http://localhost:4000/contact`, values);
                console.log(response);
                resetForm();

            } catch (error: any) {
                console.error('Error fetching data:', error);

            }
        },
    });
    const { errors, touched, values, resetForm } = formik;
    const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    return (
        <div>

            <section className="flex items-center bg-zinc-100 font-poppins dark:bg-gray-800 mt-32">
                <div className="max-w-6xl px-4 py-4 mx-auto lg:py-11 md:px-6">
                    <div className="mb-20 text-center pb-7">
                        {/* <h2 className="pb-2 mb-2 text-xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
                            Let's Connected With Us..
                        </h2> */}
                        <div>
                            <h2 className="pb-3 text-4xl font-bold text-center text-gray-800 md:text-4xl mt-32mx-auto justify-center flex-1 max-w-6xl">
                                Let's Connected With Us..
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400  border-b-8 border-blue-500 pb-5">
                                Feel free to contact our office for any inquiries. We're eager to assist you. Your messages are important to us!
                            </p>
                        </div>


                        <div className='flex items-center bg-zinc-100 font-poppins mt-10 justify-center '>
                            {/* <iframe src="https://www.google.com/maps/d/embed?mid=1VW-1Vnrsb-SdTGcEo8tVazNpvMagV30&ehbc=2E312F" width="100%" height="400"></iframe> */}
                            {/* <iframe src="https://www.google.com/maps/d/embed?mid=1VW-1Vnrsb-SdTGcEo8tVazNpvMagV30&ehbc=2E312F" width="100%" height="500"></iframe> */}
                            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1VW-1Vnrsb-SdTGcEo8tVazNpvMagV30&ehbc=2E312F" width="100%" height="500"></iframe>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full px-4 mb-20 lg:w-1/3 lg:mb-0">
                            <div className="relative h-full px-6 pt-20 pb-12 text-center shadow bg-teal-100 dark:bg-gray-900">
                                <div className="absolute top-0 inline-flex items-center justify-center w-20 h-20 text-teal-600 transform -translate-x-1/2 -translate-y-1/2 bg-teal-100 border border-teal-600 rounded-full dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 left-1/2 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="w-6 h-6 bi bi-envelope-paper"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z" />
                                    </svg>
                                </div>
                                <h2 className="mb-6 text-3xl font-bold md:text-4xl dark:text-gray-300">
                                    Email
                                </h2>
                                <h3 className="mb-6 text-lg font-medium dark:text-gray-500">
                                    Lorem ipsum dor amet set ispicus dor san amet
                                </h3>
                                <p className="text-xl text-gray-500 sm:text-2xl dark:text-gray-400">
                                    vision2325@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-20 lg:w-1/3 lg:mb-0">
                            <div className="relative h-full px-6 pt-20 pb-12 text-center shadow bg-lime-100 dark:bg-gray-900">
                                <div className="absolute top-0 inline-flex items-center justify-center w-20 h-20 text-teal-900 transform -translate-x-1/2 -translate-y-1/2 bg-teal-100 border border-teal-600 rounded-full dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 left-1/2 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="w-6 h-6 bi bi-telephone"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                                <h2 className="mb-6 text-3xl font-bold md:text-4xl dark:text-gray-300">
                                    Phone
                                </h2>
                                <h3 className="mb-6 text-lg font-medium dark:text-gray-500">
                                    Lorem ipsum dor amet set ispicus dor san amet
                                </h3>
                                <p className="text-xl text-gray-500 sm:text-2xl dark:text-gray-400">
                                    +977-014451967
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/3 lg:mb-0">
                            <div className="relative h-full px-6 pt-20 pb-12 text-center shadow bg-teal-100 dark:bg-gray-900">
                                <div className="absolute top-0 inline-flex items-center justify-center w-20 h-20 text-teal-600 transform -translate-x-1/2 -translate-y-1/2 bg-teal-100 border border-teal-600 rounded-full dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 left-1/2 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="w-6 h-6 bi bi-geo-alt"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                </div>
                                <h2 className="mb-6 text-3xl font-bold md:text-4xl dark:text-gray-300">
                                    Office
                                </h2>
                                <h3 className="mb-6 text-lg font-medium dark:text-gray-500">
                                    Lorem ipsum dor amet set ispicus dor san amet
                                </h3>
                                <p className="text-xl text-gray-500 sm:text-2xl dark:text-gray-400">
                                    Chhapara, Bihar
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 py-6 ">
                        <form
                            onSubmit={formik.handleSubmit}
                            action=""
                            className="py-6 rounded shadow dark:bg-gray-900 bg-gray-50"
                        >
                            <div className="flex flex-wrap ">
                                <div className="w-full px-3 md:w-1/2 md:mb-4">
                                    <label
                                        htmlFor="firstname"
                                        className="block mb-3 font-bold text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="first name"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ${errors.firstname && touched.firstname ? 'border-red-500' : ''}`}
                                    />
                                    {errors.firstname && touched.firstname && <span className='text-red-500'>{errors.firstname}</span>}
                                </div>
                                <div className="w-full px-3 md:w-1/2 md:mb-4">
                                    <label
                                        htmlFor="firstname"
                                        className="block mb-3 font-bold text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="last name"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ${errors.lastname && touched.lastname ? 'border-red-500' : ''}`}
                                    />
                                    {errors.lastname && touched.lastname && <span className='text-red-500'>{errors.lastname}</span>}
                                </div>
                                <div className="w-full px-3 md:w-1/2 md:mb-0">
                                    <label
                                        htmlFor="firstname"
                                        className="block mb-3 font-bold text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && touched.email && <span className='text-red-500'>{errors.email}</span>}
                                </div>
                                <div className="w-full px-3 md:w-1/2 md:mb-0">
                                    <label
                                        htmlFor="firstname"
                                        className="block mb-3 font-bold text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="I'm asking information for..."
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ${errors.subject && touched.subject ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="px-3 mb-6">
                                <label
                                    htmlFor="phone-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone number:
                                </label>
                                <div className="relative flex">
                                    <div className="absolute md:bottom-2 bottom-[10px] inset-y-0  start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 19 18"
                                        >
                                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        name="number"
                                        placeholder="9393403943"
                                        value={formik.values.number}
                                        onChange={formik.handleChange}
                                        onKeyDown={blockInvalidChar}
                                        className={`block w-full px-10  py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ${errors.number && touched.number ? 'border-red-500' : ''}`}
                                    />
                                    {errors.number && touched.number && <span className='text-red-500 '>{errors.number}</span>}

                                </div>
                            </div>
                            <div className="px-6">
                                <button type='submit' className="px-4 py-2 font-medium ml-7 text-gray-100 bg-teal-600 rounded shadow hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-700">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ContactUs