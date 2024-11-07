import React from "react";
import { toast } from "react-hot-toast";
import { AlertCircle, Info } from "lucide-react";
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const showToast = (type, message, duration = 3000) => {
  const toastOptions = {
    duration: duration,
    position: "top-center",
  };

  const toastContent = (
    <div className="flex items-center space-x-2">
      {/* {getIcon(type)} */}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );

  switch (type) {
    case "success":
      toast.success(toastContent, toastOptions);
      break;
    case "error":
      toast.error(toastContent, toastOptions);
      break;
    case "warning":
      toast(toastContent, {
        ...toastOptions,
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      });
      break;
    case "info":
      toast(toastContent, {
        ...toastOptions,
        icon: <Info className="w-5 h-5 text-blue-500" />,
      });
      break;
    default:
      toast(toastContent, toastOptions);
  }
};

// const getIcon = (type) => {
//   switch (type) {
//     case "success":
//       return <CheckCircle className="w-5 h-5 text-green-500" />;
//     case "error":
//       return <XCircle className="w-5 h-5 text-red-500" />;
//     case "warning":
//       return <AlertCircle className="w-5 h-5 text-yellow-500" />;
//     case "info":
//       return <Info className="w-5 h-5 text-blue-500" />;
//     default:
//       return null;
//   }
// };

export const calculateProgress = (completedTasks, totalTasks) => {
  return Math.round((completedTasks / totalTasks) * 100);
};
