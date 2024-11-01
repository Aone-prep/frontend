import React, { useState } from "react";
import { Search, Clock, School } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const CourseCategories = {
  Programming: ["Python", "JavaScript", "Java", "R", "C++"],
  DataScience: [
    "Machine Learning",
    "Data Analysis",
    "Statistics",
    "Deep Learning",
  ],
  Databases: ["SQL", "MongoDB", "PostgreSQL", "Redis"],
  Cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
  Business: ["Excel", "PowerBI", "Tableau", "Google Analytics"],
  AI: ["ChatGPT", "PyTorch", "TensorFlow", "Computer Vision"],
  DrivingLicense: ["G1", "G2"],
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const courses = [
    {
      title: "Python for Beginners",
      category: "Programming",
      level: "Beginner",
      duration: "6h",
      instructor: "Sarah Johnson",
      progress: 0,
      description: "Start your programming journey with Python fundamentals",
      id: 1,
    },
    {
      title: "JavaScript Essentials",
      category: "Programming",
      level: "Beginner",
      duration: "5h",
      instructor: "David Lee",
      progress: 20,
      description: "Learn the basics of JavaScript for web development",
      id: 2,
    },
    {
      title: "Machine Learning Fundamentals",
      category: "DataScience",
      level: "Intermediate",
      duration: "10h",
      instructor: "Emily Rodriguez",
      progress: 60,
      description: "Learn core machine learning concepts and algorithms",
      id: 3,
    },
    {
      title: "Deep Learning with PyTorch",
      category: "DataScience",
      level: "Advanced",
      duration: "12h",
      instructor: "Mark Kim",
      progress: 0,
      description: "Master deep learning with PyTorch and neural networks",
      id: 4,
    },
    {
      title: "Advanced SQL Mastery",
      category: "Databases",
      level: "Advanced",
      duration: "8h",
      instructor: "Michael Chen",
      progress: 30,
      description: "Master complex SQL queries and database optimization",
      id: 5,
    },
    {
      title: "AWS Cloud Practitioner",
      category: "Cloud",
      level: "Beginner",
      duration: "6h",
      instructor: "Ava Patel",
      progress: 0,
      description: "Get started with AWS cloud services",
      id: 6,
    },
    {
      title: "Introduction to Excel",
      category: "Business",
      level: "Beginner",
      duration: "3h",
      instructor: "Rachel Adams",
      progress: 70,
      description: "Learn Excel basics for data management",
      id: 7,
    },
    {
      title: "AI with ChatGPT",
      category: "AI",
      level: "Intermediate",
      duration: "4h",
      instructor: "John Doe",
      progress: 50,
      description: "Explore AI applications using ChatGPT",
      id: 8,
    },
    {
      title: "G1 Driving License Preparation",
      category: "DrivingLicense",
      level: "Beginner",
      duration: "2h",
      instructor: "Karen Smith",
      progress: 0,
      description: "Prepare for the G1 written driving test",
      id: 9,
    },
    {
      title: "G2 Driving Skills and Road Test Prep",
      category: "DrivingLicense",
      level: "Intermediate",
      duration: "3h",
      instructor: "Tom Blake",
      progress: 0,
      description: "Build driving skills for the G2 road test",
      id: 10,
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOnCourseClick = (courseId) => {
    console.log(`Navigating to course with id: ${courseId}`);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hi Suraj, Welcome to Course Catalog
        </h1>
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
          {Object.keys(CourseCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.keys(CourseCategories).map((category) => (
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
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{course.title}</h2>
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
                  <span>{course.category}</span>
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
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {course.instructor.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.instructor}
                  </span>
                </div>
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
