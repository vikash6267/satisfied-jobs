import CourseForm from '@/pages/dashboard/CourseForm'
import LessonAdd from '@/pages/dashboard/LessonAdd'
import React, { useState } from 'react'

function CourseCreate() {
    const[step,setStep] = useState(1)
    const[course,setCourse] = useState("")
  return (
    <div>
    <div className=' flex justify-center text-3xl '>
        <h4>Course Builder</h4>
    </div>


    <div>
        {
            step == 1 && <>

            <CourseForm setStep={setStep} setCourse={setCourse} />
            </>
        }
        {
            step == 2 && <>

            <LessonAdd setStep={setStep}  course={course} />
            </>
        }
    </div>

    </div>
  )
}

export default CourseCreate