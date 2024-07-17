import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { fetchCourseCategories } from '@/services/operations/courseDetailsAPI';
import { addCourseDetails } from '@/services/courseDetailsAPI';

const CourseForm = ({setStep,setCourse}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [courseCategories, setCourseCategories] = useState([])

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('courseName', data.courseName);
    formData.append('courseDescription', data.courseDescription);
    formData.append('whatYouWillLearn', data.whatYouWillLearn);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('langauge', data.langauge);
    formData.append('thumbnailImage', thumbnail);

    try {

const response = await addCourseDetails(formData,token)

// console.log(response)
      setMessage('Course Created Successfully');
      if(response){
        setStep(2)
        localStorage.setItem('course', JSON.stringify(response));


        setCourse(response)
      }
    } catch (error) {
      setMessage('Failed to create course: ' + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
   
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            {...register('courseName', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.courseName && <p className="text-red-500">This field is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Course Description</label>
          <textarea
            {...register('courseDescription', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.courseDescription && <p className="text-red-500">This field is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">What You Will Learn</label>
          <textarea
            {...register('whatYouWillLearn', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.whatYouWillLearn && <p className="text-red-500">This field is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.price && <p className="text-red-500">This field is required</p>}
        </div>

        <div>
  <label className="block text-gray-700">Category</label>
  <select
    {...register('category', { required: true })}
    className="w-full px-3 py-2 border rounded-md"
  >
    <option value="">Select a category</option>
    {courseCategories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
  {errors.category && <p className="text-red-500">This field is required</p>}
</div>


    

        <div>
          <label className="block text-gray-700">Language</label>
          <input
            type="text"
            {...register('langauge', { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.langauge && <p className="text-red-500">This field is required</p>}
        </div>

        <div>
          <label className="block text-gray-700">Thumbnail Image</label>
          <input
            type="file"
            onChange={handleThumbnailChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
          )}
        </div>

        <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
