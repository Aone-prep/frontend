import React from "react";

const CourseDetail = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-xl shadow-2xl w-[90vw] md:w-[60vw] lg:w-[40vw] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
          {course.title}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Lectures:</strong> {course.lectures}
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Category:</strong> {course.category}
          </p>
          <hr className="my-4" />
          <p className="text-gray-600 leading-relaxed">
            <strong>Description:</strong> <br />
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;