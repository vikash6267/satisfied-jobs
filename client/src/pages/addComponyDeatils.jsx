import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentEmployee, employerAddCompanyDeatils, registerEmployee } from "@/redux/actions/employeeAction";

const addComponyDeatils = () => {
  const router = useRouter();
  const { employee, error } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [socialMedia, setsocialMedia] = useState("");
  const [location, setLocation] = useState("");
  const [website, setwebsite] = useState("");

  const onSubmit = () =>{
    const company ={
        industry,
        companySize,
        socialMedia,
        location,
        website
    }
    dispatch(employerAddCompanyDeatils(company))

  }


  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    if(!employee){
      dispatch(currentEmployee())
    }
    if(employee?.location){
      console.log("run")
      router.push("/dashboard")
    }
  }, [employee])
  

  return (
    <div className="flex relative">
      <Link
        href="/"
        className="absolute top-2  left-2 md:left-4 md:top-2  text-white flex items-center  cursor-pointer justify-center"
      >
        <MdArrowBackIos className="text-md " />
        <p>Back</p>
      </Link>

      <div className="w-[40%] md:w-[60%] lg:w-[40%] hidden md:flex h-[100vh]  flex-col items-center py-[100px] bg-[#4080ED] px-10 relative">
        <div className="text-white flex flex-col gap-3 ">
          <div>
            <p className="text-[25px] font-semibold">Add Company's Details! 👋</p>
            <p className="text-[16px]">
            Enhance your company's presence and attract top talent by adding detailed information about your organization.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-[40px]">
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Boost Visibility</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Attract Local Talent</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Enhance Credibility</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Improve Match Quality</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 text-2xl text-white absolute bottom-8 ">
          <FaFacebookSquare />
          <FaSquareXTwitter />
          <IoLogoInstagram />
          <FaLinkedin />
        </div>
      </div>
      <div className="w-[100%] px-[20px] md:w-[60%] h-[100vh] flex   md:bg-white md:text-black  flex-col justify-center items-center">
        <Link
          href={"/"}
          className="text-[#4080ED] text-[33px] font-semibold flex items-center"
        >
          SATISFIED <span className="text-black">JOB</span>
        </Link>

        <form
          onSubmit={onSubmit}
          className="flex w-[300px] md:w-[50%] flex-col  gap-[10px] items-center justify-center"
        >
          <div className="flex justify-between w-full gap-1"></div>


          <div className="w-full">
            <label htmlFor="industry"
            className="text-[18px] my-2 font-[500]"
            >Industry</label>
            <select
              id="industry"
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            >
              <option value="">Select Industry</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Others">Others</option>
              {/* Add more options as needed */}
            </select>
          </div>


          <div className="w-full">
            <label
              htmlFor="companySize"
              className="text-[18px] my-2 font-[500]"
            >
              Company Size
            </label>
            <select
              id="companySize"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                required
            >
              <option value="">Select Company Size</option>
              <option value="Small">Small (1-50 employees)</option>
              <option value="Medium">Medium (51-500 employees)</option>
              <option value="Large">Large (501+ employees)</option>
            </select>
          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Compony Location</p>
            <input
              type="text"
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your email address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Compony Website</p>
            <input
              type="url"
              value={website}
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please give website URL" 
              onChange={(e) => setwebsite(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Social Media Links </p>
            <input
              type="url"
              style={{ border: "2px solid #D1CED4" }}
              value={socialMedia}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please give Social Media URL"
              required
              onChange={(e) => setsocialMedia(e.target.value)}
            />
          </div>

          <div></div>
          <button type="submit" className="transition duration-300 ease-in-out bg-blue-500 rounded-3xl  bg-[#4080ED] w-[100%] text-white bg-green font-bold py-2 px-4  focus:outline-none focus:shadow-outline  border-2  ">
            Add Deatils
          </button>
          
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default addComponyDeatils;
