import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

function CourseSwiper({ course }) {
    const courses = course
    useEffect(()=>{
console.log(courses)
    },[])
  return (
    <div className="max-h-[30vh] w-screen my-[30px] ">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {courses?.map((course) => (
          <SwiperSlide key={course._id}>
            <div
              className=" bg- w-full border p-2 rounded-2xl "
              
              
            >
<Link href={`/courseDetails/${course?._id}`}>
    
<div className=" flex justify-center">
<img src={course?.thumbnail} alt="" className="min-w-[100px] max-h-[200px]" />

</div>
<div className=" flex  justify-between w-[80%] mx-auto my-4 font-semibold text-xl text-indigo-800">
<span>{course.courseName}</span>
<p>Free</p>
</div>
</Link>
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CourseSwiper;
