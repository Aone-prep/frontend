import React, { useState, useEffect } from "react";

const EditResultForm = ({ result, onSave, onCancel }) => {
  const [studentName, setStudentName] = useState(result.studentName);
  const [description, setDescription] = useState(result.description);
  const [obtainedMarks, setObtainedMarks] = useState(result.obtainedMarks);
  const [passMark, setPassMark] = useState(result.passMark);
  const [fullMark, setFullMark] = useState(result.fullMark);
  const [mockTestName, setMockTestName] = useState(result.mockTestName);

  useEffect(() => {
    setStudentName(result.studentName);
    setDescription(result.description);
    setObtainedMarks(result.obtainedMarks);
    setPassMark(result.passMark);
    setFullMark(result.fullMark);
    setMockTestName(result.mockTestName);
  }, [result]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...result,
      studentName,
      description,
      obtainedMarks,
      passMark,
      fullMark,
      mockTestName,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">Edit Result</h3>
      
      {/* Student Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Student Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Obtained Marks */}
      <div className="mb-4">
        <label className="block text-gray-700">Obtained Marks</label>
        <input
          type="number"
          value={obtainedMarks}
          onChange={(e) => setObtainedMarks(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Pass Mark */}
      <div className="mb-4">
        <label className="block text-gray-700">Pass Mark</label>
        <input
          type="number"
          value={passMark}
          onChange={(e) => setPassMark(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Full Mark */}
      <div className="mb-4">
        <label className="block text-gray-700">Full Mark</label>
        <input
          type="number"
          value={fullMark}
          onChange={(e) => setFullMark(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Mock Test Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Mock Test Name</label>
        <input
          type="text"
          value={mockTestName}
          onChange={(e) => setMockTestName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditResultForm;
