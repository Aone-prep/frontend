import React from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-800">
        Welcome back, {user?.name || "Student"}!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full border-8 border-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold">65%</span>
            </div>
            <p className="ml-4 text-blue-600">
              You're making great progress! Keep it up!
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upcoming Tasks</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Review Algebra Chapters 1-3
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Complete Practice Test 2
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Watch Video Lecture on Geometry
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
