import React from "react";

const StudyPlan = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Today's Study Plan</h3>
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="mb-1">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StudyPlan;
