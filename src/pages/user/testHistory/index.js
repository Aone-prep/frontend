import React, { useEffect, useState } from "react";
import {
  Trophy,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getUserTestHistory } from "@services/mock-test";

const TestHistoryCard = ({ test }) => {
  // Calculate percentage score
  const scorePercentage = ((test.obtained_mark / test.full_mark) * 100).toFixed(
    1
  );

  // Determine score color and status
  const getScoreColor = () => {
    if (scorePercentage >= 90) return "bg-green-500";
    if (scorePercentage >= 70) return "bg-lime-500";
    if (scorePercentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {test.mockTest.name}
            </h2>
            <p className="text-gray-600 mb-2">{test.mockTest.description}</p>
          </div>

          {test.passed ? (
            <CheckCircle className="text-green-500 w-10 h-10 animate-pulse" />
          ) : (
            <XCircle className="text-red-500 w-10 h-10" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="text-blue-500 w-5 h-5" />
            <span>Duration: {test.mockTest.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="text-purple-500 w-5 h-5" />
            <span>Level: {test.mockTest.level}</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`${getScoreColor()} h-4 rounded-full transition-all duration-500 ease-in-out`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <span className="font-semibold">Score</span>
            <p>
              {test.obtained_mark} / {test.full_mark}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <span className="font-semibold">Pass Mark</span>
            <p>{test.pass_mark}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <span className="font-semibold">Status</span>
            <p>{test.passed ? "Passed" : "Failed"}</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500 text-right">
          Attempted: {formatDate(test.createdAt)}
        </div>
      </div>
    </div>
  );
};

const TestHistory = () => {
  const [userTestHistory, setUserTestHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        // Simulated fetch - replace with actual API call
        const userTestHistoryResponse = await getUserTestHistory();

        setUserTestHistory(userTestHistoryResponse?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch test history", error);
        setLoading(false);
      }
    };

    fetchTestHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (userTestHistory.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-100 rounded-lg">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Test History Available
        </h2>
        <p className="text-gray-500 mt-2">
          You haven't taken any tests yet. Start exploring our mock tests!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Test History
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTestHistory.map((test) => (
          <TestHistoryCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default TestHistory;
