import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { getCourses } from "@services/course";
import {
  getMockTestByCourse,
  getQuestions,
  submitMockTest,
} from "@services/mock-test";
import CourseSelection from "./CourseSelection";
import MockTestSelection from "./MockTestSelection";
import QuestionRenderer from "./QuestionRenderer";
import ResultPage from "./ResultPage"; // New import
import { Button } from "common";
import { useSelector } from "react-redux";

const MockTestPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mockTests, setMockTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  const user = useSelector((state) => state?.user?.loggedUser);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions?.data);
        setCourses(fetchedCourses?.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, [user]);

  const handleCourseSelect = async (course) => {
    setSelectedCourse(course);
    try {
      const fetchedMockTests = await getMockTestByCourse(course.id);
      setMockTests(fetchedMockTests);
    } catch (error) {
      console.error("Failed to fetch mock tests", error);
    }
  };

  const handleTestSelect = async (test) => {
    setSelectedTest(test);
    try {
      const filteredQuestions = questions.filter(
        (question) => question?.mockTest?.id === test.id
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleAnswerSelect = (answerId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    try {
      const response = await submitMockTest({
        testId: selectedTest.id,
        answers: userAnswers,
      });
      setTestResult(response.result);
    } catch (error) {
      console.error("Test submission failed", error);
    }
  };

  const handleRestart = () => {
    setTestResult(null);
    setSelectedCourse(null);
    setSelectedTest(null);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  };

  if (!user) return null;

  // If test is submitted, show result page
  if (testResult) {
    return <ResultPage result={testResult} onRestart={handleRestart} />;
  }

  return (
    <Container maxWidth="md">
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {selectedTest.name}
          </Typography>
          <QuestionRenderer
            question={questions[currentQuestionIndex]}
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={userAnswers[questions[currentQuestionIndex].id]}
            onAnswerSelect={handleAnswerSelect}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitTest}
              >
                Submit Test
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MockTestPage;
