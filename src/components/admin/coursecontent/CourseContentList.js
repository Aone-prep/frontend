import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getCourseContents,
  createCourseContent,
  updateCourseContent,
  deleteCourseContent,
} from "@services/admin/coursecontent";
import { getCourses } from "@services/admin/courses";

const CourseContentList = () => {
  const [courseContents, setCourseContents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentResponse, courseResponse] = await Promise.all([
        getCourseContents(),
        getCourses(),
      ]);
      setCourseContents(contentResponse || []);
      setCourses(courseResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };
  console.log(courseContents, "this is content response");

  const handleModalOpen = (content = null) => {
    setError(null);
    setSelectedFile(null);
    setCurrentContent(
      content || {
        title: "",
        body: "",
        type: "text",
        courseId: "",
        mediaUrl: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentContent(null);
    setSelectedFile(null);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (value) => {
    setCurrentContent((prev) => ({
      ...prev,
      body: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // You would typically upload the file here and get back a URL
      // For now, we'll create a temporary preview URL
      const previewUrl = URL.createObjectURL(file);
      setCurrentContent((prev) => ({
        ...prev,
        mediaUrl: previewUrl, // This would be replaced with the actual uploaded file URL
      }));
    }
  };

  const validateForm = () => {
    if (!currentContent.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!currentContent.courseId) {
      setError("Please select a course");
      return false;
    }
    if (
      (currentContent.type === "image" || currentContent.type === "video") &&
      !currentContent.mediaUrl
    ) {
      setError(
        `Please provide a ${currentContent.type === "image" ? "file" : "URL"}`
      );
      return false;
    }
    return true;
  };
  console.log(currentContent, "this is current content");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        title: currentContent.title,
        courseId: currentContent.courseId,
        type: currentContent.type,
        body: currentContent.type === "text" ? currentContent.body : null,
        mediaUrl: ["image", "video"].includes(currentContent.type)
          ? currentContent.mediaUrl
          : null,
      };

      let response;
      if (currentContent.id) {
        response = await updateCourseContent(currentContent.id, payload);
        setCourseContents((prev) =>
          prev.map((content) =>
            content.id === currentContent.id ? response : content
          )
        );
      } else {
        response = await createCourseContent(payload);
        setCourseContents((prev) => [...prev, response]);
      }

      handleModalClose();
    } catch (error) {
      console.error("Error saving course content:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save content. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;

    try {
      await deleteCourseContent(id);
      setCourseContents((prev) => prev.filter((content) => content.id !== id));
    } catch (error) {
      console.error("Error deleting course content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Content Management</h1>
        <button
          onClick={() => handleModalOpen()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Course Content
        </button>
      </div>

      {/* Course Content List */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Created</th>
              <th className="border px-4 py-2">Updated</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseContents.map((content) => (
              <tr key={content.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{content?.title}</td>
                <td className="border px-4 py-2">
                  {
                    courses.find((course) => course.id == content.courseId)
                      ?.course_name
                  }
                </td>
                <td className="border px-4 py-2 capitalize">{content.type}</td>
                <td className="border px-4 py-2">
                  {new Date(content.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(content.updatedAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleModalOpen(content)}
                    className="text-yellow-500 mr-4 hover:text-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {currentContent?.id ? "Edit" : "Add"} Course Content
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentContent?.title || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  name="courseId"
                  value={currentContent?.courseId || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Content Type
                </label>
                <select
                  name="type"
                  value={currentContent?.type || "text"}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="text">Text</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {currentContent?.type === "text" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="mt-1" style={{ minHeight: "200px" }}>
                    <ReactQuill
                      value={currentContent?.body || ""}
                      onChange={handleEditorChange}
                      style={{ height: "150px" }}
                    />
                  </div>
                </div>
              )}

              {currentContent?.type === "image" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                  {currentContent?.mediaUrl && (
                    <img
                      src={currentContent.mediaUrl}
                      alt="Preview"
                      className="mt-2 max-w-xs"
                    />
                  )}
                </div>
              )}

              {currentContent?.type === "video" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Video URL
                  </label>
                  <input
                    type="url"
                    name="mediaUrl"
                    value={currentContent?.mediaUrl || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter video URL"
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : currentContent?.id
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentList;
