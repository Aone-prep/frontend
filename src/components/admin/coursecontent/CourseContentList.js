// src/components/CourseContentList.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles

// Dummy data for courses and course contents
const dummyCourses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

const dummyCourseContents = [
  {
    _id: 1,
    title: "Intro to React",
    body: "This is an introductory course to React JS. Learn the basics of React.",
    type: "text",
    course: 1,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-02"
  },
  {
    _id: 2,
    title: "Advanced JavaScript",
    body: "Dive deep into JavaScript, covering closures, promises, async/await, and more.",
    type: "text",
    course: 2,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-05"
  },
  {
    _id: 3,
    title: "Python for Data Science",
    body: "Learn Python in the context of Data Science. Work with libraries like Pandas, NumPy, and Matplotlib.",
    type: "text",
    course: 3,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-05"
  }
];

const CourseContentList = () => {
  const [courseContents, setCourseContents] = useState(dummyCourseContents);
  const [courses] = useState(dummyCourses); // Static list of courses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);

  const handleModalOpen = (content = null) => {
    setCurrentContent(content || {
      title: '',
      body: '',
      type: 'text', // Set default type to 'text'
      course: courses[0]?.id || '', // Set default course to the first course (if available)
      createdAt: '',
      updatedAt: ''
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentContent(null); // Clear current content when modal is closed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentContent({ ...currentContent, [name]: value });
  };

  const handleEditorChange = (value) => {
    setCurrentContent({ ...currentContent, body: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentContent._id) {
      // Update existing content
      const updatedContents = courseContents.map((content) =>
        content._id === currentContent._id ? currentContent : content
      );
      setCourseContents(updatedContents);
    } else {
      // Add new content
      const newContent = { ...currentContent, _id: courseContents.length + 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setCourseContents([...courseContents, newContent]);
    }
    handleModalClose();
  };
console.log(courseContents)
  const handleDelete = (id) => {
    const updatedContents = courseContents.filter((content) => content._id !== id);
    setCourseContents(updatedContents);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Add button on the right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleModalOpen()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Course Content
        </button>
      </div>

      {/* Course Content List */}
      <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Created</th>
            <th className="border px-4 py-2">Updated</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseContents.map((content) => (
            <tr key={content._id}>
              <td className="border px-4 py-2">{content.title}</td>
              <td className="border px-4 py-2">{courses.find(course => parseInt(course.id) === parseInt(content.course))?.name}</td>
              <td className="border px-4 py-2">{content.createdAt}</td>
              <td className="border px-4 py-2">{content.updatedAt}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleModalOpen(content)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">{currentContent ? 'Edit' : 'Add'} Course Content</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentContent?.title || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <select
                  name="course"
                  value={currentContent?.course || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Content Type</label>
                <select
                  name="type"
                  value={currentContent?.type || 'text'}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="text">Text</option>
                  <option value="video">Video</option>
                  <option value="picture">Picture</option>
                </select>
              </div>

              {currentContent?.type === 'text' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Body (Text)</label>
                  <ReactQuill
                    value={currentContent?.body || ''}
                    onChange={handleEditorChange}
                    className="mt-1"
                    style={{ height: '150px' }} // Increase height of editor
                  />
                </div>
              )}

              {currentContent?.type === 'picture' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                  <input
                    type="file"
                    className="mt-1"
                    onChange={(e) => setCurrentContent({ ...currentContent, imageUrl: URL.createObjectURL(e.target.files[0]) })}
                  />
                  {currentContent?.imageUrl && <img src={currentContent.imageUrl} alt="Image Preview" className="mt-2 max-w-xs" />}
                </div>
              )}

              {currentContent?.type === 'video' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Video URL</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={currentContent?.videoUrl || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Paste video URL here"
                  />
                </div>
              )}

              <div className="flex justify-between mt-[100px]">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentContent ? 'Update' : 'Save'} Content
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
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
