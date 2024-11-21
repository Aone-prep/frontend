import React, { useState, useEffect } from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import EditCourseForm from "./EditCourseForm";
import AddCourseForm from "./AddCourseForm";
import CourseDetail from "./CourseDetail";
import { getCourses,getCourseCategories,deleteCourse } from "@services/admin/courses";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [categories, setCategories] = useState([]); // State for categories fetched from API


  // Fetch initial data from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        const categoriesResponse = await getCourseCategories();
        setCategories(categoriesResponse?.data)
        setCourses(response?.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);


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

  const handleAddCourse = (course) => {
    const category = categories.find(cat=>cat.id == course.category_id)
    const newCourse = { ...course,category};
    setCourses([...courses, newCourse]);
    closeModal();
  };

  const handleEditCourse = (updatedCourse) => {
    const category = categories.find(cat=>cat.id == updatedCourse?.category_id)
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? {...updatedCourse,category} : course
      )
    );
    closeModal();
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id)
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    openModal();
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingCourse(null);
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
            <th className="p-4">SN</th>
            <th className="p-4">Course Name</th>
            <th className="p-4">Level</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Category Name</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id} className="border-b">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{course.course_name}</td>
              <td className="p-4">{course.level}</td>
              <td className="p-4">{course.duration}</td>
              <td className="p-4">{course.category?.category_name}</td>
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
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500"
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
                onSave={handleEditCourse}
                onCancel={closeModal}
                categories={categories}
              />
            ) : (
              <AddCourseForm onAdd={handleAddCourse} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}
      {isDetailOpen && selectedCourse && (
        <CourseDetail course={selectedCourse} onClose={closeDetail} categories={categories}/>
      )}
    </div>
  );
};

export default CourseList;
