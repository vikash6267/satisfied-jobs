import { getJobById } from "@/redux/actions/jobAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createJobs } from "@/redux/actions/jobAction";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

const EditJobs = ({ id, setTab }) => {
  const { job, loading } = useSelector((e) => e.Jobs);

  const dispatch = useDispatch();

  const [skills, setSkills] = useState([]);
  const [description, setDescriptions] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPreference, setNewPreference] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getJobById(id));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (job) {
      reset(job);
      setSkills(job.skills || []);
      setDescriptions(job.description || []);
      setPreferences(job.preferences || []);
    }
  }, [job, reset]);

  const onSubmit = (data) => {
    const currdata = { ...data, skills , preferences , description  }
    dispatch(getJobById(id, currdata));
    setTab("ViewAllJobs");
    reset();
    toast.success("Job edit successful");
  };

  const addSkill = () => {
    const newSkillTrimmed = newSkill.trim();
    if (newSkillTrimmed !== "" && !skills.includes(newSkillTrimmed)) {
      setSkills([...skills, newSkillTrimmed]);
      setNewSkill(""); // Clear the input field after adding the skill
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleInputChange = (event) => {
    setNewSkill(event.target.value);
  };

  const handleSkillChange = (event) => {
    if (event.key === "Enter") {
      const newSkillTrimmed = newSkill.trim();
      if (newSkillTrimmed !== "" && !skills.includes(newSkillTrimmed)) {
        setSkills([...skills, newSkillTrimmed]);
        setNewSkill(""); // Clear the input field after adding the skill
      }
    }
  };

  const addPreference = () => {
    const trimmed = newPreference.trim();
    console.log("Adding preference:", trimmed); // Debug log
    if (trimmed && !preferences.includes(trimmed)) {
      const updatedPreferences = [...preferences, trimmed];
      setPreferences(updatedPreferences);
      setNewPreference("");
      console.log("Updated preferences:", updatedPreferences); // Debug log
    }
  };

  const removePreference = (indexToRemove) => {
    setPreferences(preferences.filter((_, index) => index !== indexToRemove));
  };

  const addDescription = () => {
    const trimmed = newDescription.trim();
    if (trimmed && !description.includes(trimmed)) {
      setDescriptions([...description, trimmed]);
      setNewDescription("");
    }
  };

  const removeDescription = (indexToRemove) => {
    setDescriptions(description.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>
        {/* <div>
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            {...register("skills", { required: true })}
          />
          {errors.skills && (
            <span className="text-red-500 text-sm">Skills are required</span>
          )}
        </div> */}
        
        <div>
          <label htmlFor="jobType">Job Type:</label>
          <select id="jobType" {...register("jobType", { required: true })}>
            <option value="">Select Job Type</option>
            <option value="In Office">In Office</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.jobType && (
            <span className="text-red-500 text-sm">Job Type is required</span>
          )}
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" {...register("category", { required: true })}>
            <option value="">Select Category</option>
            <option value="Internship">Internship</option>
            <option value="job">Job</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">Category is required</span>
          )}
        </div>
        <div>
          <label htmlFor="openings">Openings:</label>
          <input
            type="text"
            id="openings"
            {...register("openings", { required: true })}
          />
          {errors.openings && (
            <span className="text-red-500 text-sm">Openings are required</span>
          )}
        </div>
        {/* <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div> */}
        {/* <div>
          <label htmlFor="preferences">Preferences:</label>
          <textarea
            id="preferences"
            {...register("preferences", { required: true })}
          ></textarea>
          {errors.preferences && (
            <span className="text-red-500 text-sm">
              Preferences are required
            </span>
          )}
        </div> */}
        <div>
          <label htmlFor="salary">Salary <samp className="text-slate-500 text-sm">(CTC)</samp></label>
          <input
            type="NUMBER"
            id="salary"
            className="w-full h-[40px] outline-none"
            {...register("salary", { required: true })}
          />
          {errors.salary && (
            <span className="text-red-500 text-sm">Salary is required</span>
          )}
        </div>

        <div cla>
          <label htmlFor="salary">location</label>
          <input
            type="text"
            id="salary"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="text-red-500 text-sm">location is required</span>
          )}
        </div>
        <div>
          <label htmlFor="skills">
            Skills:{" "}
            <span className=" font-normal text-xs text-slate-500 ">
              (please press enter button to add skill)
            </span>{" "}
          </label>
          <input
            type="text"
            id="skills"
            value={newSkill}
            maxLength="22"
            placeholder="Ex. communication"
            onKeyDown={handleSkillChange}
            onChange={handleInputChange}
          />
          <ul className=" w-full flex  gap-1 justify-start items-center  my-2 overflow-x-auto">
            {skills?.map((skill, index) => (
              <li
                className="border px-2 py-1  rounded-md bg-white cursor-pointer flex items-center justify-center gap-2 border-slate-400"
                key={index}
                onClick={() => handleRemoveSkill(skill)}
              >
                <span>{skill}</span>
                <IoMdClose />
              </li>
            ))}
          </ul>
          <button
            onClick={addSkill}
            className=" px-2 py-2 bg-[#4080ED] text-white rounded-lg mt-1 mb-1"
          >
            Add Skill
          </button>
        </div>
        <div>
          <label htmlFor="descriptionPoints">Description Points:</label>
          <input
            type="text"
            id="descriptionPoints"
            value={newDescription}
            placeholder="Add description point"
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addDescription()}
          />
          <ol>
            {description?.map((description, index) => (
              <li
                key={index}
                className="border px-2 py-1  rounded-md bg-white cursor-pointer flex items-center justify-between mt-1  overflow-hidden border-slate-400"
              >
                {description}{" "}
                <button
                  type="button"
                  className=""
                  onClick={() => removeDescription(index)}
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className="px-3 py-2 bg-[#4080ED] text-white rounded-lg mt-1 mb-3"
            onClick={addDescription}
          >
            Add Description
          </button>
        </div>
        <div>
          <label htmlFor="preferencePoints">Preference Points:</label>
          <input
            type="text"
            id="preferencePoints"
            value={newPreference}
            placeholder="Add preference point"
            onChange={(e) => setNewPreference(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPreference()}
          />
          <ul>
            {preferences?.map((preference, index) => (
              <li
                className="border px-2 py-1  rounded-md bg-white cursor-pointer flex items-center justify-between mt-1  overflow-hidden border-slate-400"
                key={index}
              >
                {preference}{" "}
                <button
                  type="button"
                  className=""
                  onClick={() => removePreference(index)}
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="px-3 py-2 bg-[#4080ED] text-white rounded-lg mt-1 mb-3"
            onClick={addPreference}
          >
            Add Preference
          </button>
        </div>

        <button type="submit" className="mt-[20px]">
          Submit
        </button>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  );
};

export default EditJobs;
