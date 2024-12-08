import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from "@mui/material";
import {
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  BookOutlined as BookOpenIcon,
} from "@mui/icons-material";

const DifficultyIcon = ({ level }) => {
  const iconProps = {
    sx: {
      marginRight: 1,
      opacity: 0.7,
    },
  };

  switch (level) {
    case "Beginner":
      return <StarIcon {...iconProps} color="success" />;
    case "Intermediate":
      return <TrendingUpIcon {...iconProps} color="warning" />;
    case "Advanced":
      return <BookOpenIcon {...iconProps} color="error" />;
    default:
      return null;
  }
};

const CourseSelection = ({ courses, onCourseSelect }) => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <Card
            sx={{
              height: "100%",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 3,
              },
            }}
          >
            <CardActionArea
              onClick={() => onCourseSelect(course)}
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <DifficultyIcon level={course.level} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {course.course_name}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    marginBottom: 2,
                  }}
                >
                  {course.description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    label={course.level}
                    size="small"
                    color={
                      course.level === "Beginner"
                        ? "success"
                        : course.level === "Intermediate"
                        ? "warning"
                        : "error"
                    }
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseSelection;
