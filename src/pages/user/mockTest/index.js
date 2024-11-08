import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Updated Dummy Data for Courses and Mock Tests
const courses = [
  {
    id: 1,
    title: "Python for Beginners",
    mockTests: [
      {
        id: 1,
        name: "Python Fundamentals",
        questions: [
          {
            id: 1,
            question: "What is the output of print(2 + 3 * 4)?",
            options: ["20", "14", "18", "26"],
            answer: 2,
          },
          {
            id: 2,
            question:
              "What is the difference between a list and a tuple in Python?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Lists can hold any data type, tuples can only hold one data type",
              "Lists are ordered, tuples are unordered",
              "All of the above",
            ],
            answer: 0,
          },
          {
            id: 3,
            question: "What is the purpose of the `pass` statement in Python?",
            options: [
              "To create an empty block",
              "To raise an exception",
              "To exit the current function",
              "To print a message to the console",
            ],
            answer: 0,
          },
          {
            id: 4,
            question: "Which of these is a mutable data type in Python?",
            options: ["string", "tuple", "int", "list"],
            answer: 3,
          },
          {
            id: 5,
            question: "What is the output of `print(5 ** 2)`?",
            options: ["10", "25", "30", "50"],
            answer: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Python Intermediate",
        questions: [
          {
            id: 1,
            question:
              "What is the purpose of the `__init__` method in Python classes?",
            options: [
              "To define the initial state of an object",
              "To create a new instance of a class",
              "To destroy an object",
              "To define a custom constructor",
            ],
            answer: 0,
          },
          {
            id: 2,
            question:
              "What is the difference between a list comprehension and a for loop in Python?",
            options: [
              "List comprehensions are faster",
              "List comprehensions are more readable",
              "List comprehensions create a new list in a single line",
              "All of the above",
            ],
            answer: 3,
          },
          {
            id: 3,
            question:
              "What is the purpose of the `try-except` block in Python?",
            options: [
              "To handle exceptions",
              "To define a function",
              "To create a loop",
              "To import a module",
            ],
            answer: 0,
          },
          {
            id: 4,
            question: "Which of these is a built-in function in Python?",
            options: ["append()", "length()", "print()", "variable()"],
            answer: 2,
          },
          {
            id: 5,
            question: "What is the output of `print(3 / 2)`?",
            options: ["1", "1.5", "2", "3"],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    mockTests: [
      {
        id: 1,
        name: "JavaScript Fundamentals",
        questions: [
          {
            id: 1,
            question: "What is the purpose of the `var` keyword in JavaScript?",
            options: [
              "To declare a variable with function scope",
              "To declare a variable with block scope",
              "To declare a constant",
              "To declare a variable with global scope",
            ],
            answer: 3,
          },
          {
            id: 2,
            question:
              "What is the difference between `==` and `===` in JavaScript?",
            options: [
              "There is no difference, they are the same",
              "`==` performs type coercion, `===` does not",
              "`==` checks for equality, `===` checks for both equality and type",
              "None of the above",
            ],
            answer: 1,
          },
          {
            id: 3,
            question:
              "What is the purpose of the `this` keyword in JavaScript?",
            options: [
              "To refer to the current object",
              "To define a variable",
              "To create a new object",
              "To access the global scope",
            ],
            answer: 0,
          },
          {
            id: 4,
            question: "Which of these is a primitive data type in JavaScript?",
            options: ["object", "array", "function", "string"],
            answer: 3,
          },
          {
            id: 5,
            question: "What is the output of `console.log(5 + '5')`?",
            options: ["10", "55", "5 5", "NaN"],
            answer: 1,
          },
        ],
      },
    ],
  },
];

const MockTest = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setSelectedTest(null);
    setCurrentQuestion(0);
    setUserAnswers({});
  };

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setUserAnswers({});
  };

  const handleAnswerSelection = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleFinish = () => {
    // Perform scoring and submit the test
    navigate("/courses");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mock Tests
      </Typography>

      {/* Course Selection */}
      {!selectedCourse && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Select a Course
          </Typography>
          <Tabs
            value={selectedCourse?.id || false}
            onChange={(_, course) =>
              handleCourseSelection(courses.find((c) => c.id === course))
            }
            variant="scrollable"
            scrollButtons="auto"
          >
            {courses.map((course) => (
              <Tab key={course.id} label={course.title} value={course.id} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Mock Test Selection */}
      {selectedCourse && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Select a Mock Test
          </Typography>
          <Tabs
            value={selectedTest?.id || false}
            onChange={(_, test) =>
              handleTestSelection(
                selectedCourse.mockTests.find((t) => t.id === test)
              )
            }
            variant="scrollable"
            scrollButtons="auto"
          >
            {selectedCourse.mockTests.map((test) => (
              <Tab key={test.id} label={test.name} value={test.id} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Mock Test Content */}
      {selectedTest && (
        <Box>
          <Typography variant="h5" gutterBottom>
            {selectedTest.name}
          </Typography>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestion + 1}/{selectedTest.questions.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedTest.questions[currentQuestion].question}
            </Typography>
            <Grid container spacing={2}>
              {selectedTest.questions[currentQuestion].options.map(
                (option, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color={
                        userAnswers[
                          selectedTest.questions[currentQuestion].id
                        ] === index
                          ? "primary"
                          : "secondary"
                      }
                      fullWidth
                      onClick={() =>
                        handleAnswerSelection(
                          selectedTest.questions[currentQuestion].id,
                          index
                        )
                      }
                    >
                      {option}
                    </Button>
                  </Grid>
                )
              )}
            </Grid>
          </Paper>

          {/* Navigation */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {currentQuestion > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePreviousQuestion}
              >
                Previous Question
              </Button>
            )}
            {currentQuestion < selectedTest.questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleFinish}
              >
                Finish Test
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MockTest;
