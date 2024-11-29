import React, { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddResultForm from "./AddResultForm";
import EditResultForm from "./EditResultForm";
import ResultDetail from "./ResultDetail";

const ResultList = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      studentName: "John Doe",
      mockTestId: 1,
      description: "Excellent performance",
      obtainedMarks: 80,
      passMark: 50,
      fullMark: 100,
      mockTestName: "Mock Test 1",
      createdAt: "2024-11-01",
      updatedAt: "2024-11-12",
    },
    // Add more result entries as needed
  ]);

  const [editingResult, setEditingResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResult(null);
  };

  const openDetail = (result) => {
    setSelectedResult(result);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedResult(null);
  };

  const addResult = (result) => {
    const newResult = {
      ...result,
      id: results.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setResults([...results, newResult]);
    closeModal();
  };

  const editResult = (updatedResult) => {
    setResults(
      results.map((res) => (res.id === updatedResult.id ? updatedResult : res))
    );
    closeModal();
  };

  const deleteResult = (id) => {
    setResults(results.filter((res) => res.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Results</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">Student Name</th>
            <th className="px-6 py-3 text-left">Mock Test Name</th>
            <th className="px-6 py-3 text-left">Pass Mark</th>
            <th className="px-6 py-3 text-left">Obtained Marks</th>
            <th className="px-6 py-3 text-left">Full Marks</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Updated At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-t">
              <td className="px-6 py-4">{result.studentName}</td>
              <td className="px-6 py-4">{result.mockTestName}</td>
              <td className="px-6 py-4">{result.passMark}</td>
              <td className="px-6 py-4">{result.obtainedMarks}</td>
              <td className="px-6 py-4">{result.fullMark}</td>
              <td className="px-6 py-4">{result.description}</td>
              <td className="px-6 py-4">{result.createdAt}</td>
              <td className="px-6 py-4">{result.updatedAt}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => deleteResult(result.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingResult ? (
              <EditResultForm
                result={editingResult}
                onSave={editResult}
                onCancel={closeModal}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      {isDetailOpen && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <ResultDetail result={selectedResult} onClose={closeDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;
