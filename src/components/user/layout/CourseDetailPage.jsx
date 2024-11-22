import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  LinearProgress,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Rating,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  VideoLibrary,
  Image as ImageIcon,
  Article,
  ArrowForward,
  ArrowBack,
  AccessTime,
  School,
  Star,
  Send as SendIcon,
} from "@mui/icons-material";
import { getCourseById } from "@services/course";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [course, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await getCourseById(courseId);
        setSelectedCourse(response);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourse();
  }, [courseId]);


  // Get course from Redux state
  const courses = useSelector((state) => state.course.courses);
  // const course = courses.find(course => course.id === parseInt(id));
  console.log("🚀 ~ file: CourseDetailPage.jsx:46 ~ CourseDetails ~ course:", courses)

  // Logged in user from Redux state (adjust selector based on your state structure)
  const loggedId = useSelector(state => state?.user?.id);

  


  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return <VideoLibrary color="primary" />;
      case "image":
        return <ImageIcon color="success" />;
      case "text":
        return <Article color="info" />;
      default:
        return <Article />;
    }
  };

  const renderContent = (content) => {
    switch (content.type) {
      case "video":
        return (
          <Box sx={{ width: "100%", aspectRatio: "16/9", bgcolor: "black", borderRadius: 1, overflow: "hidden" }}>
            <video
              controls
              width="100%"
              height="100%"
              src={content.mediaUrl}
              poster="/api/placeholder/640/360"
            >
              Your browser does not support the video tag.
            </video>
          </Box>
        );
      case "image":
        return (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <img
              src={content.mediaUrl || "/api/placeholder/640/360"}
              alt={content.title}
              style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
            />
          </Box>
        );
      case "text":
        return (
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {content.body}
          </Typography>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (activeContentIndex < course.contents.length - 1) {
      setActiveContentIndex(activeContentIndex + 1);
    }
  };

  const handleBack = () => {
    if (activeContentIndex > 0) {
      setActiveContentIndex(activeContentIndex - 1);
    }
  };

  const handleSubmitFeedback = () => {
    // Implement your feedback submission logic here
    // You might want to dispatch an action to update the course rating
    console.log("Feedback submitted:", { rating, feedback, courseId: course.id });
    setFeedback("");
    setRating(0);
  };

  if (!course) {
    return (
      <Container>
        <Typography variant="h5">Course not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="xl">
        {/* Course Header */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  {course.course_name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                  <Chip
                    icon={<AccessTime />}
                    label={`Duration: ${course.duration}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<School />}
                    label={`Level: ${course.level}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<Star />}
                    label={course.category.category_name}
                    variant="outlined"
                  />
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
                      value={(activeContentIndex / course.contents.length) * 100}
                      sx={{ height: 10, borderRadius: 5, mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {activeContentIndex} of {course.contents.length} contents completed
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
                    {course.contents[activeContentIndex] && (
                      <>
                        <Typography variant="h5" gutterBottom>
                          {course.contents[activeContentIndex].title}
                        </Typography>

                        <Box sx={{ my: 4 }}>
                          {renderContent(course.contents[activeContentIndex])}
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
                            disabled={activeContentIndex === 0}
                            startIcon={<ArrowBack />}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={activeContentIndex === course.contents.length - 1}
                            endIcon={<ArrowForward />}
                          >
                            Next
                          </Button>
                        </Box>
                      </>
                    )}
                  </Paper>

                  {/* Feedback Section */}
                  {/* <Paper sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Course Feedback
                    </Typography>
                    {loggedInUser && (
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar src={loggedInUser.avatar} sx={{ mr: 2 }} />
                        <Typography variant="subtitle1">{loggedInUser.name}</Typography>
                      </Box>
                    )}
                    <Box sx={{ mb: 2 }}>
                      <Typography component="legend" gutterBottom>
                        Rate this course
                      </Typography>
                      <Rating
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                        size="large"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Share your thoughts about this course..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleSubmitFeedback}
                      disabled={!rating || !feedback}
                    >
                      Submit Feedback
                    </Button>
                  </Paper> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Course Contents Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Course Contents
                </Typography>
                <List>
                  {course.contents.map((content, index) => (
                    <React.Fragment key={content.id}>
                      {index > 0 && <Divider />}
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          bgcolor: activeContentIndex === index ? "action.selected" : "transparent",
                          "&:hover": { bgcolor: "action.hover" },
                          borderRadius: 1,
                        }}
                        onClick={() => setActiveContentIndex(index)}
                      >
                        <ListItemIcon>{getContentIcon(content.type)}</ListItemIcon>
                        <ListItemText
                          primary={content.title}
                          secondary={`${content.type} content`}
                        />
                        {index < activeContentIndex && <CheckCircle color="success" />}
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