import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ForgetPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
//   const { student, error } = useSelector((state) => state.student);

  const {id} = router.query;
  const { allApplication} = useSelector(
    (state) => state.employee
  );
  const [Resume , setResume] = useState({});

  useEffect(() => {
    let resume = allApplication?.find((student) => student?.studentId?._id == id)
    setResume(resume.studentId);
    console.log(Resume)
  }, [allApplication]);

  return (
    <div className="bg-gray-100 p-5 lg:p-10  ">

       

      <h1 className=" text-center font-medium sm:font-semibold text-xl sm:text-2xl mb-5 ">Student Resume</h1>
      <div
        className="max-w-4xl mx-auto bg-white shadow-lg  font-bold print:body print:margin-0 print:padding-0 print:box-border print:size-A4 print:portrait screen:@page-size-210mm-297mm screen:margin-0 screen:box-border screen:w-210mm screen:h-297mm "
        id="resume"
      >
        <div className="mb-3 flex justify-between px-8 py-8 bg-slate-300">
          <div className="flex justify-center">
            <h1 className=" uppercase text-2xl sm:text-4xl ">
              {Resume && Resume?.name}
            </h1>
          </div>
          <div className=' font-medium text-[10px] sm:text-sm mt-1 " '>
            <ul className="flex  flex-col text-end text-slate-700 ">
              {Resume?.contact  && <li>+91-{ Resume && Resume?.contact}</li>}
              <li className="flex"> { Resume && Resume?.email}</li>
            </ul>
          </div>
        </div>
        { Resume?.resume &&
        <div className="px-8 pb-3">
       
          <h2 className="text-base  mb-3 sm:text-xl sm:mb-2">Education</h2>
          {Resume && Resume?.resume?.education != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.education && Resume?.resume?.education?.map((education) => (
                <div>
                  <div className="flex  justify-between gap-10 mb-">
                    <div>
                      {education.school && (
                        <h2 className=" font-medium text-sm">
                          {education.school} | {education.location}
                        </h2>
                      )}
                      {education.college && (
                        <h2 className=" font-medium text-sm">
                          {education.college} | {education.location}
                        </h2>
                      )}
                    </div>
                    <div>
                      <h6 className="font-medium text-sm text-slate-700 ">
                        {education.endyear}
                      </h6>
                    </div>
                  </div>
                  <div className="flex  mb-1 ">
                    {education.class && (
                      <h3 className=" font-medium text-sm text-slate-700 ">
                        {education.class} | {education.Stream}
                      </h3>
                    )}
                    {education.degree && (
                      <h3 className=" font-medium text-sm text-slate-700 ">
                        {education.degree} | {education.Stream}
                      </h3>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {Resume?.resume?.jobs.length != 0 && <h2 className="text-base mb-3 sm:text-xl sm:mb-2">Experience</h2>}
          {Resume?.resume?.jobs.length != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.jobs.map((job) => (
                <div>
                  <div className="flex  justify-between gap-10 mb-">
                    <div>
                      <h2 className=" font-medium text-sm">
                        {job.profile} | {job.location}
                      </h2>
                    </div>
                    <div>
                      <h6 className="font-medium text-sm text-slate-700 ">
                        {job.enddate}
                      </h6>
                    </div>
                  </div>
                  <div className="flex   ">
                    <h3 className=" font-medium text-sm text-slate-700 ">
                      {job.organization}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-2">
                      {job.description}
                    </p>
                  </div>
                </div>
            
              ))}
            </div>
          )}
          {Resume?.resume?.internships?.length != 0 && (
            <h2 className="text-base mb-3 sm:text-xl sm:mb-2">Interships</h2>
          )}

          {Resume?.resume?.internships?.length != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.internships?.map((intership) => (
                <div>
                  <div className="flex  justify-between gap-10 mb-">
                    <div>
                      <h2 className=" font-medium text-sm">
                        {intership.profile} | {intership.location}
                      </h2>
                    </div>
                    <div>
                      <h6 className="font-medium text-sm text-slate-700 ">
                        {intership.enddate}
                      </h6>
                    </div>
                  </div>
                  <div className="flex   ">
                    <h3 className=" font-medium text-sm text-slate-700 ">
                      {intership.organization}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-2">
                      {intership.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {Resume?.resume?.projects?.length != 0 && (
            <h2 className="text-base mb-3 sm:text-xl sm:mb-2">Projects</h2>
          )}
          {Resume?.resume?.projects?.length != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.projects?.map((project) => (
                <div>
                  <div className="flex  justify-between gap-10 mb-">
                    <div>
                      <h2 className=" font-medium text-sm">{project.title}</h2>
                    </div>
                  </div>
                  <div className="flex  ">
                    <h3 className=" font-medium text-sm text-slate-700 ">
                      <a className=" text-sky-500 " href={project.url}>
                        {" "}
                        Project Link
                      </a>
                    </h3>
                  </div>
                  <ul>
                    <li className=" text-xs text-slate-700 mb-2 ">
                      {project.description}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}

          {Resume?.resume?.skills?.length != 0 && (
            <h2 className="text-base mb-3 sm:text-xl sm:mb-2">Skills</h2>
          )}
          {Resume?.resume?.skills?.length != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.skills?.map((skill) => (
                <div className="px-3">
                  <ul className=" flex gap-10 flex-wrap list-disc ">
                    <li className=" text-xs">{skill.skill} <spans className=" text-slate-500">({skill.level})</spans></li>
                  </ul>
                </div>
              ))}
            </div>
          )}
          {Resume?.resume?.courses.length != 0 && (
            <h2 className="text-base mb-3 sm:text-xl sm:mb-2">
              Course/ Traning
            </h2>
          )}

          {Resume?.resume?.courses.length != 0 && (
            <div className=" border-t-2 border-slate-400 py-2">
              {Resume?.resume?.courses?.map((course) => (
                <div>
                  <div className="flex  justify-between gap-10 mb-">
                    <div>
                      <h2 className=" font-medium text-sm">
                        {course.traning} | {course.location}
                      </h2>
                    </div>
                    <div>
                      <h6 className="font-medium text-sm text-slate-700 ">
                        {course.enddate}
                      </h6>
                    </div>
                  </div>
                  <div className="flex  mb-1 ">
                    <h3 className=" font-medium text-sm text-slate-700 ">
                      {course.organization}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {Resume?.resume?.responsibilities?.length != 0 && (
            <h2 className="text-base mb-3 sm:text-xl sm:mb-2">
              POSITION OF RESPONSIBILITY
            </h2>
          )}

          {Resume?.resume?.responsibilities?.length != 0  && (
            <div className=" border-t-2 border-slate-300 py-2 mb-5">
              {Resume?.resume?.responsibilities?.map((res) => (
                <div>
                  <div>
                    <p className="text-xs text-slate-600">
                      {res.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        }
      </div> 
    </div>
  );
};

export default ForgetPage;
