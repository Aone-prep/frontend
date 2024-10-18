import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, BookOpen, Users, FileText, User, Menu } from "lucide-react";

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { icon: Home, text: "Home", link: "/dashboard" },
    { icon: BookOpen, text: "Courses", link: "/courses" },
    { icon: Users, text: "Community", link: "/community" },
    { icon: FileText, text: "Mock Tests", link: "/mock-tests" },
    { icon: User, text: "Profile", link: "/profile" },
  ];

  return (
    <div className="flex h-full bg-blue-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <button onClick={toggleSidebar} className="md:hidden p-2">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-blue-600">
            Learning Dashboard
          </h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
