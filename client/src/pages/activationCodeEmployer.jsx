import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { submitOtpEmployer } from '@/redux/actions/employeeAction';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

const activationCodeEmployer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { employee, error } = useSelector((state) => state.employee);
  const [activationCode,setActivationCode] = useState();


  const submit = async() => {
    if(activationCode.lenght <= 3){
          console.log("pls enter 4 digi otm")
          return
        }
        const otp = {
          activationCode
        }
        const response = await dispatch(submitOtpEmployer(otp)) ;
        if(response == "registered successfully"){
          toast.success("registered successfully");
          router.push("/addComponyDeatils")
        }
        else {
          toast.error(response?.message);
        }
  };

  useEffect(() => {
    if (employee) {
      router.push("/addComponyDeatils") 
    }
  }, [employee]);
  


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
        <img src="./sendmail.png" className='h-[260px]'  alt="" />
        <h3 className=' uppercase font-bold text-12 mb-3'>verification code</h3>
        <input id="otpinput" type="text" className='' name="activationCode" onChange={(e) => setActivationCode(e.target.value)}  maxLength={4}/>
        <h6 className='w-[300px] text-sm mt-3'>Please enter the 4-digit code sent to your email</h6>
        <button className='bg-[#4080ED] text-white px-3 py-2 mt-5 rounded-md' onClick={submit}>Submit</button>
    </div>
  )
}

export default activationCodeEmployer