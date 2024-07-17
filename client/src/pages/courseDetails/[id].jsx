import React, { useEffect, useState } from 'react';
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { fetchCourseDetails } from '@/services/operations/courseDetailsAPI';
import { useRouter } from 'next/router';

function CourseDetails() {
    const [course, setCourse] = useState({});
    const [videoActive, setVideoActive] = useState(""); // State to store active video URL
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const getCourse = async (id) => {
            try {
                const courseData = await fetchCourseDetails(id);
                const courseDetails = courseData?.data?.courseDetails;
                console.log("Single Course", courseDetails);
                setCourse(courseDetails);
                if (courseDetails?.courseContent?.length > 0) {
                    setVideoActive(courseDetails.courseContent[0]?.videoUrl); // Set first video as active by default
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };
        if (id) {
            getCourse(id);
        }
    }, [id]);

    return (
        <Layout>
            <Container>
                <div className='mt-[80px] mb-[80px]'>
                    <div className='flex justify-center text-2xl font-semibold'>
                        <h4>Course Details</h4>
                    </div>
                    <div className='mt-5'>



                        <div className='flex justify-center '>
                               {videoActive && (
                                    <div className='mt-5 min-w-screen'>
                                      
                                        <div className='mt-2'>
                                            {/* Embedded video or video player */}
                                            <iframe
                                                title='Active Video'
                                                width='560'
                                                height='315'
                                                src={videoActive}
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className='mt-5 text-center'>
                            <h2 className='text-3xl font-semibold'>{course.courseName}</h2>
                            {/* <p className='mt-3 text-gray-600'>{course.courseDescription}</p> */}
                            {/* <p className='mt-3'>Language: {course.langauge}</p> */}
                            {/* <p className='mt-3'>Price: {course.price === 0 ? 'Free' : `$${course.price}`}</p> */}
                            {/* <p className='mt-3'>Status: {course.status}</p> */}
                            {/* Displaying what you will learn */}
                            {/* <div className='mt-3'>
                                <h3 className='text-xl font-semibold'>What You Will Learn:</h3>
                                <p className='mt-2'>{course.whatYouWillLearn}</p>
                            </div> */}
                            {/* Displaying course content videos */}
                            <div className='mt-5 flex justify-center flex-col w-full'>
                                <h3 className='text-xl font-semibold'>Course Content:</h3>
                                <ul className='mt-2 flex justify-center flex-col '>
                                    {course.courseContent?.map((content, index) => (
                                        
                                        <li key={index} className='mt-2 flex w-[500px] mx-auto gap-3 border rounded-lg p-2'>
                                        <video src={content?.videoUrl} alt="" className=' h-[60px] rounded-full' />
                                            <button onClick={() => setVideoActive(content.videoUrl)} className='text-blue-500'>{content.title}</button>
                                            <span className='ml-2 text-gray-500'>- {content.videoName}</span>
                                        </li>
                                    ))}
                                </ul>
                                {/* Display active video */}
                            
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default CourseDetails;
