import { createSection } from "@/services/courseDetailsAPI";
import React, { useEffect, useState } from "react";

function LessonAdd() {
  const [course, setCourse] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const helo = JSON.parse(localStorage.getItem("course"));
    console.log(helo);
    setCourse(helo);
  }, []);

  const handleCreateLesson = async () => {
    // Add logic to create a lesson using sectionId, title, and video
    const formData = new FormData();
    formData.append("sectionId", course._id);
    formData.append("title", title);
    formData.append("video", video);

    const response = await createSection(formData);

    const updatedCourse = response;

    // Update localStorage with updated course
    localStorage.setItem("course", JSON.stringify(updatedCourse));

    setCourse(updatedCourse);

    console.log("Lesson created:", response);
    // Close the modal after creating the lesson
    setIsModalOpen(false);
  };

  const handleVideoClick = () => {
    setPlaying(true); // Start playing the video
  };

  return (
    <div>
      <div className="flex justify-center text-3xl font-semibold">
        <p>Add Lesson</p>
      </div>



      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl hover:shadow-2xl transition-shadow duration-300">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={course?.thumbnail}
              alt="Course Thumbnail"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {course?.status}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-gray-900">
                {course?.courseName}
              </h2>
              <p className="mt-2 text-gray-600">{course?.courseDescription}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-sm text-gray-700 font-semibold">
                What You Will Learn:
              </h3>
              <p className="text-gray-600">{course?.whatYouWillLearn}</p>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-700">Language: </span>
              <span className="ml-1 text-gray-600">{course?.langauge}</span>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-700">Created At: </span>
              <span className="ml-1 text-gray-600">
                {new Date(course?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>




      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Create Lesson
        </button>
      </div>

      <div className="flex justify-center text-2xl flex-col lg:w-[80vw] mx-auto">
        <p>Lessons</p>

        <div className="flex justify-center mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lesson Name
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Video
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {course?.courseContent?.map((lesson, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lesson.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <video
                      controls
                      className="w-[100px] h-20 object-cover rounded-md mb-4"
                      src={lesson.videoUrl}
                      alt="Lesson Video"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lesson?.timeDuration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className=" inset-0 bg-black bg-opacity-50 flex justify-center items-center absolute top-0">
          <div className="relative bg-white rounded-lg w-1/2 p-4 shadow-lg">
            <h2 className="text-xl mb-4">Create Lesson</h2>

            <label className="block text-gray-700 mb-2">Lesson Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <label className="block text-gray-700 mb-2">Video</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-black text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLesson}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonAdd;
