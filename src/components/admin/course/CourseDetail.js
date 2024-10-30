import React from "react";

const CourseDetail = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] md:w-[50vw] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Instructor:</strong> <br />
          {course.instructor}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Duration:</strong> <br />
          {course.duration}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Lectures:</strong>
          <br /> {course.lectures}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Level:</strong>
          <br /> {course.level}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Category:</strong>
          <br /> {course.category}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong>
          <br />
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;
