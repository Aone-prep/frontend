// src/api.js

// Dummy data for courses
const dummyCourses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" }
  ];
  
  // Dummy data for course content
  const dummyCourseContents = [
    {
      _id: 1,
      title: "Intro to React",
      body: "This is an introductory course to React JS. Learn the basics of React.",
      type: "text",
      course: 1,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-02"
    },
    {
      _id: 2,
      title: "Advanced JavaScript",
      body: "Dive deep into JavaScript, covering closures, promises, async/await, and more.",
      type: "text",
      course: 2,
      createdAt: "2024-02-01",
      updatedAt: "2024-02-05"
    },
    {
      _id: 3,
      title: "Python for Data Science",
      body: "Learn Python in the context of Data Science. Work with libraries like Pandas, NumPy, and Matplotlib.",
      type: "text",
      course: 3,
      createdAt: "2024-03-01",
      updatedAt: "2024-03-05"
    }
  ];
  
  // Mock API calls that return the static data
  export const fetchCourses = async () => {
    return dummyCourses;
  };
  
  export const fetchCourseContent = async () => {
    return dummyCourseContents;
  };
  
  export const createCourseContent = async (data) => {
    const newId = dummyCourseContents.length + 1;
    const newContent = { ...data, _id: newId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    dummyCourseContents.push(newContent);
    return newContent;
  };
  
  export const updateCourseContent = async (id, data) => {
    const index = dummyCourseContents.findIndex(content => content._id === id);
    if (index !== -1) {
      dummyCourseContents[index] = { ...dummyCourseContents[index], ...data, updatedAt: new Date().toISOString() };
      return dummyCourseContents[index];
    }
    throw new Error("Content not found");
  };
  
  export const deleteCourseContent = async (id) => {
    const index = dummyCourseContents.findIndex(content => content._id === id);
    if (index !== -1) {
      dummyCourseContents.splice(index, 1);
    } else {
      throw new Error("Content not found");
    }
  };
  