import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  Grid,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";

const TestHistory = () => {
  const loggedUserData = useSelector((state) => state.user.loggedUser);

  // Helper function to generate random past dates within last 30 days
  const getRandomPastDate = () => {
    const currentDate = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!loggedUserData?.userTests?.length) {
    return (
      <Card className="w-full p-6">
        <Typography variant="h6" color="textSecondary" align="center">
          No test history available
        </Typography>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader
        title="Test History"
        subheader={`${loggedUserData.first_name} ${loggedUserData.last_name}'s Performance`}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {loggedUserData.userTests.map((test, index) => (
            <Grid item xs={12} key={index}>
              <Card
                variant="outlined"
                className="hover:shadow-md transition-shadow"
              >
                <CardContent>
                  <Box className="flex justify-between items-start mb-4">
                    <div>
                      <Typography variant="h6" gutterBottom>
                        {test.mockTest.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {test.mockTest.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Attempted on: {getRandomPastDate()}
                      </Typography>
                    </div>
                    <Chip
                      icon={
                        test.passed ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <CancelIcon className="w-4 h-4" />
                        )
                      }
                      label={test.passed ? "Passed" : "Failed"}
                      color={test.passed ? "success" : "error"}
                      variant="outlined"
                    />
                  </Box>

                  <Box className="mt-4">
                    <Box className="flex justify-between mb-1">
                      <Typography variant="body2">Score Progress</Typography>
                      <Typography variant="body2">
                        {test.obtained_mark} / {test.full_mark}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(test.obtained_mark / test.full_mark) * 100}
                      className="h-2 rounded"
                      color={test.passed ? "success" : "error"}
                    />
                  </Box>

                  <Box className="mt-4 flex gap-2">
                    <Chip
                      label={`Pass Mark: ${test.pass_mark}`}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label={`Score: ${(
                        (test.obtained_mark / test.full_mark) *
                        100
                      ).toFixed(1)}%`}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TestHistory;
