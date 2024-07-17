import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  fetchCourseCategories,
  getAllCourses,
} from "@/services/operations/courseDetailsAPI";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "@/components/Container";

function Course() {
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  const handleClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories();
      setCourseCategories(categories);
    };

    const getCourses = async () => {
      const fetchedCourses = await getAllCourses();
      setCourses(fetchedCourses);
    };

    getCategories();
    getCourses();
  }, []);

  const categoryColors = ["bg-[#3a4f4b]", "bg-[#2e423f]", "bg-[#1e2d2b]", "bg-[#14201e]"];

  return (
    <Layout>
      <Container>
        <div className="flex flex-col mt-20 mb-10 w-full">
          <div className="w-11/12 mx-auto">
            <div className="text-center mb-10">
              <p className="bg-blue text-white rounded-xl py-2 px-4 inline-block text-lg font-bold shadow-lg">
                Popular Courses
              </p>
            </div>
          {
            courses.length === 0 ? <div>No Course Yet </div> :
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
              {courses?.map((course) => (
                <Link key={course._id} href={`/courseDetails/${course._id}`}>
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-indigo-800">
                        {course.courseName}
                      </h3>
                      <p className="text-green-600 font-semibold mt-2">Free</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          }

          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Course;
