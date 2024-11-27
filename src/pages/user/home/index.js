import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  LinearProgress,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import {
  Timeline,
  Book,
  AccessTime,
  EmojiEvents,
  PlayCircleOutline,
  Star,
  Add,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getCourseCategories, getCourses } from "@services/course";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseCategoriesData,
  setCoursesData,
} from "@redux/slices/courseSlice";
import { dummyCategories, dummyCourses } from "@utils/dummyData";
import { getLoggedUser } from "@services/auth";
import { setLoggedUser } from "@redux/slices/userSlice";

const COLORS = ["#1976d2", "#2e7d32", "#ed6c02"];

const Home = () => {
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const courses = useSelector((state) => state.course.courses);
  const categories = useSelector((state) => state.course.courseCategories);

  // Calculate user-specific stats
  const userCourses = loggedInUser?.userCourses || [];
  const completedCourses = userCourses.filter(
    (uc) => uc.status === "completed"
  ).length;
  const inProgressCourses = userCourses.filter(
    (uc) => uc.status === "in_progress"
  ).length;
  const notStartedCourses =
    courses?.length - (completedCourses + inProgressCourses);

  // Calculate course completion stats for pie chart
  const courseCompletion = [
    { name: "Completed", value: completedCourses },
    { name: "In Progress", value: inProgressCourses },
    { name: "Not Started", value: notStartedCourses },
  ];

  // Calculate monthly progress data based on user courses
  const getUserProgressData = () => {
    const progressByMonth = userCourses.reduce((acc, course) => {
      const month = new Date(course.course?.createdAt).toLocaleString(
        "default",
        { month: "short" }
      );
      if (!acc[month]) {
        acc[month] = {
          count: 1,
          totalProgress: course.progress,
        };
      } else {
        acc[month].count++;
        acc[month].totalProgress += course.progress;
      }
      return acc;
    }, {});

    return Object.entries(progressByMonth).map(([month, data]) => ({
      name: month,
      progress: data.totalProgress / data.count,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesResponse, categoriesResponse, userResponse] =
          await Promise.all([
            getCourses(),
            getCourseCategories(),
            getLoggedUser(),
          ]);

        setLoggedInUser(userResponse);
        dispatch(setCoursesData(coursesResponse?.data));
        dispatch(setCourseCategoriesData(categoriesResponse?.data));
        dispatch(setLoggedUser(userResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setCoursesData(dummyCourses));
        dispatch(setCourseCategoriesData(dummyCategories));
      }
    }

    fetchData();
  }, [dispatch]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let timeOfDay = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
    return `Good ${timeOfDay}, ${loggedInUser?.first_name || "Learner"}!`;
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="xl">
        {/* Welcome Message */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "500" }}>
          {getWelcomeMessage()}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {inProgressCourses > 0
            ? `You have ${inProgressCourses} course${
                inProgressCourses > 1 ? "s" : ""
              } in progress. Keep up the great work!`
            : "Ready to start learning? Explore our courses below!"}
        </Typography>

        {/* Header Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<Timeline color="primary" />}
              title="My Courses"
              value={`${userCourses.length} Enrolled`}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<AccessTime color="secondary" />}
              title="In Progress"
              value={`${inProgressCourses} Courses`}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<EmojiEvents sx={{ color: "#ed6c02" }} />}
              title="Completed"
              value={`${completedCourses} Courses`}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<Book color="success" />}
              title="Categories"
              value={`${categories.length} Available`}
              color="#2e7d32"
            />
          </Grid>
        </Grid>

        {/* Progress Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={6}>
            <Card elevation={2}>
              <CardHeader title="Your Learning Progress" />
              <CardContent>
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={getUserProgressData()}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#1976d2"
                        activeDot={{ r: 8 }}
                        name="Average Progress %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card elevation={2}>
              <CardHeader title="Your Course Status" />
              <CardContent>
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={courseCompletion}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {courseCompletion.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Course Sections */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <CourseSection
              title="In Progress Courses"
              icon={<PlayCircleOutline />}
              courses={userCourses
                .filter((uc) => uc.status === "in_progress")
                .slice(0, 2)
                .map((uc) => ({
                  title: uc.course.course_name,
                  progress: uc.progress,
                  subtitle: `Progress: ${uc.progress}%`,
                  icon: <PlayCircleOutline />,
                  id: uc.course.id,
                }))}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseSection
              title="Completed Courses"
              icon={<EmojiEvents />}
              courses={userCourses
                .filter((uc) => uc.status === "completed")
                .slice(0, 2)
                .map((uc) => ({
                  title: uc.course.course_name,
                  subtitle: `Rating: ${uc.rating}/5`,
                  icon: <Star />,
                  id: uc.course.id,
                }))}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseSection
              title="Recommended Courses"
              icon={<Add />}
              courses={courses
                .filter(
                  (course) =>
                    !userCourses.find((uc) => uc.course.id === course.id)
                )
                .slice(0, 2)
                .map((course) => ({
                  title: course.course_name,
                  subtitle: `${course.level} • ${course.category?.category_name}`,
                  icon: <Add />,
                  id: course.id,
                }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Helper Components remain the same
const StatCard = ({ icon, title, value, color }) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: `${color}15`, mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const CourseSection = ({ title, icon, courses }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    const url = `/courses/${courseId}`;
    navigate(url);
  };

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {courses.map((course, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleCourseClick(course.id)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.light" }}>
                    {course.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={course.title}
                  secondary={
                    <Box>
                      {course.progress !== undefined && (
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{ my: 1 }}
                        />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {course.subtitle}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < courses.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Home;
