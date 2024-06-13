"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { deleteCookie, getCookie } from 'cookies-next'
import {useApiStore} from '@/stores/dataStore'
import Logout from '../model/logoutmodel'
import { useRouter } from 'next/navigation'

type Props = {}

const Header = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [account, setaccount] = useState(null);
  const [logoutmodalOpen, setlogoutModalOpen] = useState(false);

  useEffect(() => {
    const accounttokendata: any = getCookie("token") ? "My Account" : "Login"
    setaccount(accounttokendata);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  }
  const router = useRouter()
  const handlelogout = () => { const logout = deleteCookie("token"); router.push('/login'); }

  const { apiData, fetchApiData }: any = useApiStore();
  console.log(apiData, "zustand api data");

  const cartLength = apiData ? apiData.length : 0;
  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  return (

    <nav className="bg-blue-500 border-gray-200 fixed w-full top-0 z-50 ">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse h-8 -ml-4">

          <img
            src="/vision2.jpg"
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </a>
        <button data-collapse-toggle="navbar-dropdown" type="button" onClick={handleOpen} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${open ? "block" : "hidden"} md:block w-full md:w-auto`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-500">
            <li>
              <Link href="/home" className="block py-2 px-3 hover:text-yellow-400 text-white rounded md:text-white-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/about_us" className="block py-2 px-3 text-white hover:text-yellow-400 rounded md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 md:dark:hover:bg-transparent">About Us</Link>
            </li>
            <li>
              <Link href="/contact_us" className="block py-2 px-3 text-white hover:text-yellow-400 rounded md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 md:dark:hover:bg-transparent">Contact Us</Link>
            </li>
            <li className=" flex">
              <div className=" flext-0 right-2 !important relative">
                <Link href="/cart" className="flex h-1 w-1 absolute items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white left-[30px] -top-1">{cartLength}</Link>

                <Link href={'/cart'}>
                  <svg href="/cart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="file: h-6 w-6 ml-4 text-white hover:text-yellow-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </Link>
              </div>
            </li>
            <li>
              <a href="/login" className="block py-2 px-3 text-white rounded hover:text-yellow-400  md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 ">{account}</a>
            </li>
            <li>
              <Link
                href="/" onClick={() => setlogoutModalOpen(true)}
                className="block py-2 px-3 text-white rounded hover:text-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-blue-500">Logout</Link>
            </li>
          </ul>
          {logoutmodalOpen && <Logout onclose={() => setlogoutModalOpen(false)} handlelogout={() => handlelogout()} />}
        </div>
      </div>
    </nav>

  )
}

export default Header;