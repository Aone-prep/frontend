import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Timer, ArrowBack, Description } from "@mui/icons-material";

const MockTestSelection = ({ mockTests, onTestSelect, onBackToCourses }) => {
  // Handle edge cases
  if (!mockTests || mockTests.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        p={4}
        textAlign="center"
      >
        <Typography variant="h6" color="textSecondary">
          No mock tests available
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBackToCourses}
          sx={{ mt: 2 }}
        >
          Back to Courses
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
      <Box display="flex" alignItems="center" mb={4} gap={2}>
        <Tooltip title="Back to Courses">
          <IconButton color="primary" onClick={onBackToCourses}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" fontWeight="bold">
          Available Mock Tests
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {mockTests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 3,
                  cursor: "pointer",
                },
              }}
              onClick={() => onTestSelect(test)}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Description color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold" flexGrow={1}>
                    {test.name}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  flexGrow={1}
                  mb={2}
                >
                  {test.description || "No description available"}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt="auto"
                >
                  <Chip
                    icon={<Timer />}
                    label={`${test.duration} mins`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Max Score: {test.max_score || "N/A"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

MockTestSelection.defaultProps = {
  mockTests: [],
  onTestSelect: () => {},
  onBackToCourses: () => {},
};

export default MockTestSelection;
