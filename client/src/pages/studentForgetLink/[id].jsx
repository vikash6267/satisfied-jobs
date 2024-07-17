import React, { useEffect } from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  loginStudent,
  resetPassword,
  sendMail,
} from "@/redux/actions/studentAction";

const ForgetPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { student, error } = useSelector((state) => state.student);

  const {id} = router.query;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (data.password != data.ConformPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (id) {
      toast.error("try again");
    }

    dispatch(resetPassword(data.password, id));
    router.push(`/`);
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex relative text-black">
      <Link
        href="/"
        className="absolute top-2  left-2 md:left-4 md:top-2  text-white flex items-center  cursor-pointer justify-center"
      >
        <MdArrowBackIos className="text-md " />
        <p>Back</p>
      </Link>

      <div className="w-[40%] md:w-[60%] lg:w-[40%] hidden md:flex h-[100vh]  flex-col items-center py-[100px] bg-[#4080ED] ">
        <div className="text-white flex flex-col gap-3 ">
          <div>
            <p className="text-[25px] font-semibold">
              Complete your profile! 👋
            </p>
            <p className="text-[16px]">
              Unlock 500+ jobs from top companies and receive direct calls from
              HRs
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-[40px]">
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Takes only 4 steps</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Takes only 4 steps</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[16px] h-[16px] flex  items-center justify-center rounded-full bg-[#C8C2C9]">
                <TiTick className="text-[#37283A]" />
              </div>
              <p>Takes only 4 steps</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] px-[20px] md:w-[60%] h-[100vh] flex bg-purple text-white md:bg-white md:text-black  flex-col justify-center items-center">
        <h1 className="text-3xl capitalize font-semibold my-5">
          Enter New Password
        </h1>

        <form
          onSubmit={onSubmit}
          className="flex w-full md:w-[50%] flex-col  gap-[10px] items-center justify-center"
        >
          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]">Password</p>
            <input
              type="text"
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your email address"
              {...register("password", { required: true })}
            />
            {errors.email && (
              <p className="text-[15px] text-red-500">please Password.</p>
            )}
          </div>

          <div className="w-full">
            <p className="text-[18px] my-2 font-[500]"> Conform Password</p>
            <input
              type="text"
              style={{ border: "2px solid #D1CED4" }}
              className="  px-3 py-2  w-[100%] rounded-md outline-none"
              placeholder="please enter your email address"
              {...register("ConformPassword", { required: true })}
            />
            {errors.email && (
              <p className="text-[15px] text-red-500">
                please Conform Password.
              </p>
            )}
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 w-[100%] text-white bg-green font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-transparent border-2 hover:text-green ">
            submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPage;
