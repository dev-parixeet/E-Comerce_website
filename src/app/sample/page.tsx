"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

type Props = { onClose: () => void; };

function Shipp({ onClose }: Props) {

  const [shippingdata, Setshippingdata] = useState<any>([]);
  const [initaldata, Setintialdata] = useState<any>({});
  const [saveradio, Setsaveradio] = useState<any>([]);
  const [radioopen, Setradioopen] = useState<any>(false);
  const router = useRouter();

  const handleOpen = () => {
    Setradioopen(!radioopen);
  }

  const validationSchema = Yup.object().shape({
    shippingemail: Yup.string().email("Invalid Email Adress").trim().required("Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    number: Yup.string().required("Contact number is required").matches(/^\d{1,10}$/, 'Contact number must be up to 10 digits'),
    zipcode: Yup.string().required("ZIP Code is required"),
  });

  const formik = useFormik<any>({
    initialValues: {
      shippingemail: "",
      address: "",
      city: "",
      number: "",
      zipcode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(`http://localhost:4000/shipping`, values);
        console.log(response.data);
        resetForm();
        toast.success("Shipping Address Stored Successfully..");
      } catch (error) {
        console.log(error, "shipping error");
      }
    },
  });

  const { isSubmitting, errors, touched, values, setFieldValue, initialValues } = formik;

  const shippingcartData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/posts`);
      console.log(response.data);
      Setshippingdata(response.data);
    } catch (error) {
      console.error(error, "Shipping data locastorage email set");
    }
  };

  const getShipping = async (localshippingemail: any) => {
    console.log(localshippingemail, "Shipping data fetch into cart");

    try {
      const response = await axios.get(`http://localhost:4000/shipping`);
      console.log(response.data, "getshpping data successfully");
      const maintain = response.data.filter((item: any) => item.shippingemail === localshippingemail.shippingemail)
      console.log(maintain, "shipping data for particular email address");

      Setsaveradio(maintain);
    } catch (error) {
      console.log(error, "shipping get data failed");
    }
  }
  const handleChange = (id: any) => {
    const radiooption = saveradio.find((item: any, index: any) => (index === id))
    console.log(radiooption, "Radio option selected for address");
    // formik.setFieldValue("shippingemail", radiooption?.shippingemail);
    formik.setFieldValue("address", radiooption?.address);
    formik.setFieldValue("city", radiooption?.city);
    formik.setFieldValue("number", radiooption?.number);
    formik.setFieldValue("zipcode", radiooption?.zipcode);
  };

  useEffect(() => {
    shippingcartData();
    const getinformation = JSON.parse(localStorage.getItem("shippingdata") || "{}");
    console.log(getinformation, "localstorage get item succeeded");
    getShipping(getinformation);
    Setintialdata(getinformation);
    formik.setFieldValue("shippingemail", getinformation?.shippingemail);
    formik.setFieldValue("address", getinformation?.address);
    formik.setFieldValue("city", getinformation?.city);
    formik.setFieldValue("number", getinformation?.number);
    formik.setFieldValue("zipcode", getinformation?.zipcode);
  }, [])
  console.log(initaldata, "initaldataaaaaaaaaaaa");

  const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  const overallTotalPrice = shippingdata?.reduce((total: any, cartquntity: any) => total + cartquntity.quntity * cartquntity.price, 0);
  var overallDecimalPrice = Math.floor(overallTotalPrice * 100) / 100;

  return (
    <>
      <div className="p-14 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mt-20 ">

        <div className="bg-gray-50 p-8 md:w-2/3 lg:w-1/2 shadow-sm rounded-lg border-gray-200 border-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-center">
              <p className="text-2xl font-bold">Shipping Details</p>
              <p className="text-gray-400 mt-3">
                Complete your order by providing your shipping details.
              </p>
            </div>
            <hr className="my-6 border-gray-600" />
            <div className="">
              <label className="mt-4 mb-2 block text-sm font-medium">
                Shipping Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="shippingemail"
                  name="shippingemail"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  value={formik.values.shippingemail}
                  onChange={formik.handleChange}
                />
                {formik.errors.shippingemail && formik.touched.shippingemail ? <div className='text-red-500'>{formik?.errors.shippingemail as React.ReactNode}</div> : null}
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
              <Link onClick={() => handleOpen()} href={''} className=" flex-col text-blue-500 hover:text-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{radioopen ? 'Less Address' : 'More Address'}</Link>
              {radioopen &&
                <>
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Select Your another Address
                  </h3>
                  <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-blue-500">
                    {saveradio.slice(0, 5).map((addresslist: any, id: any) => {
                      return (<li key={id} className="w-full border-b border-gray-200 rounded-t-lg">
                        <div className="flex items-center ps-3 border-gray-200 border">
                          <input
                            id="list-radio-license"
                            type="radio"
                            defaultValue=""
                            onChange={() => handleChange(id)}
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="list-radio-license"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {addresslist.address}
                          </label>
                        </div>
                      </li>
                      )
                    })}
                  </ul>
                </>
              }

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
                  value={formik.values.address}
                  onChange={formik.handleChange}
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
              {formik.errors.address && formik.touched.address ? <div className='text-red-500'>{formik?.errors.address as React.ReactNode}</div> : null}

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
                  value={formik.values.number}
                  maxLength={10}
                  onChange={formik.handleChange}
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
              {formik.errors.number && formik.touched.number ? <div className='text-red-500'>{formik?.errors.number as React.ReactNode}</div> : null}
              <label className="mt-4 mb-2 block text-sm font-medium">
                City
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 "
                  placeholder="Your Shipping City here"
                  value={formik.values.city}
                  onChange={formik.handleChange}
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
              {formik.errors.city && formik.touched.city ? <div className='text-red-500'>{formik?.errors.city as React.ReactNode}</div> : null}
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
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
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
              {formik.errors.zipcode && formik.touched.zipcode ? <div className='text-red-500'>{formik.errors.zipcode as React.ReactNode}</div> : null}
            </div>
            <div>

              <button
                type="submit"
                className="mt-4 mb-8 w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white"
              >
                Place Order
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5042}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </form>


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
        </div>
      </div>
    </>
  );
}

export default Shipp;
