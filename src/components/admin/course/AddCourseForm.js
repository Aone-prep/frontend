import { createCourse } from "@services/admin/courses";
import React, { useState } from "react";

const AddCourseForm = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [lectures, setLectures] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState(1);

  const categories = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Design" },
    { id: 4, name: "Marketing" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      course_name: title,
      instructor,
      duration,
      lectures,
      description,
      level,
      category_id: categories.find(cat => cat.name === category)?.id,
    };

    try {
      await createCourse(courseData);
      onAdd && onAdd();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>

      {/* Form fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Title Field */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        
        {/* Additional fields for instructor, duration, lectures, etc. */}
        
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Course
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
