import React from "react";
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
import { v4 as uuidv4 } from "uuid";

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

// Sample data for charts
const progressData = [
  { name: "Jan", progress: 65 },
  { name: "Feb", progress: 78 },
  { name: "Mar", progress: 82 },
  { name: "Apr", progress: 88 },
];

const courseCompletion = [
  { name: "Completed", value: 68 },
  { name: "In Progress", value: 32 },
];

const COLORS = ["#1976d2", "#2e7d32"];

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="xl">
        {/* Header Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<Timeline color="primary" />}
              title="Daily Goal"
              value="87% Completed"
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<Book color="success" />}
              title="Courses"
              value="12 Active"
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<AccessTime color="secondary" />}
              title="Study Time"
              value="4.5 hrs today"
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<EmojiEvents sx={{ color: "#ed6c02" }} />}
              title="Achievements"
              value="15 Earned"
              color="#ed6c02"
            />
          </Grid>
        </Grid>

        {/* Progress Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={6}>
            <Card elevation={2}>
              <CardHeader title="Learning Progress" />
              <CardContent>
                <Box sx={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={progressData}
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
                        name="Progress %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card elevation={2}>
              <CardHeader title="Course Completion" />
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
                        label={({ name, value }) => `${name}: ${value}%`}
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
              title="Recently Watched"
              icon={<PlayCircleOutline />}
              courses={[
                {
                  title: "Advanced Mathematics",
                  progress: 75,
                  subtitle: "2 hours ago",
                  icon: <PlayCircleOutline />,
                  id: 15,
                },
                {
                  title: "Physics Fundamentals",
                  progress: 45,
                  subtitle: "5 hours ago",
                  icon: <PlayCircleOutline />,
                  id: 17,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseSection
              title="Popular Courses"
              icon={<Star />}
              courses={[
                {
                  title: "Chemistry Basics",
                  subtitle: "2.5k enrolled",
                  icon: <Star />,
                  id: 14,
                },
                {
                  title: "Biology 101",
                  subtitle: "1.8k enrolled",
                  icon: <Star />,
                  id: 19,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseSection
              title="Recently Added"
              icon={<Add />}
              courses={[
                {
                  title: "Environmental Science",
                  subtitle: "2 days ago",
                  icon: <Add />,
                  id: 28,
                },
                {
                  title: "Organic Chemistry",
                  subtitle: "5 days ago",
                  icon: <Add />,
                  id: 35,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Helper Components
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
                      {course.progress && (
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
