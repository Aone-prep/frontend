export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const calculateProgress = (completedTasks, totalTasks) => {
  return Math.round((completedTasks / totalTasks) * 100);
};
