import React from "react";
import Image from 'next/image';

type Props = {};

const AboutMe = (props: Props) => {
    return (
        <>
            <div>
                <h2 className="pb-4 text-4xl font-bold text-center text-gray-800 dark:text-gray-400 mt-32 border-b-8 border-blue-500 mx-auto justify-center flex-1 max-w-6xl ">
                    About Us
                </h2>
                <section className="flex items-center bg-stone-100 mt-16 font-poppins dark:bg-gray-800 ">
                    <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                        <div className="flex flex-wrap ">
                            <div className="w-full h-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                                <span className="text-xs font-semibold text-blue-400 uppercase">
                                    Who we are
                                </span>
                                <h2 className="mt-2 mb-6 text-2xl font-bold dark:text-gray-300">
                                    We are the large business expert in Europe and Asia
                                </h2>
                                <p className="mb-10 text-gray-600 dark:text-gray-400 ">
                                    Welcome to <b>Vision Fashion</b>, where we transcend the
                                    ordinary and elevate your online shopping experience to new
                                    heights. At the forefront of e-commerce innovation, we are
                                    dedicated to bringing you an extensive selection of top-notch
                                    products, carefully curated to meet your diverse needs and
                                    desires.
                                </p>
                                <p className="mb-10 text-gray-600 dark:text-gray-400 ">
                                    {" "}
                                    Founded with a passion for excellence, <b>Vision Fashion</b> is
                                    more than just an online marketplace. it is a destination where
                                    quality, variety, and exceptional service converge. Our
                                    commitment to customer satisfaction is unwavering, reflected in
                                    our seamless transactions, secure payment methods, and prompt,
                                    reliable shipping.
                                </p>

                            </div>
                            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                                <div className="relative">
                                    <img
                                        src={"/about.jpg"}
                                        alt="aboutimage"
                                        className="relative z-10 object-cover w-full h-full rounded"
                                    />
                                    <div className="absolute bottom-0 right-0 z-10 p-4 bg-white shadow sm:p-8 dark:text-gray-300">
                                        <p className="text-sm font-semibold">
                                            Providing IT solutions from 10 years
                                        </p>
                                    </div>
                                    <div className="absolute hidden w-full h-full bg-blue-400 rounded -bottom-6 left-6 lg:block"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex items-center pb-20 bg-gray-100 font-poppins">
                    <div className="justify-center flex-1 max-w-6xl px-12 pb-4 mx-auto lg:py-6 md:px-6">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
                                <div className="flex flex-wrap">
                                    <div className="w-full px-4 md:w-1/2">
                                        <img
                                            src="https://i.postimg.cc/YCJW7jv8/pexels-fauxels-3184357.jpg"
                                            alt=""
                                            className="object-cover w-full mb-6 rounded-lg h-80"
                                        />
                                        <img
                                            src="https://i.postimg.cc/j5L5bX2d/pexels-andrea-piacquadio-3757946.jpg"
                                            alt=""
                                            className="object-cover w-full mb-6 rounded-lg h-80"
                                        />
                                    </div>
                                    <div className="w-full px-4 md:w-1/2 xl:mt-11">
                                        <img
                                            src="https://i.postimg.cc/sXJQ5cw0/pexels-pixabay-256455-1.jpg"
                                            alt=""
                                            className="object-cover w-full mb-6 rounded-lg h-80"
                                        />
                                        <img
                                            src="https://i.postimg.cc/vHTg6593/aqq.jpg"
                                            alt=""
                                            className="object-cover w-full rounded-lg h-80"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
                                <>
                                    <div className="flex mb-4">
                                        <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-file-earmark-code"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                                <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                                                Design
                                            </h2>
                                            <p className="text-base leading-loose text-gray-500 dark:text-gray-400">
                                                In the design phase, prioritize user experience with wireframes and high-fidelity mockups. Emphasize intuitive navigation, responsive design, and visual aesthetics. Iterate based on feedback for a polished and user-friendly website.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-4">
                                        <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-file-text"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                                                Strategy
                                            </h2>
                                            <p className="text-base leading-loose text-gray-500">
                                                Strategize development with a user-centric focus, employing a mobile-first approach, optimizing performance, and ensuring cross-browser compatibility. Leverage frameworks, prioritize clean code, and implement security measures. Regularly test, iterate, and maintain for a successful website.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-blue-500 rounded dark:bg-blue-500 dark:text-gray-100 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-bank2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z"></path>
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                                                Develop
                                            </h2>
                                            <p className="text-base leading-loose text-gray-500">
                                                In the development phase, translate design into functional code using HTML, CSS, and JavaScript. Employ frameworks for efficiency. Focus on clean, modular coding, optimize performance, and ensure cross-browser compatibility. Regularly test, debug, and refine for a robust, high-quality website.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutMe;
