import React from "react";
import { FaUser, FaHome, FaCog, FaBook } from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold bg-gray-900">Admin Panel</div>
      <nav className="mt-6">
        <ul>
          <li
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("dashboard")}
          >
            <FaHome className="mr-3" />
            Dashboard
          </li>
          <li
<<<<<<< Updated upstream
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("users")}
          >
            <FaUser className="mr-3" />
            Users
          </li>
          <li
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("settings")}
          >
            <FaCog className="mr-3" />
            Settings
          </li>
=======
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
            onClick={toggleCourseSubmenu}
          >
            <span className="flex items-center">
              <FaBook className="mr-3" />
              Courses
            </span>
            {isCourseSubmenuOpen ? <FaChevronDown /> : <FaChevronRight />}
          </li>
          {isCourseSubmenuOpen && (
            <ul className="ml-8 mt-2 space-y-2">
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => onSelect("courses")}
              >
                All Courses
              </li>
              
              <li
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => onSelect("categories")}
              >
                Categories
              </li>
            </ul>
          )}
>>>>>>> Stashed changes
          <li
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("courses")}
          >
<<<<<<< Updated upstream
            <FaBook className="mr-3" />
            Courses
=======

            <FaQuestion className="mr-3" />
            Questions
>>>>>>> Stashed changes
          </li>
          <li
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("users")}
          >
            <FaUser className="mr-3" />
            Users
          </li>

          <li
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
            onClick={() => onSelect("settings")}
          >
            <FaCog className="mr-3" />
            Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
