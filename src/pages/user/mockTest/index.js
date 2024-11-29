import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Timer,
  ArrowBack,
  ArrowForward,
  Check,
  Flag,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setMockTestsData,
  setQuestionsData,
} from "@redux/slices/mockTestSlice";
import { getMockTests, getQuestions } from "@services/mock-test";
import { dummyMockTests, dummyQuestions } from "@utils/dummyData";

const MockTest = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mockTests = useSelector((state) => state.mockTests.mockTests);
  const questions = useSelector((state) => state.mockTests.questions);

  useEffect(() => {
    async function fetchData() {
      try {
        const mockTestResponse = await getMockTests();
        const questionsResponse = await getQuestions();

        dispatch(setMockTestsData(mockTestResponse?.data));
        dispatch(setQuestionsData(questionsResponse?.data));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setMockTestsData(dummyMockTests));
        dispatch(setQuestionsData(dummyQuestions));
      }
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    const availableTests = mockTests.filter(
      (test) => test.course_id === course.id
    );
    setSelectedTest(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTestStarted(false);
  };

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    const [hours, minutes] = test.duration.split(":");
    setTimeLeft(parseInt(hours) * 3600 + parseInt(minutes) * 60);
    setCurrentQuestion(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelection = (questionId, answer, questionType) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        answer,
        questionType,
      },
    }));
  };

  const handleFlagQuestion = (questionId) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const getQuestionsByTest = () => {
    return questions.filter((q) => q.mock_test_id === selectedTest?.id);
  };

  const calculateProgress = () => {
    const totalQuestions = getQuestionsByTest().length;
    const answeredQuestions = Object.keys(userAnswers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const renderQuestion = (question) => {
    const isMultipleChoice = question.questionType.name === "Multiple Choice";
    const currentAnswer = userAnswers[question.id]?.answer || "";

    return (
      <Card elevation={3} className="w-full mb-6">
        <CardContent>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-bold">
              Question {currentQuestion + 1}
            </Typography>
            <IconButton
              onClick={() => handleFlagQuestion(question.id)}
              color={
                flaggedQuestions.includes(question.id) ? "error" : "default"
              }
            >
              <Flag className="w-5 h-5" />
            </IconButton>
          </Box>

          <Typography className="mb-4 text-lg">
            {question.description}
          </Typography>

          {isMultipleChoice ? (
            <FormControl component="fieldset" className="w-full">
              <RadioGroup
                value={currentAnswer}
                onChange={(e) =>
                  handleAnswerSelection(question.id, e.target.value, "multiple")
                }
              >
                <Grid container spacing={2}>
                  {["A", "B", "C", "D"].map((option) => (
                    <Grid item xs={12} sm={6} key={option}>
                      <Paper
                        elevation={1}
                        className={`p-3 hover:bg-gray-50 transition-colors ${
                          currentAnswer === option
                            ? "bg-blue-50 border-blue-500"
                            : ""
                        }`}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio />}
                          label={question[`option${option}`]}
                          className="w-full"
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              label="Your Answer"
              value={currentAnswer}
              onChange={(e) =>
                handleAnswerSelection(question.id, e.target.value, "single")
              }
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" className="py-8">
      {!selectedCourse ? (
        <Box>
          <Typography variant="h4" className="mb-6">
            Select a Course
          </Typography>
          <Grid container spacing={3}>
            {mockTests
              .reduce((unique, test) => {
                if (
                  !unique.find((item) => item?.course?.id === test?.course?.id)
                ) {
                  unique.push(test?.course);
                }
                return unique;
              }, [])
              .map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card
                    className="cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => handleCourseSelection(course)}
                  >
                    <CardContent>
                      <Typography variant="h6">{course.course_name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {course.description}
                      </Typography>
                      <Chip
                        label={course.level}
                        size="small"
                        className="mt-2"
                        color={
                          course.level === "Beginner"
                            ? "success"
                            : course.level === "Intermediate"
                            ? "warning"
                            : "error"
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ) : !selectedTest ? (
        <Box>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => setSelectedCourse(null)}
            className="mb-4"
          >
            Back to Courses
          </Button>
          <Typography variant="h4" className="mb-6">
            Available Mock Tests for {selectedCourse.course_name}
          </Typography>
          <Grid container spacing={3}>
            {mockTests
              .filter((test) => test.course_id === selectedCourse.id)
              .map((test) => (
                <Grid item xs={12} sm={6} key={test.id}>
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleTestSelection(test)}
                  >
                    <CardContent>
                      <Typography variant="h6">{test.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {test.description}
                      </Typography>
                      <Divider className="my-2" />
                      <Box className="flex justify-between items-center">
                        <Chip
                          icon={<Timer className="w-4 h-4" />}
                          label={test.duration}
                          size="small"
                        />
                        <Typography variant="body2">
                          Max Score: {test.max_score}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ) : !testStarted ? (
        <Box className="max-w-md mx-auto">
          <Card>
            <CardContent>
              <Typography variant="h5" className="mb-4">
                {selectedTest.name}
              </Typography>
              <Alert severity="info" className="mb-4">
                Please review the test information before starting
              </Alert>
              <Box className="space-y-2 mb-4">
                <Typography>Duration: {selectedTest.duration}</Typography>
                <Typography>Max Score: {selectedTest.max_score}</Typography>
                <Typography>
                  Total Questions: {getQuestionsByTest().length}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleStartTest}
                startIcon={<Check />}
              >
                Start Test
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>
          <Box className="mb-4 sticky top-0 bg-white z-10 p-4 shadow-md">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6">{selectedTest.name}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Chip
                  icon={<Timer className="w-4 h-4" />}
                  label={`Time Left: ${formatTime(timeLeft)}`}
                  color={timeLeft < 300 ? "error" : "default"}
                  className="w-full"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress()}
                  className="h-2 rounded-full"
                />
                <Typography variant="caption" className="mt-1">
                  Progress: {Math.round(calculateProgress())}%
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {renderQuestion(getQuestionsByTest()[currentQuestion])}

          <Box className="flex justify-between mt-4">
            <Button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              startIcon={<ArrowBack />}
            >
              Previous
            </Button>
            {currentQuestion < getQuestionsByTest().length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                endIcon={<ArrowForward />}
                variant="contained"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  // Handle test submission
                  navigate("/courses");
                }}
                endIcon={<Check />}
              >
                Submit Test
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MockTest;
