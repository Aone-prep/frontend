// src/components/CourseContentForm.js
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import { createCourseContent, updateCourseContent, fetchCourses } from './api';
import { useHistory } from 'react-router-dom';

const CourseContentForm = ({ content, onClose }) => {
  const [courseContent, setCourseContent] = useState({
    title: '',
    body: '',
    type: 'text',
    course: '',
    imageUrl: '',
    videoUrl: '',
    createdAt: null,
    updatedAt: null,
  });

  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchCourses();
      setCourses(courses);
      if (content) {
        setCourseContent(content);
      }
    };
    fetchData();
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseContent({ ...courseContent, [name]: value });
  };

  const handleEditorChange = (value) => {
    setCourseContent({ ...courseContent, body: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseContent({ ...courseContent, imageUrl: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseContent._id) {
        await updateCourseContent(courseContent._id, courseContent);
      } else {
        await createCourseContent(courseContent);
      }
      onClose();
      history.push('/courses'); // Redirect to the courses list page
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{content ? 'Edit' : 'Create'} Course Content</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={courseContent.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <select
            name="course"
            value={courseContent.course}
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            name="type"
            value={courseContent.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="picture">Picture</option>
          </select>
        </div>

        {courseContent.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Body (Text)</label>
            <ReactQuill value={courseContent.body} onChange={handleEditorChange} className="mt-1" />
          </div>
        )}

        {courseContent.type === 'picture' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
            {courseContent.imageUrl && <img src={courseContent.imageUrl} alt="Uploaded Preview" className="mt-2 max-w-xs" />}
          </div>
        )}

        {courseContent.type === 'video' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={courseContent.videoUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Paste video URL here"
            />
          </div>
        )}

        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {content ? 'Update' : 'Save'} Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContentForm;
