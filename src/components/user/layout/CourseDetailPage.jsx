import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Rating,
  TextField,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle,
  VideoLibrary,
  Image as ImageIcon,
  Article,
  Send as SendIcon,
  PlayArrow as StartIcon,
} from "@mui/icons-material";
import { courseProgress, getUserCourses, startCourse } from "@services/course";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [courseStarted, setCourseStarted] = useState(false);

  const loggedInUser = useSelector((state) => state?.user?.loggedUser);

  const fetchUserCourses = useCallback(async () => {
    try {
      const response = await getUserCourses(loggedInUser.id);
      console.log(response, "this is response");
      const selectedCourse = response?.data?.data?.find(
        (uc) => uc.course.id === parseInt(courseId)
      );
      
      if (selectedCourse) {
        setCurrentCourse(selectedCourse);
        setRating(selectedCourse.rating || 0);
        setFeedback(selectedCourse.comment || "");
        
        // Check if course has been started
        setCourseStarted(
          selectedCourse.progress > 0 || 
          selectedCourse.status === 'in_progress'
        );
        setActiveContentIndex(selectedCourse.progress-1);
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  }, [courseId, loggedInUser.id]);

  useEffect(() => {
    fetchUserCourses();
  }, [fetchUserCourses]);

  const handleStartCourse = async () => {
    try {
      await updateProgress("next");
    } catch (error) {
      console.error("Error starting course:", error);
    }
  };

  const updateProgress = async (direction) => {
    try {
      const payload = {
        course_id: currentCourse.id,
        user_id: loggedInUser.id,
        direction,
      };

      const response = await courseProgress(payload);
      if(response.status === 200){
        const updatedCourse = response.data.course;
      // Update course with progress from API
      setCurrentCourse(prev => ({
        ...prev,
        progress: updatedCourse.progress,
        status: updatedCourse.status,
      }));

      // Update active content index based on progress
      if (response.data.contentCount) {
        const progressValue= updatedCourse.progress;
        setActiveContentIndex(progressValue - 1);
      }
        
      }
      
    } catch (error) {
      console.error("Error updating course progress:", error);
    }
  };

  const handleNext = useCallback(async () => {
    console.log("Next clicked", activeContentIndex < currentCourse.course.contents.length - 1);
    if (
      currentCourse?.course?.contents?.length &&
      activeContentIndex < currentCourse.course.contents.length - 1
    ) {
      await updateProgress("next");
    }
  }, [currentCourse, activeContentIndex]);

  const handleBack = useCallback(async () => {
    if (activeContentIndex > 0) {
      await updateProgress("previous");
    }
  }, [activeContentIndex]);
  console.log(currentCourse, "current course"); 

  const getContentIcon = useMemo(() => ({
    video: <VideoLibrary color="primary" />,
    image: <ImageIcon color="success" />,
    text: <Article color="info" />,
    default: <Article />
  }), []);

  const renderContent = useCallback((content) => {
    switch (content.type) {
      case "video":
        return (
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              bgcolor: "black",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <video controls width="100%" src={content.mediaUrl}>
              Your browser does not support the video tag.
            </video>
          </Box>
        );
      case "image":
        return (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={content.mediaUrl}
              alt={content.title}
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </Box>
        );
      case "text":
        return <Typography>{content.body}</Typography>;
      default:
        return null;
    }
  }, []);

  // Course not found screen
  if (!currentCourse) {
    return (
      <Container>
        <Typography variant="h5">Course not found</Typography>
      </Container>
    );
  }

  const progressPercentage = currentCourse.progress?Math.floor((currentCourse.progress / currentCourse.course.contents.length) * 100) : 0;

  // Welcome screen when course is not started
  if (!courseStarted) {
    return (
      <Box sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
      }}>
        <Card sx={{ 
          maxWidth: 500, 
          textAlign: "center", 
          p: 4,
          boxShadow: 3,
          borderRadius: 2
        }}>
          <Typography variant="h4" gutterBottom>
            Welcome to {currentCourse.course.course_name}
          </Typography>
          <Typography color="text.secondary" paragraph>
            You're about to embark on an exciting learning journey. 
            Click the button below to start your course.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<StartIcon />}
            size="large"
            onClick={handleStartCourse}
          >
            Start Learning
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: "#f5f5f5", 
      minHeight: "100vh", 
      py: 3,
      backgroundImage: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
    }}>
      <Container maxWidth="xl">
        <Card sx={{ 
          mb: 3, 
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {currentCourse.course.course_name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {currentCourse.course.description}
            </Typography>
            
            {/* Progress Bar */}
           <Box sx={{ width: '100%', mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                color="primary"
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'lightgray'
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {`Progress: ${progressPercentage}%`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={`Status: ${currentCourse.status === "in_progress" ? "In Progress" : "Completed"}`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Duration: ${currentCourse.course.duration}`}
                color="secondary"
                variant="outlined"
              />
              <Chip 
                label={`Level: ${currentCourse.course.level}`}
                color="info"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card 
              sx={{ 
                boxShadow: 2,
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <CardContent>
                {currentCourse.course.contents[activeContentIndex] && (
                  <>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {currentCourse.course.contents[activeContentIndex].title}
                    </Typography>
                    {renderContent(
                      currentCourse.course.contents[activeContentIndex]
                    )}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mt: 2 
                    }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                        disabled={currentCourse.progress === 1}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={
                          activeContentIndex ===
                          currentCourse.course.contents.length - 1
                        }
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Feedback section */}
            <Card style={{ marginTop: "2rem" }}>
              <CardContent>
                <Typography variant="h6">Rate and Review</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                  />
                  <Typography sx={{ ml: 1 }}>{rating}</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Leave your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => {
                    // Handle feedback submission
                    console.log("Feedback submitted");
                  }}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Contents Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Contents</Typography>
                <List>
                  {currentCourse.course.contents.map((content, index) => (
                    <React.Fragment key={content.id}>
                      {index > 0 && <Divider />}
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          bgcolor:
                            activeContentIndex === index
                              ? "action.selected"
                              : "transparent",
                        }}
                        onClick={async () => {
                          const direction = index > activeContentIndex ? "next" : "previous";
                          await updateProgress(direction);
                        }}
                      >
                        <ListItemIcon>
                          {getContentIcon[content.type] || getContentIcon.default}
                        </ListItemIcon>
                        <ListItemText primary={content.title} />
                        {index <= currentCourse.progress - 1 && (
                          <CheckCircle color="success" />
                        )}
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetails;