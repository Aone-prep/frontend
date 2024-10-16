import React from "react";
import { useSelector } from "react-redux";
import { ExamProgress, StudyPlan } from "../components/dashboard";

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  const examProgress = 65;
  const studyTasks = [
    "Review Algebra Chapters 1-3",
    "Complete Practice Test 2",
    "Watch Video Lecture on Geometry",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "Welcome"}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        o
        <ExamProgress
          examType={user?.examType || "License"}
          progress={examProgress}
        />
        <StudyPlan tasks={studyTasks} />
      </div>
    </div>
  );
};

export default Dashboard;
