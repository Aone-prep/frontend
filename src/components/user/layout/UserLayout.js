import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Home,
  Book,
  FileText,
  History,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const UserLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <Home size={24} />, text: "Home", path: "/home" },
    {
      icon: <Book size={24} />,
      text: "Courses",
      path: "/courses",
    },
    { icon: <FileText size={24} />, text: "Mock Test", path: "/mock-test" },
    {
      icon: <History size={24} />,
      text: "Test History",
      path: "/test-history",
    },
    { icon: <MessageSquare size={24} />, text: "Forums", path: "/forums" },
  ];

  return (
    <div className="flex h-full">
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          {isExpanded && <h2 className="text-xl font-bold">A1Prep</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {isExpanded ? (
              <ChevronLeft size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="mr-4">{item.icon}</span>
                  {isExpanded && <span>{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
