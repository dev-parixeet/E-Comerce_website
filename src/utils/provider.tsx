"use client"
import Footer from '@/app/componets/footer/page';
import Header from '@/app/componets/header/header';
import { usePathname } from 'next/navigation'
import React from 'react'
import { ToastContainer } from 'react-toastify';

type Props = {}

function Provider({ children }: React.PropsWithChildren<Props>) {
    const pathname = usePathname()
    const comanroute = ['/login'];
    const isPublicRoute = comanroute.includes(pathname)

    return (
        <>
            {isPublicRoute ? (

                <>
                    {children}
                    <ToastContainer />
                </>
            ) : (

                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            )}
        </>
    )
}

export default Provider
