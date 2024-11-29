import React from "react";
import { X, Info, List, CheckCircle, Clock } from "lucide-react"; // Import only required icons

const QuestionDetail = ({ question = {}, onClose }) => {
  const {
    description = "Question description not available", // Renamed to 'description' to match your data model
    options = { optionA: "A", optionB: "B", optionC: "C", optionD: "D" }, // Options object
    created_at = "2024-01-01T00:00:00Z", // Sample created time (ISO format)
    answer = "No answer available", // Default answer
  } = question;

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
      <Icon className="w-5 h-5 text-blue-600 mt-1" />
      <div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-gray-900">{value}</div>
      </div>
    </div>
  );

  // Format the created time to a more user-friendly format
  const formatCreatedTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Use toLocaleString to format the date nicely
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">Question Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Question Description */}
          <InfoItem icon={Info} label="Question" value={description} />

          {/* Options Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <List className="w-5 h-5 text-blue-600" />
              <h3>Options</h3>
            </div>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-100 rounded-lg shadow-sm">{options.optionA}</li>
              <li className="p-3 bg-gray-100 rounded-lg shadow-sm">{options.optionB}</li>
              <li className="p-3 bg-gray-100 rounded-lg shadow-sm">{options.optionC}</li>
              <li className="p-3 bg-gray-100 rounded-lg shadow-sm">{options.optionD}</li>
            </ul>
          </div>

          {/* Answer Section */}
          <div className="mt-6">
            <InfoItem icon={CheckCircle} label="Answer" value={answer} />
          </div>

          {/* Created Time Section */}
          <div className="mt-6">
            <InfoItem icon={Clock} label="Created At" value={formatCreatedTime(created_at)} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
