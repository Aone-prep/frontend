import React, { useState } from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import EditCourseForm from "./EditCourseForm";
import AddCourseForm from "./AddCourseForm";
import CourseDetail from "./CourseDetail";

const CourseList = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Doe",
      duration: "20 hours",
      lectures: "5",
      description: "Learn the basics of React",
      level: "Beginner",
      category: "Web Development",
      createdat: "2 November",
      updatedat: "monday"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      duration: "30 hours",
      lectures: "10",
      description: "Deep dive into JavaScript",
      level: "Advanced",
      category: "Programming",
      createdat: "2 November",
      updatedat: "monday"
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const openDetail = (course) => {
    setSelectedCourse(course);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedCourse(null);
  };

  const addCourse = (course) => {
    const newCourse = { ...course, id: courses.length + 1 };
    setCourses([...courses, newCourse]);
    closeModal();
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    openModal();
  };

  const editCourse = (updatedCourse) => {
    setCourses(
      courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    closeModal();
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingCourse(null); // Set to null to open AddCourseForm
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Course
      </button>
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Title</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Level</th>
            <th className="p-4">Category</th>
            
            <th className="p-4">Created At</th>
            <th className="p-4">Updated At</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-4">{course.title}</td>
            
              <td className="p-4">{course.duration}</td>

              <td className="p-4">{course.level}</td>
              <td className="p-4">{course.category}</td>
             <td className="p-4">{course.createdat}</td>
             <td className="p-4">{course.updatedat}</td>

              <td className="p-4 text-center">
                <button
                  onClick={() => openDetail(course)}
                  className="text-blue-500 mr-4"
                >
                  <FaInfoCircle />
                </button>
                <button
                  onClick={() => handleEditClick(course)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="text-red-500 "
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-2 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingCourse ? (
              <EditCourseForm
                course={editingCourse}
                onSave={editCourse}
                onCancel={closeModal}
              />
            ) : (
              <AddCourseForm onAdd={addCourse} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}
      {isDetailOpen && selectedCourse && (
        <CourseDetail course={selectedCourse} onClose={closeDetail} />
      )}
    </div>
  );
};

export default CourseList;
