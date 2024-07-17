import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { allApplications } from "@/redux/actions/employeeAction";
import { getJobById } from "@/redux/actions/jobAction";
import { applicationSend, currentStudent } from "@/redux/actions/studentAction";
import Link from "next/link";
import { useRouter } from "next/router";
import { stringify } from "postcss";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegClock, FaShoppingBag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCashOutline } from "react-icons/io5";
import { MdOutlineNotStarted } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TbWorld } from "react-icons/tb";
import { LiaNetworkWiredSolid } from "react-icons/lia";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  
  
  
  const { job, loading } = useSelector((e) => e.Jobs);
  const { student } = useSelector((e) => e.student);
  const [isApplied, setApplied] = useState(false);
  const [islogin,setislogin] = useState(false)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!id) {
      return;  
    }
    dispatch(getJobById(id));
    checkIsApplyed()
  }, [id,student]);

  useEffect(() => {
    dispatch(currentStudent());
    if(student){
      checkIsApplyed()
      setislogin(true)
    }
    else{

    }
  }, []);

  

  const checkIsApplyed = async () =>{
    const currentId = id?.toString();
    const apply = student?.jobapplications?.includes(currentId)
    if(apply){
      setApplied(true)
    }
  }

  const studentApplications = student?.applications?.map((application) =>
    application.toString()
  );
  const jobApplications = job?.applications?.map((application) =>
    application.toString()
  );

  const isAlreadyApplied =
    studentApplications &&
    jobApplications &&
    studentApplications.some((applicationId) =>
      jobApplications.includes(applicationId)
    );

  const handleApply = () => {
    if(student?.resume?.education?.length != 0 || student?.resumePdf?.fileId){
      if(student?.resumePdf?.fileId){
        dispatch(applicationSend({ jobId: id, resume: "a.pdf" }));
      }
      dispatch(applicationSend({ jobId: id, resume: "a.pdf" }));
      dispatch(currentStudent());
      setApplied(true);
    } else{
      toast.warn("Please upload your resume or create one through our resume builder.", {
        position: "top-right",
      });
    }
  };

  return (
    <Layout>
      <Container>
        {job && (
          <Container>
            <div className="min-h-screen pt-16 px-4 flex flex-col items-center justify-center bg-gray-100 mb-8 relative ">
            {/* <img src="/job2.gif" className=" absolute top-0 z-10  w-[100vw] h-[100vh]" alt="" /> bg-[url('/job2.gif')]  */}
              <h1 className="text-2xl font-semibold mt-4 mb-6">
                {job?.employer?.organisationname}
              </h1>
              <div className="bg-white w-full lg:w-3/5 p-8 flex flex-col gap-6 rounded-md shadow-md relative z-30  mt-1">
                <div className="flex border border-gray-300 rounded-md p-2 w-max">
                  <p className="text-xs text-gray-600">Actively hiring</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-xl font-semibold ">{job?.title}</h1>
                    <p className="text-sm text-gray-600 ">
                      Jalan Technology Consulting
                    </p>
                  </div>
                  <img
                    src={job?.employer?.organisationlogo.url}
                    className="h-10 object-cover"
                    alt=""
                  />
                </div>

                <div className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                  <FaLocationDot />
                  <p>{job?.location}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <MdOutlineNotStarted />
                      <p className="text-xs uppercase">Job Type</p>
                    </div>
                    <h3 className="text-black ps-[23px]">{job?.jobType}</h3>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <IoCashOutline />
                      <p className="text-xs">CTC (ANNUAL)</p>
                    </div>
                    <h3 className="text-black ps-[23px]">{job?.salary}</h3>
                  </div>

                  <div className="flex flex-col items-start text-slate-700 uppercase">
                    <div className="flex items-center gap-2">
                      <FaShoppingBag />
                      <p className="text-xs">Openings</p>
                    </div>
                    <h3 className="text-black ps-[23px]">{job?.openings}</h3>
                  </div>
                </div>

                <hr className="w-full h-px bg-gray-300 my-6" />

                <div>
                  <h1 className="text-xl font-semibold">About the job</h1>
                  {job?.description?.map((description, index) => (
                    <ol key={description} className="text-base py-1 capitalize list-disc ps-4">
                      <li>{description}</li>
                    </ol>
                  ))}
                </div>

                <div>
                  <h1 className="text-xl font-semibold">Skills</h1>
                  {job?.skills?.map((skill, index) => (
                    <ol key={index} className="text-base py-1 capitalize">
                      {skill}
                    </ol>
                  ))}
                </div>
                
                <div>
                  <h1 className="text-xl font-semibold">Preferences</h1>
                  {job?.preferences?.map((preferences, index) => (
                    <ol key={preferences} className="text-base py-1 capitalize list-disc ps-4">
                      <li>{preferences}</li>
                    </ol>
                  ))}
                </div>
                <div className="mt-8">
                  <h1 className="text-2xl font-semibold mb-4">
                    Employer Contact Details
                  </h1>
                  <div className="bg-white p-6 rounded-md shadow-md">
                    <p className="text-lg mb-2">
                      Phone:{" "}
                      <a
                      href={`tel:+91-${job?.employer?.contact}`}
    
                        // href={`https://api.whatsapp.com/send?phone=${job?.employer?.contact}`}
                        target="_top"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {job?.employer?.contact}
                      </a>
                    </p>
                    <a 
                  href={`mailto:${job?.employer?.email}`}
                  target="_top"
                  className="text-lg">Email: {job?.employer?.email}</a>
                  <div>


                  
                  </div >
                  
                  <dir className="flex gap-3 mt-2 ">
                  {
                    job?.employer?.website &&
                    <div className="flex gap-1 items-center hover:text-sky-500">
                      <a className="flex items-center gap-1" target="_blank" href={job?.employer?.website}>
                  Website
                    </a>
                  <TbWorld />
                    </div>
                    
                  }
                  {
                    job?.employer?.socialMedia &&
                    <div className="flex gap-1 items-center hover:text-sky-500">
                      <a href={job?.employer?.socialMedia} target="_blank" className=" ">So-Media </a>
                      <LiaNetworkWiredSolid />
                    </div>
                  }
                   
                    

                  
                  </dir>

                  </div>
                </div>


                { islogin &&  

                <div className="flex items-center justify-end">
                  {/* {loading && <div className="text-sm">Loading</div>} */}
                  {/* {isApplied ?<h1>ture</h1>:<h1>false</h1>} */}
                  
                  {
                    !isApplied ? (<div
                    onClick={handleApply}
                    className="border-2 px-4 py-2 text-sm border-green-500 text-black-500 hover:bg-sky-500 hover:text-white rounded-md cursor-pointer transition-all duration-300"
                  >
                    Apply
                  </div>) :
                  (<div className="bg-gray-300 px-4 py-2 text-sm text-gray-600 rounded-md">
                  Applied
                </div>)
                  }
                  {/* {!isAlreadyApplied ? (
                    <div
                      onClick={handleApply}
                      className="border-2 px-4 py-2 text-sm border-green-500 text-black-500 hover:bg-sky-500 hover:text-white rounded-md cursor-pointer transition-all duration-300"
                    >
                      Apply
                    </div>
                  ) : (
                    <div className="bg-gray-300 px-4 py-2 text-sm text-gray-600 rounded-md">
                      Applied
                    </div>
                  )} */}
                </div>
               }
              </div>
            </div>
          </Container>
        )}
      </Container>
    </Layout>
  );
};

export default Details;
