import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerStudent } from "@/redux/actions/studentAction";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const router = useRouter();
  const { student, error } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [username, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [gender, setgender] = useState("");
  const [course, setcourse] = useState("");

  useEffect(() => {
    
  }, [])

  if(student){
    setname(student?.name)
    setcontact(student?.contact)
    setemail(student?.email)
    setgender(student?.gender)
    setcourse(student?.course)
  }
  


 

  const onSubmit = () =>{

  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (student) {
      router.push("/");
    }
  }, [student]);

  return (
    <div className="flex relative">
      <Link
        href="/"
        className="absolute top-2  left-2 md:left-4 md:top-2  text-white flex items-center  cursor-pointer justify-center"
      >
        <MdArrowBackIos className="text-md " />
        <p>Back</p>
      </Link>
      <div className="w-full px-[20px] md:w-[750px] h-[100vh] flex	md:bg-white md:text-black  flex-col justify-center items-center m-auto">
      <Link
          href={"/"}
          className="text-[#4080ED] text-[33px] font-semibold flex items-center"
        >
          SATISFIED <span className="text-black">JOB</span>
        </Link>
        <h1 className="text-2xl capitalize font-semibold my-5">Edit your details</h1>

        <form
          onSubmit={onSubmit}
          className="flex w-[300px] md:w-[50%] flex-col  gap-[10px] items-center justify-center"
        >
          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Name</p>
            <input
              type="text"
              value={username}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your name"
            />

          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Contact</p>
            <input
              type="text"
              value={contact}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your contact"
             
            />

          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Email</p>
            <input
              type="text"
              value={email}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your email address"
  
            />

          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Course</p>
            <input
              type="text"
              value={course}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your current Course"
            />

          </div>

          

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Gender</p>
            <input
              type="password"
              value={gender}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your password "
            />
          </div>
          <div></div>
          <button className="bg-blue-500 rounded-3xl  bg-[#4080ED]  w-[100%] text-white bg-green font-bold py-2 px-4  focus:outline-none focus:shadow-outline  border-2 hover:text-white mt-4">
      Register
    </button>

    <p className="text-sm mt-2">
      Already have an account ?{"  "}
      <Link href="/loginUser" className="text-[#4080ED] hover:underline">
         Login
      </Link>
    </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
