"use client";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

type Props = { onClose: () => void; };

function Shipping({ onClose }: Props) {
  const [shippingdata, Setshippingdata] = useState<any>([])
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    shippingemail: Yup.string()
      .email("Invalid Email Adrees")
      .trim()
      .required("email is not a valid"),
    address: Yup.string().required("Address is Required"),
    city: Yup.string().required("Enter Your City"),
    number: Yup.string().required("Enter Your Contact Number").matches(/^\d{1,10}$/, 'Contact number must be up to 10 digits'),
    zipcode: Yup.string().required("Enter Your ZIP Code"),
  });

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
  
    const shippinginfirmation = async () => {
      try {
        const response = await axios.post(`http://localhost:4000/shipping`, values);
        localStorage.setItem("shippingdata",  JSON.stringify(values));
        console.log(response.data);
        resetForm();
        router.push('/sample');
      } catch (error) {
        console.log(error, "shipping error");
      }
    }
    shippinginfirmation();
  };
  const shippingcartData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/posts`);
      console.log(response.data);
      Setshippingdata(response.data);
    } catch (error) {
      console.error(error, "Shipping data fetch into cart failed");
    }
  };

  const getShipping = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/shipping`);
      console.log(response.data, "getshpping data successfully");
      

    } catch (error) {
      console.log(error, "shipping get data failed");
    }
  }

  useEffect(() => {
    shippingcartData();
    getShipping();
  }, [])

  const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  // const overallTotalPrice = shippingdata?.reduce((total: any, cartquntity: any) => total + cartquntity.quntity * cartquntity.price, 0);
  // var overallDecimalPrice = Math.floor(overallTotalPrice * 100) / 100;

  return (
    <>
      <div className="p-14 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mt-20 ">
        <>
          <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">

              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="p-4 md:p-5 space-y-4">
                  <div className="bg-gray-50 p-8 md:w-2/3 lg:w-full shadow-sm rounded-lg border-gray-200 border-2 ">
                    <Formik
                      initialValues={{
                        shippingemail: "",
                        address: "",
                        city: "",
                        number: "",
                        zipcode: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                        <Form>
                          <div className="text-center">
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm h-8 ms-auto inline-flex justify-end  dark:hover:bg-gray-600 dark:hover:text-white w-full"
                              data-modal-hide="default-modal"
                              onClick={onClose}
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                            <p className="text-2xl font-bold">Shipping Details</p>
                            <p className="text-gray-400 mt-3">
                              Complete your order by providing your shipping details.
                            </p>
                          </div>
                          <hr className="my-6 border-gray-600" />
                          <div className="">
                            <label className="mt-4 mb-2 block text-sm font-medium ">
                              Shipping Email
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="shippingemail"
                                name="shippingemail"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="your.email@gmail.com"
                                value={values.shippingemail}
                                onChange={(e) =>
                                  setFieldValue("shippingemail", e.target.value)
                                }
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                  />
                                </svg>
                              </div>
                            </div>
                            {errors.shippingemail && touched.shippingemail && (
                              <div className="text-red-500 text-sm">
                                {errors?.shippingemail}
                              </div>
                            )}
                            <label className="mt-4 mb-2 block text-sm font-medium">
                              Shipping Address
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your Shipping Address here"
                                value={values.address}
                                onChange={(e) => setFieldValue("address", e.target.value)}
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                            {errors.address && touched.address && (
                              <div className="text-red-500 text-sm">
                                {errors?.address}
                              </div>
                            )}

                            <label className="mt-4 mb-2 block text-sm font-medium">
                              Phone
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                id="number"
                                name="number"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your contact Number Here"
                                value={values.number}
                                maxLength={10}
                                onChange={(e) => setFieldValue("number", e.target.value)}
                                onKeyDown={blockInvalidChar}
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                            {errors.number && touched.number && (
                              <div className="text-red-500 text-sm">{errors?.number}</div>
                            )}
                            <label className="mt-4 mb-2 block text-sm font-medium">
                              City
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your Shipping City here"
                                value={values.city}
                                onChange={(e) => setFieldValue("city", e.target.value)}
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                            {errors.city && touched.city && (
                              <div className="text-red-500 text-sm">{errors?.city}</div>
                            )}
                            <label className="mt-4 mb-2 block text-sm font-medium">
                              Zip Code
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your Shipping Zipcode here"
                                value={values.zipcode}
                                onChange={(e) => setFieldValue("zipcode", e.target.value)}
                              />
                              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                            {errors.zipcode && touched.zipcode && (
                              <div className="text-red-500 text-sm">
                                {errors?.zipcode}
                              </div>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="mt-4 mb-8 w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white"
                          >
                            Place Order
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div modal-backdrop="" className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </>

        {/* <div className="bg-gray-50 p-8 md:w-2/3 lg:w-1/2 shadow-sm rounded-lg border-gray-200 border-2">
          <Formik
            initialValues={{
              shippingemail: "",
              address: "",
              city: "",
              number: "",
              zipcode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="text-center">
                  <p className="text-2xl font-bold">Shipping Details</p>
                  <p className="text-gray-400 mt-3">
                    Complete your order by providing your shipping details.
                  </p>
                </div>
                <hr className="my-6 border-gray-600" />
                <div className="">
                  <label className="mt-4 mb-2 block text-sm font-medium ">
                    Shipping Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="shippingemail"
                      name="shippingemail"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your.email@gmail.com"
                      value={values.shippingemail}
                      onChange={(e) =>
                        setFieldValue("shippingemail", e.target.value)
                      }
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.shippingemail && touched.shippingemail && (
                    <div className="text-red-500 text-sm">
                      {errors?.shippingemail}
                    </div>
                  )}
                  <label className="mt-4 mb-2 block text-sm font-medium">
                    Shipping Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your Shipping Address here"
                      value={values.address}
                      onChange={(e) => setFieldValue("address", e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.address && touched.address && (
                    <div className="text-red-500 text-sm">
                      {errors?.address}
                    </div>
                  )}

                  <label className="mt-4 mb-2 block text-sm font-medium">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="number"
                      name="number"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your contact Number Here"
                      value={values.number}
                      onChange={(e) => setFieldValue("number", e.target.value)}
                      onKeyDown={blockInvalidChar}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.number && touched.number && (
                    <div className="text-red-500 text-sm">{errors?.number}</div>
                  )}
                  <label className="mt-4 mb-2 block text-sm font-medium">
                    City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your Shipping City here"
                      value={values.city}
                      onChange={(e) => setFieldValue("city", e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.city && touched.city && (
                    <div className="text-red-500 text-sm">{errors?.city}</div>
                  )}
                  <label className="mt-4 mb-2 block text-sm font-medium">
                    Zip Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your Shipping Zipcode here"
                      value={values.zipcode}
                      onChange={(e) => setFieldValue("zipcode", e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.zipcode && touched.zipcode && (
                    <div className="text-red-500 text-sm">
                      {errors?.zipcode}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-4 mb-8 w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white"
                >
                  Place Order
                </button>
              </Form>
            )}
          </Formik>
        </div> 
         <div className="bg-white border rounded-lg p-6 md:w-1/3 lg:w-1/4 h-96">
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
              <p className="mb-1 text-lg font-bold">${overallDecimalPrice}USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/chekout")}
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 px-4 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>  */}
      </div>
    </>
  );
}

export default Shipping;
