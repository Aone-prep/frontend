import React, { useState, useEffect } from "react";
import CourseSelection from "./CourseSelection";
import QuestionRenderer from "./QuestionRenderer";
import MockTestSelection from "./MockTestSelection";
import { getCourses } from "@services/course";
import {
  getMockTestByCourse,
  getQuestionsByMockTest,
  submitMockTest,
} from "@services/mock-test";
import { Container } from "@mui/material";
import { Button } from "common";

const MockTestPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mockTests, setMockTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();

        setCourses(fetchedCourses?.data);
      } catch (error) {
        // Handle error (e.g., show error message)
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelect = async (course) => {
    setSelectedCourse(course);
    try {
      const fetchedMockTests = await getMockTestByCourse(course.id);
      console.log(fetchedMockTests);
      setMockTests(fetchedMockTests);
    } catch (error) {
      // Handle error
    }
  };

  const handleTestSelect = async (test) => {
    setSelectedTest(test);
    try {
      const fetchedQuestions = await getQuestionsByMockTest(test.id);
      setQuestions(fetchedQuestions);
    } catch (error) {
      // Handle error
    }
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleSubmitTest = async () => {
    try {
      const results = await submitMockTest({
        testId: selectedTest.id,
        answers: userAnswers,
      });
      // Navigate to results page or show results
    } catch (error) {
      // Handle submission error
    }
  };

  return (
    <Container>
      {!selectedCourse ? (
        <CourseSelection
          courses={courses}
          onCourseSelect={handleCourseSelect}
        />
      ) : !selectedTest ? (
        <MockTestSelection
          mockTests={mockTests}
          onTestSelect={handleTestSelect}
          onBackToCourses={() => setSelectedCourse(null)}
        />
      ) : (
        <div>
          <QuestionRenderer
            question={questions[currentQuestionIndex]}
            selectedAnswer={userAnswers[questions[currentQuestionIndex].id]}
            onAnswerSelect={handleAnswerSelect}
          />
          <Button onClick={handleSubmitTest}>Submit Test</Button>
        </div>
      )}
    </Container>
  );
};

export default MockTestPage;
