import React from "react";

const ExamProgress = ({ examType, progress }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{examType} Progress</h3>
      <div className="w-full bg-gray-200 rounded">
        <div
          className="bg-green-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ExamProgress;
