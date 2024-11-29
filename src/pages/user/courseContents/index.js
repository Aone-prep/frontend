import React, { useEffect, useState } from "react";
import { Search, Clock, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseCategoriesData,
  setCoursesData,
} from "@redux/slices/courseSlice";
import { getCourseCategories, getCourses, startCourse } from "@services/course";
import { dummyCategories, dummyCourses } from "@utils/dummyData";
import { showToast } from "@utils/helper";
import { getUserCourses } from "@services/course"; // Import the getUserCourses function

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedUserCourses, setLoggedUserCourses] = useState([]);

  const loggedInUserId = useSelector((state) => state.user?.loggedUser?.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  // Filter and sort enrolled courses
  const getUserCourseProgress = (courseId) => {
    const userCourse = loggedUserCourses.find(
      (uc) => uc.course.id === courseId
    );
    return userCourse
      ? {
          progress: userCourse.progress,
          status: userCourse.status,
        }
      : null;
  };

  const sortCourses = (coursesToSort) => {
    return [...coursesToSort].sort((a, b) => {
      const progressA = getUserCourseProgress(a.id);
      const progressB = getUserCourseProgress(b.id);

      if (
        progressA?.status === "in_progress" &&
        progressB?.status !== "in_progress"
      )
        return -1;
      if (
        progressB?.status === "in_progress" &&
        progressA?.status !== "in_progress"
      )
        return 1;

      if (progressA && progressB) {
        return progressB.progress - progressA.progress;
      }

      return a.course_name.localeCompare(b.course_name);
    });
  };

  const filteredCourses = sortCourses(
    courses?.filter(
      (course) =>
        (selectedCategory === "All" ||
          course.category.category_name === selectedCategory) &&
        (course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesResponse, categoriesResponse] = await Promise.all([
          getCourses(),
          getCourseCategories(),
        ]);
        dispatch(setCoursesData(coursesResponse?.data));
        dispatch(setCourseCategoriesData(categoriesResponse?.data));

        // Fetch the enrolled courses after the page loads
        if (loggedInUserId) {
          const userCoursesResponse = await getUserCourses(loggedInUserId);
          setLoggedUserCourses(userCoursesResponse?.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setCoursesData(dummyCourses));
        dispatch(setCourseCategoriesData(dummyCategories));
      }
    }

    fetchData();
  }, [dispatch, loggedInUserId]);

  const handleOnCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category?.category_name)),
  ];

  const handleStartCourse = async (courseId) => {
    const payload = { user_id: loggedInUserId, course_id: courseId };

    try {
      const response = await startCourse(payload);

      if (response.status === 200) {
        showToast("success", "Enrolled in new course successfully");

        // Refetch the user's courses after enrollment
        const userCoursesResponse = await getUserCourses(loggedInUserId);
        setLoggedUserCourses(userCoursesResponse?.data || []);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
    }
  };

  const enrolledCourses = filteredCourses.filter((course) =>
    loggedUserCourses?.some((userCourse) => userCourse.course.id === course.id)
  );

  const newCourses = filteredCourses.filter(
    (course) =>
      !loggedUserCourses?.some(
        (userCourse) => userCourse.course.id === course.id
      )
  );

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

      {/* Enrolled Courses Section */}
      {enrolledCourses.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const userProgress = loggedUserCourses.find(
                (userCourse) => userCourse.course.id === course.id
              );
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold">
                        {course.course_name}
                      </h2>
                      <div className="flex flex-col gap-2 items-end">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {course.level}
                        </span>
                        {userProgress?.status === "in_progress" && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <School className="h-4 w-4" />
                        <span>{course.category?.category_name}</span>
                      </div>
                    </div>

                    {userProgress?.progress > 0 && (
                      <div className="mb-4">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full transition-all duration-300"
                            style={{ width: `${userProgress.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {userProgress.progress}% complete
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => handleOnCourseClick(course.id)}
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No enrolled courses yet.</p>
      )}

      {/* New Courses Section */}
      {newCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">New Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold">{course.course_name}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => handleStartCourse(course.id)}
                  >
                    Start Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
