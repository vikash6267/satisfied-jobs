import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
const inter = Inter({ subsets: ["latin"] });
import { MdReviews } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { currentStudent } from "@/redux/actions/studentAction";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CiLocationOn } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdWorkOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { AiOutlineSafety } from "react-icons/ai";
import { IoIosSchool } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Home() {
  var array = [1, 2, 3, 4, 5, 6];
  const router = useRouter();
  const { student, error, loading } = useSelector((state) => state.student);
  const { employee } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setsearchLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const basePath = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user`;
  const [topCompany, settopCompany] = useState([]);
  const [resentJobs, setresentJobs] = useState([]);
  

  const searchJobs = async () => {
    try {
      const response = await axios.post(
        `${basePath}/search?q=${searchTerm}&location=${searchLocation}`
      );
      setJobs(response.data);
    } catch (error) {
      toast.error("Server isn't Working pleas visit again after some time  !", {
        position: "top-left",
      });
    }
  };

  const topcompany = async () => {
    try {
      const response = await axios.post(`${basePath}/topcompony`);
      settopCompany(response.data.jobs);
    } catch (error) {
      toast.error("Server isn't Working pleas visit again after some time  !", {
        position: "top-left",
      });
    }
  };

  const resentCompany = async () => {
    try {
      const response = await axios.post(`${basePath}/resentjobs`);
      setresentJobs(response.data.jobs);
    } catch (error) {
      toast.error("Server isn't Working pleas visit again after some time  !", {
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    dispatch(currentStudent());
    topcompany();
    resentCompany();
  }, []);

  useEffect(() => {
    if(employee){
      router.push("/dashboard")
    }
  }, [employee]);

  const redirectToJob = () => {
    router.push("/Job");
  };

  const onJobClick = (id) => {
    if (student) {
      router.push(`./details/${id}`);
    } else if (employee) {
      toast("pleas Login as Student");
    } else {
      router.push("./loginUser");
    }
  };

  const onViewAllClick = (id) => {
    if (student) {
      router.push(`/Job`);
    } else if (employee) {
      toast("pleas Login as Student");
    } else {
      router.push("./loginUser");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "" && searchLocation.trim() === "") {
      setJobs([]);
    }
  }, [searchTerm, searchLocation]);

  return (
    <div className="w-[100vw]">
      <Layout>
        <Container bgColor={""}>
          <div id="homdiv" className="w-full mt-20 ">
            <img className=" rounded-sm" src="/2.png" alt="" />
          </div>
          <h2 className="mt-3 uppercase sm:mt-28  sm:text-5xl  text-[#333333] py-5 text-center font-bold text-[30px] px-11 leading-10 leadintep ">
            FIND YOUR DREAM JOB NOW
          </h2>
          <h4 className=" font-medium uppercase text-center  text-xs text-slate-600 sm:text-lg sm:text-black">
            SATISFIED JOBS for you to exploer
          </h4>
          <div
            id="serchmaindiv"
            className=" rounded-xl  serchperent bg-white h-16  m-auto flex mt-8 relative "
          >
            <button
              id="mainserchbtnserch"
              className=" absolute bg-[#4080ED] py-2 px-6 rounded-2xl top-[12px] right-3 text-white "
              onClick={searchJobs}
            >
              Serch
            </button>

            <div className="absolute top-[25px] left-5 ">
              <FaSearch id="searchicanbor" className="text-[15px]" />
            </div>

            <input
              id="search"
              type="text"
              className=" focus:outline-none"
              placeholder="Enter Jobs, Skills or Designations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex">

           
            <h6 className=" flex gap-1 items-center text-[20px] text-slate-300"> <span id="locationbariconslesh">|</span>
              {<IoLocationOutline className="text-[23px]" />}
            </h6>
            <input
              id="locationmaindiv"
              type="text"
              className=" border-l-1 focus:outline-none"
              placeholder="Location"
              value={searchLocation}
              onChange={(e) => setsearchLocation(e.target.value)}
            />
            </div>

            {/* <input
              id="search"
              type="text"
              className=" rounded-xl py-10 pt-8 text-[10px] sm:text-base"
              placeholder="enter skills/ designations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-[21px] left-5 ">
              <FaSearch className="text-[15px]" />
            </div>
            <button
              className=" absolute bg-[#2ea1e0] py-2 px-6 rounded-2xl top-[10px] right-3 text-white "
              onClick={searchJobs}
            >
              Serch
            </button> */}
            {jobs?.length != 0 && (
              <div
                id="serchdiv"
                className=" absolute top-[110%] w-[800px] h-[18vh] rounded-xl  bg-white px-3 pt-4 overflow-y-auto "
              >
                {jobs?.map((job) => {
                  return (
                    <div
                      className="px-3 py-2 flex justify-between gap-3 border border-slate-300 rounded-3xl  my-1"
                      onClick={() => onJobClick(job._id)}
                    >
                      <div className="flex gap-1">
                        <h6>{job.title}</h6>
                        <p id="serchdivtype" className="text-[#424242]">
                          | {job.jobType}
                        </p>
                      </div>
                      <h6 id="serchdivlocation">{job.location}</h6>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full flex justify-center gap-5 mt-4 sm:mt-9 text-slate-600">
            <button
              className="serchbtn border rounded-3xl px-4 py-1 border-slate-300"
              id="mentbtn"
            >
              Mern Stack Developer
            </button>
            <button className="border text-xs sm:text-sm rounded-3xl px-4 py-1 border-slate-300">
              Full Stack Develooper
            </button>
            <button
              id="serchbtnth"
              className="serchbtn border rounded-3xl px-4 py-1 border-slate-300"
            >
              Front End Developer
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-5 mt-8 sm:mt-32">
            <button className="effectSerchbtnone  font-medium py-4 px-8 border border-slate-300  rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              {" "}
              Remote <FaChevronRight className=" text-slate-600" />
            </button>
            <button className=" effectSerchbtntwo font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              MNC <FaChevronRight className=" text-slate-600" />
            </button>
            <button
              className=" font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md"
              id="effectSerchbtnthree"
            >
              Analytics <FaChevronRight className=" text-slate-600" />
            </button>
            <button className=" font-medium py-4 px-8 border border-slate-300 flex items-center gap-2 smbtn shadow-sm hover:shadow-md">
              Engineering <FaChevronRight className=" text-slate-600" />
            </button>
            <button className=" font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 smbtn shadow-sm hover:shadow-md">
              Fresher <FaChevronRight className=" text-slate-600" />
            </button>
            <button className="effectSerchbtnone font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              Fortune 500 <FaChevronRight className=" text-slate-600" />
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-5  mt-5">
            <button className="effectSerchbtnone font-medium py-4 px-8 border border-slate-300  rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              Remote <FaChevronRight className=" text-slate-600" />
            </button>
            <button className="effectSerchbtntwo font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              MNC <FaChevronRight className=" text-slate-600" />
            </button>
            <button className=" font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 smbtn shadow-sm hover:shadow-md">
              Analytics <FaChevronRight className=" text-slate-600" />
            </button>
            <button
              className=" font-medium py-4 px-8 border border-slate-300 flex items-center gap-2 shadow-sm hover:shadow-md"
              id="effectSerchbtnfour"
            >
              Engineering <FaChevronRight className=" text-slate-600" />
            </button>
            <button className="effectSerchbtnone font-medium py-4 px-8 border border-slate-300 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md">
              Fresher <FaChevronRight className=" text-slate-600 " />
            </button>
          </div>

          <div className="mt-2 sm:mt-32">
            <h2 className="sm:text-3xl text-xl text-center mt-3 sm:mt-5 text-[#333333]">
              SATISFIED JOB TOP FEATURS
            </h2>
            <div></div>
          </div>

          {/* <div
          className="w-full  bg-cover bg-center h-[50vh] mt-7"
          style={{ backgroundImage: `url("./S.png")` }}
        >
        </div> */}
          {/* <div className="w-full flex">
        <button onClick={() => redirectToJob()} className="bg-[#3871ff] text-white px-4 py-3 rounded-xl mt-3 ">Search Jobs</button>

        </div> */}
          <div
            id="feature"
            className="w-full sm:gap-20 flex flex-col justify-center items-center  sm:text-center mt-14 sm:mt-20 sm:flex-row gap-5"
          >
            <div className="w-[250px] h-[300px]  rounded-lg text-white   bg-[#2ea1e0] flex flex-col justify-center items-center">
              <IoNewspaper className="text-[70px]" />
              <h6 className=" mt-3">Resume Builder</h6>
              <p className="text-[#ddd]">Build your resme in few steps </p>
            </div>
            <div className="w-[250px]   h-[300px]  rounded-lg  bg-[#fbc750] flex flex-col justify-center items-center text-white">
              <IoIosSchool className="text-[70px]" />
              <h6 className=" mt-3">Qualified Student</h6>
              <p className="">Find best Qualified Student</p>
            </div>

            <div className="w-[250px]   h-[300px]  rounded-lg  bg-[#35cc61] flex flex-col justify-center items-center text-white">
              <AiOutlineSafety className="text-[70px]" />
              <h6 className=" mt-3">Verified Jobs</h6>
              <p className="text-[#ddd]">100% verified and save jobs</p>
            </div>

            {/* <div className=" w-[100vw] mt-20 flex items-center justify-center   ">
            <div className="w-[200px] md:w-[300px] flex-shrink-0 h-[300px] px-4 py-6 rounded-lg  bg-[#fbc750]">
              
              
                   
            </div>
            <div className="w-[200px] md:w-[300px] flex-shrink-0 h-[300px] px-4 py-6 rounded-lg  bg-[#3871ff] relative text-white ms-5 sm:ms-8">
                
            </div>
            
            <div  className="w-[350px] md:w-[400px] flex-shrink-0 h-[300px] py-[25px] md:py-[30px] px-[10px] md:px-[40px]  ml-[40px] bg-[#35cc61] rounded-lg flex justify-between flex-col">
                

                  
            </div>
      
            
          </div> */}
          </div>

          {/* <div className="w-[200px] md:w-[300px] flex-shrink-0 h-[300px] px-4 py-6 rounded-lg  bg-[#3871ff] relative text-white ms-5 sm:ms-8">
              <div className="flex gap-4 border-b-2 pb-3 border-slate-200 ">
                  <img src="./googlelogo.png" className="w-[50px] rounded-lg" alt="" />
                  <div className="flex flex-col ms-2">
                    <h3 className=" text-white ">MERN Web Developer</h3>
                    <h6 className=" text-white text-start ">Google</h6>
                  </div>
              </div>
              <div className="px-3 pt-4">
              <div className="flex items-center mb-1">
                <MdWorkOutline className="text-white" /> 
                <p className="ms-2">5 day</p>
                </div>
                <div className="flex items-center  mb-1">
                <GiTakeMyMoney className="text-white" /> 
                <p className="ms-2">$10000 m</p>
                </div>
                <div className="flex items-center  mb-1">
                <CiLocationOn />
                <p className="ms-2">Banglore</p>
                </div>
                
                <div className="flex items-center  mb-1">
                <GiTakeMyMoney className="text-white" /> 
                <p className="ms-2">$10000/inhand</p>
                </div>
              </div>
              <div className=" flex mt-3 ">
                <div className=" p-1  ">html</div>
                <div className="text-white  p-1  ">CSS</div>
                <div className=" p-1  ">JavaScript</div>
                <div className=" p-1  ">React</div>
                <div className="  p-1  "></div>
              </div>
              
              <div className=" absolute bottom-5 w-full px-5 left-0 text-white flex justify-between">
                <h6>$98000/year</h6>
                <h6>India</h6>
              </div>     
            </div> */}
        </Container>
        {/* <Container bgColor={"#190B28"}>
          <div className="min-h-[95vh] md:min-h-[90vh] flex justify-center items-center md:justify-between">
            <div className=" pt-[70px] px-[150px]  flex-col gap-[80px] hidden md:flex">
              <p className="text-white text-4xl text-[#FFD166]">
                Get job in just 3 steps...
              </p>

              <div className="flex flex-col gap-[20px]">
                <p className="text-white text-4xl font-semibold tracking-[2px]">
                  Build Apna Profile & get discovered <br /> by HRs
                </p>
                <p className="text-white text-4xl font-semibold tracking-[2px] opacity-[0.8]">
                  Build Apna Profile & get discovered <br /> by HRs
                </p>
                <p className="text-white text-4xl font-semibold tracking-[2px] opacity-[0.5]">
                  Build Apna Profile & get discovered <br /> by HRs
                </p>
              </div>
            </div>
            <div className="mobile pt-[70px] px-[20px]">
              <img src="./a1.webp" alt="" className="w-[300px]" />
            </div>
          </div>
        </Container> */}

        <div className=" md:py-[80px]">
          <Container bgColor={"#F4F2F6"}>
            <p className="sm:text-3xl text-xl font-[900] text-center mt-20 py-[10px] md:py-[10px] mb-16 text-[#333333] uppercase">
              Job Openings in Top companies
            </p>
          </Container>
          <div className=" w-[100vw] flex items-center  overflow-x-auto ">
            {topCompany?.map((e, i) => (
              <>
                <div
                  key={e._id}
                  onClick={() => onJobClick(e._id)}
                  className="w-[250px] md:w-[300px] flex-shrink-0 h-[230px] py-[25px] md:py-[25px] px-[10px] md:px-[20px]  ml-[30px]  rounded-lg  border-gray-50 hover:border-gray-200  hover:shadow-md border border-slate-300 overflow-hidden"
                >
                  <div className="flex gap-4 pb-1 ">
                    {/* <img
                      src="https://res.cloudinary.com/dcj2gzytt/image/upload/v1710311927/avaters/padkgv4yvswh2qzu0ybv.png"
                      className="w-[45px] rounded-lg"
                      alt=""
                    /> */}
                    <img
                      src={e?.employer?.organisationlogo.url}
                      className="w-[45px] h-[45px] rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col ms-2">
                      <h3 className=" truncate  ">{e?.title}</h3>
                      <h6 className=" text-[#424242] text-start truncate ">
                        {e?.employer?.organisationname}
                      </h6>
                    </div>
                  </div>
                  {e?.skills?.length != 0 && (
                    <div className=" md:text-sm flex mt-4 ms-2 sm:gap-2 gap-1 text-[8px]  text-[]">
                      {e?.skills?.slice(0, 2).map((skills, index) =>
                        index === 1 && skills?.length <= 15 ? (
                          <div
                            className="px-2 py-1 rounded-md bg-[#ddd] "
                            key={index}
                          >
                            {skills}
                          </div>
                        ) : (
                          <div
                            className="px-2 py-1 rounded-md bg-[#ddd] "
                            key={index}
                          >
                            {skills}
                          </div>
                        )
                      )}

                      {/* <div className="px-2 py-1 rounded-md bg-[#ddd] ">html</div>
                    <div className="px-2 py-1 rounded-md bg-[#ddd] ">CSS</div>
                    <div className="px-2 py-1 rounded-md bg-[#ddd] ">
                      JavaScript
                    </div>
                    <div className=" px-2 py-1 rounded-md bg-[#ddd]">React</div> */}
                    </div>
                  )}
                  <div className="w-full mt-16 text-[#424242]   flex justify-between">
                    <h6>₹{e?.salary}/year</h6>
                    <h6>{e?.location}</h6>
                  </div>
                </div>
              </>
            ))}
          </div>

          {/* <div className="w-full text-center mt-16">
            <button className="btn flex items-center justify-center">
              <span className="flex items-center gap-1 px-2">
                <p>View all</p>
                <RiArrowRightSLine className="text-lg" />
              </span>
            </button>
          </div> */}
        </div>

        <div className="">
          <Container bgColor={"#F4F2F6"}>
            <p className="sm:text-3xl text-xl font-[900] text-center  py-[10px] md:py-[10px] mb-16 mt-8 sm:mt-1 text-[#333333] uppercase">
              Recent Job Openings
            </p>
          </Container>
          <div className=" w-[100vw] flex items-center  overflow-x-auto ">
            {resentJobs.map((e, i) => (
              <>
                <div
                  key={e._id}
                  onClick={() => onJobClick(e._id)}
                  className="w-[250px] md:w-[300px] flex-shrink-0 h-[230px] py-[25px] md:py-[25px] px-[10px] md:px-[20px]  ml-[30px] rounded-lg border-gray-50 hover:border-gray-200  hover:shadow-md border border-slate-300 overflow-hidden "
                >
                  <div className="flex gap-4 pb-1   ">
                    <img
                      src={e?.employer?.organisationlogo.url}
                      className="w-[45px] h-[45px] rounded-lg"
                      alt=""
                    />
                    <div className="flex flex-col ms-2">
                      <h3 className=" truncate ">{e?.title}</h3>
                      <h6 className=" text-[#424242] text-start truncate ">
                        {e?.employer?.organisationname}
                      </h6>
                    </div>
                  </div>

                  {e?.skills?.length != 0 && (
                    <div className=" md:text-sm flex mt-4 ms-2 sm:gap-2 gap-1 text-[8px]  text-[]">
                      {e?.skills?.slice(0, 2).map((skills,index) =>
                        index === 1 && skills?.length >= 15 ? null : (
                          <div
                            className="px-2 py-1 rounded-md bg-[#ddd] "
                            key={index}
                          >
                            {skills}
                          </div>
                        )
                      )}

                      {/* <div className="px-2 py-1 rounded-md bg-[#ddd] ">html</div>
                    <div className="px-2 py-1 rounded-md bg-[#ddd] ">CSS</div>
                    <div className="px-2 py-1 rounded-md bg-[#ddd] ">
                      JavaScript
                    </div>
                    <div className=" px-2 py-1 rounded-md bg-[#ddd]">React</div> */}
                    </div>
                  )}

                  <div className="w-full mt-16 text-[#424242]   flex justify-between">
                    <h6>₹{e?.salary}/year</h6>
                    <h6>{e?.location}</h6>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="w-full text-center my-16 ">
            <button
              onClick={onViewAllClick}
              className=" m-auto text-white py-3 px-4 rounded-md  font-medium bg-[#4080ED] flex items-center justify-center"
            >
              <span className="flex items-center gap-1 px-2">
                <p>View all</p>
                <RiArrowRightSLine className="text-lg" />
              </span>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
