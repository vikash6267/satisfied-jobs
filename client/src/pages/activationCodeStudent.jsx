import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { submitOtpStudent } from '@/redux/actions/studentAction';
import { Router, useRouter } from 'next/router';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const activationCodeStudent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { student, error } = useSelector((state) => state.student);
  const [activationCode,setActivationCode] = useState();

  const submit = async() => {
    if(activationCode.lenght <= 3){
          console.log("pls enter 4 digi otm")
          return
        }
        const otp = {
          activationCode
        }
        const response = await dispatch(submitOtpStudent(otp)) ;
        if(response == "registered successfully"){
          toast.success("students registered successfully");
          router.push("/")
        }
        else {
          toast.error(response?.message);
        }
  };

  useEffect(() => {
    if(student){
      router.push("/")
    }
  }, [student])
  
  return (
    <div className='flex  items-center flex-col justify-center'>
      <div className='h-[20vh] bg-[#4080ED] w-full  pb-8 rounded-lg block sm:hidden pt-[12vh] '>
        <h2 className=' text-white text-[33px] font-semibold text-center '>SATISFIED JOB</h2>
        {/* <Link
          href={"/"}
          className=""
        >
          SATISFIED JOB
        </Link> */}
      </div>
      <h2 className=' text-[#4080ED] text-[33px] mt-10 font-semibold text-center sm:block hidden '>SATISFIED<span className='text-black'>JOB</span> </h2>
        <img src="./sendmail.png" className='h-[260px]'  alt="" />
        <h3 className=' uppercase font-bold text-12 mb-3'>verification code</h3>
        <input id="otpinput" type="text" className='' name="activationCode" onChange={(e) => setActivationCode(e.target.value)}  maxLength={4}/>
        <h6 className='w-[300px] text-sm mt-3'>Please enter the 4-digit code sent to your email</h6>
        <button className='bg-[#4080ED] text-white px-3 py-2 mt-5 rounded-md' onClick={submit}>Submit</button>
    </div>
  )
}

export default activationCodeStudent