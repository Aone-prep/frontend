import React, { useState } from "react";

const AddCourseForm = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [lectures, setLectures] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");

  const categories = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Design" },
    { id: 4, name: "Marketing" },
  ];
  const [category, setCategory] = useState(categories.length > 0 ? categories[0].name : "");

 

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      title,
      instructor,
      duration,
      lectures,
      description,
      level,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
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
        <div>
          <label className="block mb-1 font-semibold">Instructor</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Duration (hours)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Lectures</label>
          <input
            type="number"
            value={lectures}
            onChange={(e) => setLectures(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
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
