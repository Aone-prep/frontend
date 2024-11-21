import React, { useState } from "react";
import { updateCourse } from "@services/admin/courses";

const EditCourseForm = ({ course, onSave, onCancel,categories }) => {
  const [title, setTitle] = useState(course?.course_name);
  const [duration, setDuration] = useState(course?.duration);
  const [description, setDescription] = useState(course?.description);
  const [level, setLevel] = useState(course?.level);
  const [category, setCategory] = useState(course.category_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...course,
      course_name: title,
      duration,
      description,
      level,
      category_id: category,
    }

    try {
      const response = await updateCourse(course?.id,courseData);
      onSave && onSave(response.course);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>

      {/* Title Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>


      {/* Duration Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

    
      {/* Description Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Level Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select a category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
