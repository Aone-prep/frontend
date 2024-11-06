// QuestionDetail.js

import React from "react";
import { X, Info, Layers, Tag, List, CheckCircle } from "lucide-react";

const QuestionDetail = ({ question = {}, onClose }) => {
  const {
    text = "Question text",
    type = "Type not specified",
    category = "Category not specified",
    level = "Level not specified",
    answer = ["No answers available"],
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">
              Question Details
            </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoItem icon={Info} label="Question Text" value={text} />
            <InfoItem icon={Layers} label="Type" value={type} />
            <InfoItem icon={Tag} label="Category" value={category} />
            <InfoItem icon={CheckCircle} label="Level" value={level} />
          </div>

          {/* Answer Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <List className="w-5 h-5 text-blue-600" />
              <h3>Answer(s)</h3>
            </div>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              {answer.map((ans, index) => (
                <li key={index}>{ans}</li>
              ))}
            </ul>
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
