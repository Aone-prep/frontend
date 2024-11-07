import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import {
  CheckCircle,
  Assignment,
  Quiz,
  Code,
  ArrowForward,
  ArrowBack,
  BookmarkBorder,
  Timer,
  Star,
} from "@mui/icons-material";
import {  useParams } from "react-router-dom";
import { allCourseData } from "@utils/dummyData";


// Sample course data

const CourseDetails = () => {
  const { courseId } = useParams();

  const courseData = allCourseData.find((course) => course.id === parseInt(courseId));
  
  const [activeStep, setActiveStep] = useState(0);
  const [activeContent, setActiveContent] = useState(0);

  const progress = (courseData.completedModules / courseData.totalModules) * 100;

  const handleNext = () => {
    const currentModule = courseData.modules[activeStep];
    if (!currentModule || !currentModule.content) return;

    if (activeContent + 1 < currentModule.content.length) {
      setActiveContent(activeContent + 1);
    } else if (activeStep + 1 < courseData.modules.length) {
      setActiveStep(activeStep + 1);
      setActiveContent(0);
    }
  };

  const handleBack = () => {
    if (activeContent > 0) {
      setActiveContent(activeContent - 1);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      const previousModule = courseData.modules[activeStep - 1];
      setActiveContent(previousModule.content.length - 1);
    }
  };

  const getCurrentContent = () => {
    const module = courseData.modules[activeStep];
    if (!module || !module.content || !module.content[activeContent]) {
      return null;
    }
    return module.content[activeContent];
  };

  const currentContent = getCurrentContent();

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
  <Container maxWidth="xl">
    {/* Course Header */}
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {courseData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {courseData.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Chip icon={<Timer />} label={`Duration: ${courseData.duration}`} variant="outlined" />
              <Chip icon={<Star />} label={`Rating: ${courseData.rating}`} variant="outlined" />
              <Chip icon={<BookmarkBorder />} label={`${courseData.students} Students`} variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Course Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 10, borderRadius: 5, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {courseData.completedModules} of {courseData.totalModules} modules completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <Grid container spacing={3}>
      {/* Course Content */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ position: "relative" }}>
              <Paper sx={{ p: 3, mb: 3 }}>
                {currentContent && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {currentContent.title}
                    </Typography>

                    <Box
                      sx={{
                        minHeight: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {currentContent.type === "theory" ? (
                        <Typography>{currentContent.details}</Typography>
                      ) : currentContent.type === "quiz" ? (
                        <Box>
                          {currentContent.questions.map((question, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                              <Typography variant="subtitle1">{question.question}</Typography>
                              <RadioGroup>
                                {question.options.map((option, i) => (
                                  <FormControlLabel
                                    key={i}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                              </RadioGroup>
                            </Box>
                          ))}
                        </Box>
                      ) : currentContent.type === "interactive" ? (
                        <Box sx={{ textAlign: "center" }}>
                          <Typography>{currentContent.description}</Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {currentContent.task}
                          </Typography>
                        </Box>
                      ) : null}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Button
                        onClick={handleBack}
                        disabled={activeStep === 0 && activeContent === 0}
                        startIcon={<ArrowBack />}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={
                          activeStep === courseData.modules.length - 1 &&
                          activeContent === courseData.modules[activeStep].content.length - 1
                        }
                        endIcon={<ArrowForward />}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Course Modules */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Course Modules
            </Typography>
            <Stepper orientation="vertical" activeStep={activeStep}>
              {courseData.modules.map((module, index) => (
                <Step key={module.id} completed={module.completed}>
                  <StepLabel>
                    <Typography variant="subtitle2">{module.title}</Typography>
                  </StepLabel>
                  <StepContent>
                    <List dense>
                      {module.content.map((item, contentIndex) => (
                        <ListItem
                          key={contentIndex}
                          sx={{
                            cursor: "pointer",
                            bgcolor:
                              activeStep === index && activeContent === contentIndex
                                ? "action.selected"
                                : "transparent",
                            "&:hover": { bgcolor: "action.hover" },
                          }}
                          onClick={() => {
                            setActiveStep(index);
                            setActiveContent(contentIndex);
                          }}
                        >
                          <ListItemIcon>
                            {item.type === "theory" && <BookmarkBorder />}
                            {item.type === "interactive" && <Code />}
                            {item.type === "quiz" && <Quiz />}
                            {item.type === "practice" && <Assignment />}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            secondary={
                              item.completed
                                ? "Completed"
                                : "In Progress"
                            }
                          />
                          {item.completed && <CheckCircle color="success" />}
                        </ListItem>
                      ))}
                    </List>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Box>
  );
};

export default CourseDetails;
