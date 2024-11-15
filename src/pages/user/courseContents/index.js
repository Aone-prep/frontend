import React, { useEffect, useState } from "react";
import { Search, Clock, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseCategoriesData,
  setCoursesData,
} from "@redux/slices/courseSlice";
import { getCourseCategories, getCourses } from "@services/course";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  const filteredCourses = courses?.filter(
    (course) =>
      (selectedCategory === "All" ||
        course.category.category_name === selectedCategory) &&
      (course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const coursesResponse = await getCourses();
        const categoriesResponse = await getCourseCategories();

        dispatch(setCoursesData(coursesResponse?.data));
        dispatch(setCourseCategoriesData(categoriesResponse?.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleOnCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Get unique categories from courses
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category.category_name)),
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Course Catalog</h1>
        <p className="text-gray-600">
          Discover and enhance your skills with our interactive courses
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <div className="flex items-center bg-white rounded-lg border px-3 py-2">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <select
          className="bg-white border rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{course.course_name}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.level}
                </span>
              </div>

              {/* Course Description */}
              <p className="text-gray-600 mb-4">{course.description}</p>

              {/* Course Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <School className="h-4 w-4" />
                  <span>{course.category.category_name}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.progress}% complete
                  </span>
                </div>
              )}

              {/* Course Footer */}
              <div className="flex justify-end items-center mt-4 pt-4 border-t">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleOnCourseClick(course.id)}
                >
                  {course.progress > 0 ? "Continue" : "Start"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
