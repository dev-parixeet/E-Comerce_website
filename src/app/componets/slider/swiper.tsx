// import React, { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Pagination } from 'swiper/modules';
// import 'swiper/css/autoplay';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';


// export default function Swipers() {
//     return (
//         <>
//             <Swiper
//                 slidesPerView={4}
//                 spaceBetween={10}
//                 freeMode={true}
//                 autoplay={{ delay: 2000 }}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 modules={[FreeMode, Pagination]}
//                 className="mySwiper justify-center items-center flex "
//             >
//                 <SwiperSlide >
//                     <div >
//                         <img src='https://m.media-amazon.com/images/I/51uUO70olKL._AC_SY200_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide >
//                     <div className='w-44 ml-12'>
//                         <img src='https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY218_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide >
//                     <div >
//                         <img src='https://m.media-amazon.com/images/I/71FkmgxzlNL._AC_SY200_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide >
//                     <div >
//                         <img src='https://m.media-amazon.com/images/I/81P6YFm57TL._AC_UL320_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide >
//                     <div className='w-40 ml-12'>
//                         <img src='https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_UY218_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>

//                 <SwiperSlide >
//                     <div className='w-40 ml-12'>
//                         <img src='https://m.media-amazon.com/images/I/41f-6BEDVIL._AC_UF226,226_FMjpg_.jpg' className='h-48 w-64' />
//                     </div>
//                 </SwiperSlide>




//             </Swiper>
//         </>
//     );
// }





import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Swipers() {
    return (
        <>
            <h1 className="mt-5 mb-10 text-center text-2xl font-bold"><span className=' border-b-4 border-sky-500 ml-16'> Latest Product's</span></h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                loop={true}
                freeMode={true}
                autoplay={{ delay: 1000 }}
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper xl:justify-center xl:items-center flex"
            >
                {/* Slides go here */}
                <SwiperSlide>
                    <div className='sm:h-60'>
                        <img
                            src="https://m.media-amazon.com/images/I/51uUO70olKL._AC_SY200_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="xl:w-44 xl:ml-12">
                        <img
                            src="https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY218_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                        <img
                            src="https://m.media-amazon.com/images/I/71FkmgxzlNL._AC_SY200_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                        <img
                            src="https://m.media-amazon.com/images/I/81P6YFm57TL._AC_UL320_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="xl:w-40 xl:ml-12">
                        <img
                            src="https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_UY218_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="xl:w-40 xl:ml-12">
                        <img
                            src="https://m.media-amazon.com/images/I/41f-6BEDVIL._AC_UF226,226_FMjpg_.jpg"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="xl:w-40 xl:ml-12">
                        <img
                            src="https://rukminim2.flixcart.com/image/612/612/l3xcr680/jewellery-set/u/g/a/na-na-german-silver-half-cut-ball-chain-jewellery-set-arch-original-imagexshsuab3zsf.jpeg?q=70"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="xl:w-40 xl:ml-12">
                        <img
                            src="https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/j/p/p/6-wboot-kardam-sons-white-original-imaghcx5eejw82ee.jpeg?q=70"
                            className="xl:h-48 xl:w-64 object-fill"
                        />
                    </div>
                </SwiperSlide>


            </Swiper>
        </>
    );
}

